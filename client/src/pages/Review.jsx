import { useEffect, useState } from 'react';
import { Link } from '../router.jsx';
import { api } from '../api.js';
import { useApi } from '../hooks.js';
import { INSUFFICIENT_MESSAGE, formatDateTime, formatScore } from '../format.js';
import { RichText } from '../components/RichText.jsx';
import {
  Button,
  ErrorState,
  Loading,
  PageHeader,
  Panel,
  StatusPill,
} from '../components/ui.jsx';
import { ChevronLeftIcon } from '../icons.jsx';

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'wrong', label: 'Sai' },
  { id: 'unanswered', label: 'Chưa trả lời' },
  { id: 'flagged', label: 'Đã đánh cờ' },
];

export default function Review({ attemptId }) {
  const { data, error, loading, reload } = useApi(`/api/attempts/${attemptId}`);
  const { data: ai } = useApi('/api/ai/status');

  const [filter, setFilter] = useState('all');
  const [explanations, setExplanations] = useState({});
  const [initializedFor, setInitializedFor] = useState(null);
  const [busyPositions, setBusyPositions] = useState({});
  const [positionErrors, setPositionErrors] = useState({});
  const [batch, setBatch] = useState({ running: false, done: 0, total: 0, error: null });

  const attempt = data?.attempt ?? null;

  useEffect(() => {
    if (!attempt || initializedFor === attempt.id) return;
    const map = {};
    for (const explanation of attempt.explanations) map[explanation.position] = explanation;
    setExplanations(map);
    setInitializedFor(attempt.id);
  }, [attempt, initializedFor]);

  useEffect(() => {
    if (!attempt) return undefined;
    const hash = window.location.hash;
    if (!hash) return undefined;
    const timer = window.setTimeout(() => {
      try {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' });
      } catch {
        /* ignore an invalid fragment */
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [attempt]);

  if (loading && !data) return <Loading label="Đang tải bài làm…" />;
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (!attempt) return null;

  const needReview = attempt.questions.filter((question) => question.status !== 'correct');
  const pending = needReview.filter((question) => !explanations[question.position]);
  const explainedCount = needReview.length - pending.length;

  const counts = {
    all: attempt.questions.length,
    wrong: attempt.questions.filter((question) => question.status === 'wrong').length,
    unanswered: attempt.questions.filter((question) => question.status === 'unanswered').length,
    flagged: attempt.questions.filter((question) => question.flagged).length,
  };

  const visible = attempt.questions.filter((question) => {
    if (filter === 'wrong') return question.status === 'wrong';
    if (filter === 'unanswered') return question.status === 'unanswered';
    if (filter === 'flagged') return question.flagged;
    return true;
  });

  async function explain(position, { force = false } = {}) {
    setBusyPositions((current) => ({ ...current, [position]: true }));
    setPositionErrors((current) => ({ ...current, [position]: null }));
    try {
      const result = await api(
        `/api/attempts/${attempt.id}/explanations/${position}${force ? '?force=1' : ''}`,
        { method: 'POST' },
      );
      setExplanations((current) => ({ ...current, [position]: result.explanation }));
      return result.explanation;
    } catch (cause) {
      setPositionErrors((current) => ({ ...current, [position]: cause.message }));
      throw cause;
    } finally {
      setBusyPositions((current) => ({ ...current, [position]: false }));
    }
  }

  async function explainAll() {
    const targets = [...pending];
    if (!targets.length || batch.running) return;
    setBatch({ running: true, done: 0, total: targets.length, error: null });
    for (let index = 0; index < targets.length; index += 1) {
      try {
        await explain(targets[index].position);
        setBatch((current) => ({ ...current, done: index + 1 }));
      } catch (cause) {
        setBatch((current) => ({ ...current, running: false, error: cause.message }));
        return;
      }
    }
    setBatch((current) => ({ ...current, running: false }));
  }

  const batchPercent = batch.total ? Math.round((batch.done / batch.total) * 100) : 0;

  return (
    <>
      <PageHeader
        back={
          <Link href={`/result/${attempt.id}`} className="back-link">
            <ChevronLeftIcon />
            Kết quả
          </Link>
        }
        title="Xem lại bài làm"
        lead={`${attempt.examTitle} · ${formatDateTime(attempt.submittedAt)} · ${formatScore(
          attempt.score,
        )}/10`}
        actions={
          <>
            <Link href={`/result/${attempt.id}`} className="btn btn--secondary">
              Về kết quả
            </Link>
            <Link href="/history" className="btn btn--ghost">
              Lịch sử
            </Link>
          </>
        }
      />

      <Panel className="batch-panel" title="Giải thích câu sai bằng AI">
        <div className="batch-row">
          <div className="batch-copy">
            <p>
              AI chỉ đọc các tài liệu đã liên kết với đề. Đáp án chính thức do đề quy định; phần giải thích
              được đặt riêng và không thể thay đổi đáp án.
            </p>
            <p>
              {needReview.length
                ? `${explainedCount}/${needReview.length} câu sai hoặc chưa trả lời đã có giải thích.`
                : 'Không có câu sai hoặc chưa trả lời nên không cần giải thích.'}
              {ai && !ai.configured
                ? ' AI chưa được cấu hình — nút giải thích sẽ hiện lỗi từ máy chủ cho đến khi đặt AI_API_KEY.'
                : ''}
            </p>
          </div>
          <Button
            onClick={explainAll}
            disabled={batch.running || pending.length === 0}
          >
            {batch.running
              ? `Đang giải thích ${batch.done}/${batch.total}…`
              : pending.length
                ? `Giải thích ${pending.length} câu còn lại`
                : 'Đã giải thích đủ'}
          </Button>
        </div>

        {batch.running ? (
          <div className="batch-progress">
            <div className="take-progress-bar">
              <span style={{ width: `${batchPercent}%` }} />
            </div>
            <p>Đang xử lý tuần tự để tránh gọi trùng. Không đóng trang trong lúc chờ.</p>
          </div>
        ) : null}

        {batch.error ? <div className="ai-error">{batch.error}</div> : null}
      </Panel>

      <div className="review-toolbar">
        <div className="filters" role="group" aria-label="Lọc câu hỏi">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="filter"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span className="num">{counts[item.id]}</span>
            </button>
          ))}
        </div>
        <span className="muted small">
          Hiển thị {visible.length}/{attempt.questions.length} câu
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="review-empty">
          <div className="empty">
            <h3>Không có câu nào trong nhóm này</h3>
            <p>Đổi bộ lọc để xem toàn bộ câu hỏi của lần làm này.</p>
            <Button size="sm" variant="outline" onClick={() => setFilter('all')}>
              Xem tất cả
            </Button>
          </div>
        </div>
      ) : null}

      {visible.map((question) => {
        const explanation = explanations[question.position];
        const busy = Boolean(busyPositions[question.position]);
        const localError = positionErrors[question.position];
        const userValue = question.userOption
          ? `${question.userOption}. ${question[`option${question.userOption}`]}`
          : 'Chưa chọn đáp án';

        return (
          <article className="review-q" id={`q-${question.position}`} key={question.position}>
            <div className="review-q-head">
              <span className="q-number">Câu {question.position}</span>
              <StatusPill status={question.status} />
              {question.flagged ? <span className="pill pill--warning">Đã đánh cờ</span> : null}
            </div>

            <RichText text={question.content} />

            <div className="options">
              {['A', 'B', 'C', 'D'].map((letter) => {
                const official = letter === question.correctOption;
                const chosen = letter === question.userOption;
                const className = `option ${official ? 'is-correct' : ''} ${
                  chosen && !official ? 'is-wrong' : ''
                }`
                  .replace(/\s+/g, ' ')
                  .trim();
                return (
                  <div className={className} key={letter}>
                    <span className="option-letter" aria-hidden="true">
                      {letter}
                    </span>
                    <span className="option-text">{question[`option${letter}`]}</span>
                    {official || chosen ? (
                      <span className="option-tags">
                        {chosen ? <span className="tag tag--you">Bạn đã chọn</span> : null}
                        {official ? <span className="tag tag--official">Đáp án chính thức</span> : null}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="answer-grid">
              <div className="answer-cell">
                <div className="answer-label">Bạn đã chọn</div>
                <div
                  className={`answer-value ${
                    question.userOption
                      ? question.userOption === question.correctOption
                        ? 'is-correct'
                        : 'is-wrong'
                      : 'is-muted'
                  }`.trim()}
                >
                  {userValue}
                </div>
              </div>
              <div className="answer-cell">
                <div className="answer-label">Đáp án chính thức</div>
                <div className="answer-value is-correct">
                  {question.correctOption}. {question[`option${question.correctOption}`]}
                </div>
              </div>
            </div>

            {question.status === 'correct' ? (
              <p className="ai-correct-note">Câu đúng — không cần giải thích AI.</p>
            ) : (
              <div className="ai-box">
                <div className="ai-box-head">
                  <div>
                    <h3>Giải thích của AI</h3>
                    <p className="ai-sub">
                      Chỉ dựa trên tài liệu đã liên kết. Đáp án chính thức không do AI tạo và không bị thay
                      đổi.
                    </p>
                  </div>
                  <div className="ai-box-actions">
                    <Button
                      size="sm"
                      variant={explanation ? 'outline' : 'primary'}
                      onClick={() => explain(question.position, { force: Boolean(explanation) })}
                      disabled={busy || batch.running}
                    >
                      {busy
                        ? 'Đang giải thích…'
                        : explanation
                          ? 'Tạo lại'
                          : 'Giải thích câu này'}
                    </Button>
                  </div>
                </div>

                {busy ? <Loading label="Đang đọc tài liệu và gọi AI…" /> : null}

                {localError ? (
                  <div className="ai-error">
                    {localError}{' '}
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => explain(question.position, { force: Boolean(explanation) })}
                    >
                      Thử lại
                    </button>
                  </div>
                ) : null}

                {explanation ? (
                  explanation.sufficient ? (
                    <>
                      <div className="ai-section">
                        <h4>Vì sao lựa chọn của bạn chưa đúng</h4>
                        <p>{explanation.whyWrong}</p>
                      </div>
                      <div className="ai-section">
                        <h4>Vì sao đáp án chính thức đúng</h4>
                        <p>{explanation.whyCorrect}</p>
                      </div>
                      <div className="ai-section">
                        <h4>Kiến thức liên quan</h4>
                        <p>{explanation.knowledge}</p>
                      </div>
                      <div className="ai-section">
                        <h4>Ghi nhớ</h4>
                        <p>{explanation.summary}</p>
                      </div>
                      <div className="ai-sources">
                        Nguồn trong tài liệu:
                        {explanation.sources?.length ? (
                          <ul>
                            {explanation.sources.map((source, sourceIndex) => (
                              <li key={`${source.title}-${source.heading}-${sourceIndex}`}>
                                {source.title}
                                {source.heading ? ` — ${source.heading}` : ''}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span> chưa xác định được mục cụ thể.</span>
                        )}
                      </div>
                      <p className="ai-meta">
                        Model <span className="num">{explanation.model}</span> ·{' '}
                        {formatDateTime(explanation.createdAt)} · Phần này do AI tạo, tách khỏi đáp án chính
                        thức.
                      </p>
                    </>
                  ) : (
                    <div className="ai-insufficient">
                      {explanation.message || INSUFFICIENT_MESSAGE}
                    </div>
                  )
                ) : !busy && !localError ? (
                  <p className="ai-meta" style={{ marginTop: 10 }}>
                    Chưa có giải thích cho câu này. Bấm “Giải thích câu này” để gọi AI trên tài liệu đã liên
                    kết.
                  </p>
                ) : null}
              </div>
            )}
          </article>
        );
      })}
    </>
  );
}
