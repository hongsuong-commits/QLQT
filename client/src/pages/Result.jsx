import { Link } from '../router.jsx';
import { useApi, useStartExam } from '../hooks.js';
import {
  formatDateTime,
  formatDuration,
  formatPercent,
  formatScore,
  statusLabel,
} from '../format.js';
import { Button, ErrorState, Loading, PageHeader, Panel } from '../components/ui.jsx';
import AnswerSheet, { SheetLegend } from '../components/AnswerSheet.jsx';
import { ChevronLeftIcon } from '../icons.jsx';

export default function Result({ attemptId }) {
  const { data, error, loading, reload } = useApi(`/api/attempts/${attemptId}`);
  const { start, starting } = useStartExam();

  if (loading && !data) return <Loading label="Đang tải kết quả…" />;
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const attempt = data.attempt;
  const needReview = attempt.questions.filter((question) => question.status !== 'correct');
  const flagged = attempt.questions.filter((question) => question.flagged);
  const explanations = attempt.explanations.length;
  const needCount = needReview.length;

  return (
    <>
      <PageHeader
        back={
          <Link href="/history" className="back-link">
            <ChevronLeftIcon />
            Lịch sử
          </Link>
        }
        title="Kết quả"
        lead={`${attempt.examTitle} · nộp lúc ${formatDateTime(attempt.submittedAt)}`}
        actions={
          <>
            <Link href={`/review/${attempt.id}`} className="btn btn--primary">
              Xem lại toàn bộ
            </Link>
            {attempt.examExists ? (
              <Button
                variant="secondary"
                onClick={() => start(attempt.examId)}
                disabled={starting !== null}
              >
                {starting === attempt.examId ? 'Đang mở…' : 'Làm lại đề này'}
              </Button>
            ) : null}
          </>
        }
      />

      <div className="result-grid">
        <div className="stack">
          <Panel>
            <div className="result-score">
              <div>
                <div className="result-score-value">
                  {formatScore(attempt.score)}
                  <span>/10</span>
                </div>
                <div className="result-note">
                  {attempt.correctCount} câu đúng trên {attempt.totalQuestions} câu
                </div>
              </div>
              <div className="result-score-caption">
                {formatDateTime(attempt.submittedAt)}
                <br />
                {formatDuration(attempt.durationSeconds)}
              </div>
            </div>

            <div className="result-stats">
              <div className="stat stat--positive">
                <span className="stat-label">Đúng</span>
                <span className="stat-value">{attempt.correctCount}</span>
              </div>
              <div className="stat stat--negative">
                <span className="stat-label">Sai</span>
                <span className="stat-value">{attempt.wrongCount}</span>
              </div>
              <div className="stat stat--muted">
                <span className="stat-label">Chưa trả lời</span>
                <span className="stat-value">{attempt.unansweredCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tỷ lệ chính xác</span>
                <span className="stat-value">{formatPercent(attempt.accuracy)}</span>
              </div>
            </div>

            <div className="result-sheet">
              <AnswerSheet questions={attempt.questions} mode="result" />
              <SheetLegend mode="result" />
            </div>

            <p className="result-note">
              Câu chưa trả lời không được cộng điểm và được tính như sai khi tính điểm, nhưng vẫn hiển thị
              riêng để bạn biết phần nào chưa làm.
            </p>
          </Panel>
        </div>

        <div className="stack">
          <Panel title="Thông tin lần làm">
            <dl className="info-rows">
              <div className="info-row">
                <dt>Đề</dt>
                <dd>{attempt.examTitle}</dd>
              </div>
              <div className="info-row">
                <dt>Môn</dt>
                <dd>{attempt.subject || '—'}</dd>
              </div>
              <div className="info-row">
                <dt>Bắt đầu</dt>
                <dd>{formatDateTime(attempt.startedAt)}</dd>
              </div>
              <div className="info-row">
                <dt>Thời gian làm</dt>
                <dd>{formatDuration(attempt.durationSeconds)}</dd>
              </div>
              <div className="info-row">
                <dt>Tài liệu AI</dt>
                <dd>
                  {attempt.documents.length ? (
                    <span title={attempt.documents.map((document) => document.title).join(', ')}>
                      {attempt.documents.length} tài liệu đã liên kết
                    </span>
                  ) : (
                    'Không có tài liệu liên kết'
                  )}
                </dd>
              </div>
            </dl>
            {!attempt.examExists ? (
              <p className="result-note">
                Đề gốc đã bị xóa. Lần làm này vẫn giữ nguyên câu hỏi, đáp án và điểm trong lịch sử.
              </p>
            ) : null}
          </Panel>

          <Panel
            title="Cần xem lại"
            action={
              needCount ? (
                <span className="meta">
                  {explanations}/{needCount} giải thích AI
                </span>
              ) : null
            }
          >
            {needCount ? (
              <>
                <p className="panel-text">
                  {needCount} câu sai hoặc chưa trả lời. Mở từng câu để đối chiếu đáp án và xin giải thích
                  dựa trên tài liệu.
                </p>
                <div className="review-links">
                  {needReview.map((question) => (
                    <Link
                      key={question.position}
                      href={`/review/${attempt.id}#q-${question.position}`}
                      className={`review-link ${question.status === 'wrong' ? 'is-wrong' : 'is-unanswered'}`.trim()}
                      title={`Câu ${question.position}: ${statusLabel(question.status)}`}
                    >
                      {question.position}
                    </Link>
                  ))}
                </div>
                <div className="result-actions">
                  <Link href={`/review/${attempt.id}`} className="btn btn--outline btn--sm">
                    Mở phần xem lại
                  </Link>
                </div>
              </>
            ) : (
              <p className="panel-text">Không có câu sai hay câu chưa trả lời. Bạn có thể mở phần xem lại để đọc đề.</p>
            )}
          </Panel>

          {flagged.length ? (
            <Panel title={`Câu đã đánh cờ (${flagged.length})`}>
              <p className="panel-text">Cờ được giữ nguyên từ lúc làm bài, kể cả khi câu đã đúng.</p>
              <div className="review-links">
                {flagged.map((question) => (
                  <Link
                    key={question.position}
                    href={`/review/${attempt.id}#q-${question.position}`}
                    className="review-link"
                  >
                    {question.position}
                  </Link>
                ))}
              </div>
            </Panel>
          ) : null}
        </div>
      </div>
    </>
  );
}
