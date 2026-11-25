import { useEffect, useRef, useState } from 'react';
import { useRouter } from '../router.jsx';
import { api } from '../api.js';
import { useApi } from '../hooks.js';
import { formatClock } from '../format.js';
import { RichText } from '../components/RichText.jsx';
import AnswerSheet, { SheetLegend } from '../components/AnswerSheet.jsx';
import {
  Button,
  ConfirmDialog,
  ErrorState,
  IconButton,
  Loading,
  Modal,
  Notice,
  Panel,
  useToast,
} from '../components/ui.jsx';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../icons.jsx';
import { FlagIcon as FlagGlyph } from '../icons.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

function storageKey(attemptId) {
  return `sode:session:${attemptId}`;
}

function readSaved(attemptId) {
  try {
    const raw = window.localStorage.getItem(storageKey(attemptId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Take({ sessionId }) {
  const { navigate } = useRouter();
  const toast = useToast();
  const { data: session, error, loading, reload } = useApi(`/api/attempts/sessions/${sessionId}`);

  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState(() => new Set());
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const loaded = useRef(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!session || loaded.current) return;
    loaded.current = true;
    const positions = new Set(session.questions.map((question) => question.position));
    const saved = readSaved(session.attemptId);
    const nextAnswers = {};
    for (const [key, value] of Object.entries(saved?.answers ?? {})) {
      const position = Number(key);
      if (positions.has(position) && LETTERS.includes(value)) nextAnswers[position] = value;
    }
    const nextFlags = new Set(
      (Array.isArray(saved?.flags) ? saved.flags : [])
        .map((value) => Number(value))
        .filter((position) => positions.has(position)),
    );
    const savedIndex = Number(saved?.index);
    const maxIndex = session.questions.length - 1;
    setAnswers(nextAnswers);
    setFlags(nextFlags);
    setIndex(Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex <= maxIndex ? savedIndex : 0);
    setNow(Date.now());
    setReady(true);
  }, [session]);

  useEffect(() => {
    if (!ready || !session) return;
    try {
      window.localStorage.setItem(
        storageKey(session.attemptId),
        JSON.stringify({ answers, flags: [...flags], index }),
      );
    } catch {
      /* storage may be unavailable; the attempt still works in this tab */
    }
  }, [ready, session, answers, flags, index]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  const questions = session?.questions ?? [];
  const question = questions[index];
  const position = question?.position;
  const answeredCount = questions.filter((item) => answers[item.position]).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = questions.filter((item) => flags.has(item.position)).length;
  const isFlagged = position ? flags.has(position) : false;
  const selected = position ? answers[position] : null;

  const sheetQuestions = questions.map((item) => ({
    position: item.position,
    answered: Boolean(answers[item.position]),
    flagged: flags.has(item.position),
  }));

  const limit = (session?.exam?.durationMinutes ?? 0) * 60;
  const elapsed = session ? Math.max(0, Math.floor((now - Date.parse(session.startedAt)) / 1000)) : 0;
  const remaining = limit > 0 ? limit - elapsed : null;
  const overTime = remaining !== null && remaining < 0;

  function goTo(nextIndex) {
    const clamped = Math.max(0, Math.min(questions.length - 1, nextIndex));
    setIndex(clamped);
    window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  }

  function choose(letter) {
    if (!position) return;
    setAnswers((current) => ({ ...current, [position]: letter }));
  }

  function toggleFlag() {
    if (!position) return;
    setFlags((current) => {
      const next = new Set(current);
      if (next.has(position)) next.delete(position);
      else next.add(position);
      return next;
    });
  }

  useEffect(() => {
    if (!ready || !question) return undefined;
    const onKey = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const tag = target?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || target?.isContentEditable) return;
      const key = event.key.toLowerCase();
      if (LETTERS.includes(key.toUpperCase())) {
        event.preventDefault();
        choose(key.toUpperCase());
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(index - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(index + 1);
      } else if (key === 'f') {
        event.preventDefault();
        toggleFlag();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, question, index]);

  async function submit() {
    if (!session) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await api(`/api/attempts/${session.attemptId}/submit`, {
        method: 'POST',
        body: { answers, flags: [...flags] },
      });
      try {
        window.localStorage.removeItem(storageKey(session.attemptId));
      } catch {
        /* ignore */
      }
      navigate(`/result/${result.attemptId}`, { replace: true });
    } catch (cause) {
      setSubmitError(cause.message);
      setSubmitting(false);
    }
  }

  function openSubmit() {
    setSubmitError(null);
    setSubmitOpen(true);
    setSheetOpen(false);
  }

  if (loading && !session) return <Loading label="Đang mở bài làm…" />;

  if (error && !session) {
    return (
      <>
        <ErrorState message={error} onRetry={reload} />
        <div className="row" style={{ marginTop: 12 }}>
          <Button variant="outline" onClick={() => navigate('/exams')}>
            Về danh sách đề
          </Button>
        </div>
      </>
    );
  }

  if (!session || !ready || !question) return <Loading label="Đang chuẩn bị câu hỏi…" />;

  const percent = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <>
      <header className="take-head">
        <div>
          <h1 className="take-title">{session.exam.title}</h1>
          <p className="take-meta">
            {session.exam.subject}
            {session.exam.topic ? ` · ${session.exam.topic}` : ''} · {questions.length} câu ·{' '}
            {session.exam.durationMinutes} phút
          </p>
        </div>
        <div className="page-actions">
          <div className="take-clock">
            <span className="take-clock-label">{overTime ? 'Quá giờ' : 'Còn lại'}</span>
            <span className={`clock ${overTime ? 'is-over' : ''}`.trim()}>
              {remaining === null ? '—' : formatClock(Math.abs(remaining))}
            </span>
          </div>
          <Button
            variant="outline"
            className="take-sheet-btn"
            onClick={() => setSheetOpen(true)}
          >
            Phiếu trả lời
          </Button>
          <Button variant="ghost" onClick={() => setLeaveOpen(true)}>
            Thoát
          </Button>
        </div>
      </header>

      <div className="take-progress">
        <div
          className="take-progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={answeredCount}
          aria-label="Số câu đã trả lời"
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className="take-counts">
          <span>
            Đã trả lời <b>{answeredCount}</b>/{questions.length}
          </span>
          <span>
            Chưa trả lời <b>{unansweredCount}</b>
          </span>
          <span>
            Có cờ <b>{flaggedCount}</b>
          </span>
        </div>
      </div>

      <div className="take-grid">
        <div>
          <article className="question-card" ref={cardRef}>
            <div className="question-head">
              <span className="question-index">
                Câu {position} · {index + 1}/{questions.length}
              </span>
              <button
                type="button"
                className={`flag-btn ${isFlagged ? 'is-on' : ''}`.trim()}
                aria-pressed={isFlagged}
                onClick={toggleFlag}
              >
                <FlagGlyph />
                <span>{isFlagged ? 'Bỏ cờ' : 'Đánh cờ'}</span>
              </button>
            </div>

            <RichText text={question.content} />

            <div className="options" role="group" aria-label={`Phương án câu ${position}`}>
              {LETTERS.map((letter) => (
                <button
                  type="button"
                  key={letter}
                  className={`option ${selected === letter ? 'is-selected' : ''}`.trim()}
                  aria-pressed={selected === letter}
                  onClick={() => choose(letter)}
                >
                  <span className="option-letter" aria-hidden="true">
                    {letter}
                  </span>
                  <span className="option-text">{question[`option${letter}`]}</span>
                </button>
              ))}
            </div>

            <div className="question-foot">
              <Button
                variant="outline"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
              >
                <ChevronLeftIcon />
                Câu trước
              </Button>
              <span className="page-of">
                {index + 1} / {questions.length}
              </span>
              <Button
                variant="secondary"
                onClick={() => goTo(index + 1)}
                disabled={index === questions.length - 1}
              >
                Câu sau
                <ChevronRightIcon />
              </Button>
            </div>

            <p className="keyboard-hint" style={{ marginTop: 10 }}>
              Phím A–D chọn đáp án · ← → chuyển câu · F đánh cờ
            </p>
          </article>
        </div>

        <aside className="take-side">
          <Panel
            title="Phiếu trả lời"
            action={
              <span className="meta">
                {answeredCount}/{questions.length}
              </span>
            }
          >
            <AnswerSheet
              questions={sheetQuestions}
              currentIndex={index}
              onSelect={goTo}
              mode="take"
            />
            <SheetLegend mode="take" />
            <div style={{ marginTop: 16 }}>
              <Button block onClick={openSubmit}>
                Nộp bài
              </Button>
              <p className="take-submit-note">
                Câu chưa trả lời được tính là sai khi chấm điểm. Bạn sẽ xem lại toàn bộ câu hỏi sau khi
                nộp.
              </p>
            </div>
          </Panel>
        </aside>
      </div>

      <div className="take-mobile-bar">
        <Button
          variant="outline"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Câu trước"
        >
          <ChevronLeftIcon />
        </Button>
        <Button variant="secondary" className="btn--sheet" onClick={() => setSheetOpen(true)}>
          Phiếu · {answeredCount}/{questions.length}
        </Button>
        <Button
          variant="outline"
          onClick={() => goTo(index + 1)}
          disabled={index === questions.length - 1}
          aria-label="Câu sau"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      {sheetOpen ? (
        <div className="sheet-overlay" role="dialog" aria-modal="true" aria-label="Phiếu trả lời">
          <div className="sheet-overlay-head">
            <h2>Phiếu trả lời</h2>
            <IconButton label="Đóng phiếu trả lời" onClick={() => setSheetOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="take-counts" style={{ marginBottom: 14 }}>
            <span>
              Đã trả lời <b>{answeredCount}</b>/{questions.length}
            </span>
            <span>
              Có cờ <b>{flaggedCount}</b>
            </span>
          </div>
          <AnswerSheet
            questions={sheetQuestions}
            currentIndex={index}
            onSelect={(nextIndex) => {
              goTo(nextIndex);
              setSheetOpen(false);
            }}
            mode="take"
          />
          <SheetLegend mode="take" />
          <div className="sheet-overlay-foot">
            <Button block onClick={openSubmit}>
              Nộp bài
            </Button>
            <Button variant="secondary" block onClick={() => setSheetOpen(false)}>
              Tiếp tục làm bài
            </Button>
          </div>
        </div>
      ) : null}

      <Modal
        open={submitOpen}
        onClose={
          submitting
            ? undefined
            : () => {
                setSubmitOpen(false);
                setSubmitError(null);
              }
        }
        title="Nộp bài?"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setSubmitOpen(false)}
              disabled={submitting}
            >
              Tiếp tục làm bài
            </Button>
            <Button onClick={submit} disabled={submitting}>
              {submitting ? 'Đang chấm…' : 'Nộp và chấm điểm'}
            </Button>
          </>
        }
      >
        <p>
          Bài được chấm ngay trên máy chủ theo đáp án gốc của đề. Câu chưa trả lời được tính là sai khi
          tính điểm nhưng vẫn hiển thị riêng trong kết quả.
        </p>
        <div className="info-rows" style={{ marginTop: 14 }}>
          <div className="info-row">
            <dt>Đã trả lời</dt>
            <dd>
              <span className="num">{answeredCount}</span> / {questions.length} câu
            </dd>
          </div>
          <div className="info-row">
            <dt>Chưa trả lời</dt>
            <dd>
              <span className="num">{unansweredCount}</span> câu
            </dd>
          </div>
          <div className="info-row">
            <dt>Đang đánh cờ</dt>
            <dd>
              <span className="num">{flaggedCount}</span> câu
            </dd>
          </div>
        </div>
        {unansweredCount > 0 ? (
          <div className="notice notice--warning" style={{ marginTop: 12 }}>
            Còn {unansweredCount} câu chưa trả lời. Bạn có thể quay lại làm tiếp trước khi nộp.
          </div>
        ) : (
          <Notice tone="success">Đã trả lời đủ {questions.length} câu.</Notice>
        )}
        {submitError ? (
          <div className="notice notice--danger" style={{ marginTop: 10 }}>
            {submitError}
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={leaveOpen}
        title="Rời bài làm?"
        description="Bài đang làm chưa được nộp nên sẽ không vào lịch sử hay được chấm điểm. Câu trả lời đã chọn chỉ còn trong phiên này."
        confirmLabel="Rời bài"
        cancelLabel="Ở lại"
        tone="danger"
        onConfirm={() => navigate('/exams')}
        onClose={() => setLeaveOpen(false)}
      />
    </>
  );
}
