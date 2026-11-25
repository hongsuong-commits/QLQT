import { Link } from '../router.jsx';
import { useApi, useStartExam } from '../hooks.js';
import { formatDateTime, formatNumber, formatScore } from '../format.js';
import { Button, EmptyState, ErrorState, Loading, Panel, Tile } from '../components/ui.jsx';
import AnswerSheet, { SheetLegend } from '../components/AnswerSheet.jsx';

function todayLabel() {
  const value = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Home() {
  const { data, error, loading, reload } = useApi('/api/home');
  const { start, starting } = useStartExam();

  if (loading && !data) {
    return (
      <div className="home">
        <Loading label="Đang tải tổng quan…" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="home">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  if (!data) return null;

  const { stats, exams, recentAttempts, documents, ai } = data;

  const latest = exams
    .map((exam) => (exam.lastAttempt ? { exam, attempt: exam.lastAttempt } : null))
    .filter(Boolean)
    .sort((left, right) => Date.parse(right.attempt.submittedAt) - Date.parse(left.attempt.submittedAt))[0];

  const otherDocuments = Math.max(0, stats.documents - documents.length);

  return (
    <div className="home">
      <header className="home-head">
        <div>
          <h1>Sổ đề của bạn</h1>
          <p className="home-date">Hôm nay, {todayLabel()}</p>
        </div>
        <div className="page-actions">
          <Link href="/exams" className="btn btn--primary">
            Chọn đề để làm
          </Link>
        </div>
      </header>

      <div className="tiles">
        <Tile
          label="Đề đang có"
          value={stats.exams}
          unit="đề"
          caption={`${formatNumber(stats.questions)} câu hỏi đã nhập`}
        />
        <Tile
          label="Câu hỏi"
          value={formatNumber(stats.questions)}
          unit="câu"
          caption="Bốn đề mô phỏng, 40 câu mỗi đề"
        />
        <Tile
          label="Tài liệu ôn tập"
          value={stats.documents}
          unit="tài liệu"
          caption="Đã liên kết với cả bốn đề"
        />
        <Tile
          label="Lần đã làm"
          value={stats.attempts}
          unit="lần"
          caption={
            stats.bestScore === null
              ? 'Chưa có lần nào được chấm'
              : `Cao nhất ${formatScore(stats.bestScore)}/10 · Trung bình ${formatScore(
                  stats.averageScore,
                )}/10`
          }
        />
      </div>

      <div className="home-rows">
        <Panel
          className="span-9"
          title="Đề để làm hôm nay"
          action={
            <Link href="/exams" className="text-link">
              Quản lý đề
            </Link>
          }
        >
          {exams.map((exam) => (
            <div className="exam-row" key={exam.id}>
              <div className="exam-row-main">
                <Link href={`/exams/${exam.id}/edit`} className="exam-row-title">
                  {exam.title}
                </Link>
                <span className="exam-row-meta">
                  {exam.subject || exam.topic} · {exam.questionCount} câu · {exam.durationMinutes} phút ·{' '}
                  {exam.documentCount} tài liệu
                </span>
              </div>
              <div className="exam-row-side">
                {exam.lastAttempt ? (
                  <span className="exam-row-score">
                    {formatScore(exam.lastAttempt.score)}
                    <small>/10</small>
                  </span>
                ) : (
                  <span className="muted small">Chưa làm</span>
                )}
                <Button
                  size="sm"
                  onClick={() => start(exam.id)}
                  disabled={starting !== null}
                >
                  {starting === exam.id ? 'Đang mở…' : 'Làm bài'}
                </Button>
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          className="span-3"
          title="Lần gần nhất"
          action={
            latest ? (
              <Link href={`/review/${latest.attempt.id}`} className="text-link">
                Xem lại
              </Link>
            ) : null
          }
        >
          {latest ? (
            <>
              <div className="mini-score">
                {formatScore(latest.attempt.score)}
                <span>/10</span>
              </div>
              <p className="mini-meta">
                {latest.attempt.correctCount} đúng ·{' '}
                {latest.attempt.totalQuestions - latest.attempt.correctCount} sai hoặc chưa làm ·{' '}
                {formatDateTime(latest.attempt.submittedAt)}
              </p>
              <div className="home-mini-sheet">
                <AnswerSheet
                  questions={latest.attempt.answerSheet.map((row) => ({
                    position: row.position,
                    status: row.status,
                    flagged: row.flagged,
                  }))}
                  mode="result"
                  mini
                />
              </div>
              <SheetLegend mode="result" />
              <div className="home-mini-actions">
                <Link href={`/result/${latest.attempt.id}`} className="btn btn--outline btn--sm">
                  Mở kết quả
                </Link>
                <Link
                  href={`/review/${latest.attempt.id}`}
                  className="btn btn--ghost btn--sm"
                >
                  Xem từng câu
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              title="Chưa có lần làm nào"
              description="Chọn một đề ở bên cạnh để bắt đầu. Điểm và phiếu trả lời sẽ xuất hiện ở đây."
            />
          )}
        </Panel>

        <Panel
          className="span-6"
          title="Tài liệu ôn tập"
          action={
            <Link href="/documents" className="text-link">
              Quản lý tài liệu
            </Link>
          }
        >
          {documents.length ? (
            <>
              {documents.map((document) => (
                <div className="doc-line" key={document.id}>
                  <span className="doc-line-title">{document.title}</span>
                  <span className="num">{formatNumber(document.charCount)} ký tự</span>
                </div>
              ))}
              {otherDocuments > 0 ? (
                <p className="muted small" style={{ marginTop: 10 }}>
                  Và {otherDocuments} tài liệu khác.
                </p>
              ) : null}
            </>
          ) : (
            <EmptyState
              title="Chưa có tài liệu"
              description="AI chỉ giải thích dựa trên tài liệu ôn tập được liên kết với đề."
              action={
                <Link href="/documents" className="btn btn--outline btn--sm">
                  Thêm tài liệu
                </Link>
              }
            />
          )}
        </Panel>

        <Panel
          className="span-6"
          title="Tiến độ gần đây"
          action={
            <Link href="/history" className="text-link">
              Toàn bộ lịch sử
            </Link>
          }
        >
          {recentAttempts.length ? (
            recentAttempts.map((attempt) => (
              <div className="attempt-line" key={attempt.id}>
                <div className="attempt-line-main">
                  <Link href={`/result/${attempt.id}`} className="attempt-line-title">
                    {attempt.examTitle}
                  </Link>
                  <span className="attempt-line-meta">
                    {formatDateTime(attempt.submittedAt)} · {attempt.correctCount}/
                    {attempt.totalQuestions} câu đúng
                  </span>
                </div>
                <span className="attempt-line-score">
                  {formatScore(attempt.score)}
                  <small>/10</small>
                </span>
              </div>
            ))
          ) : (
            <EmptyState
              title="Chưa có tiến độ"
              description="Lần làm đầu tiên sẽ được lưu tự động sau khi bạn nộp bài."
              action={
                <Link href="/exams" className="btn btn--outline btn--sm">
                  Chọn đề
                </Link>
              }
            />
          )}
        </Panel>
      </div>

      <div className="home-note">
        <span className={`ai-dot ${ai?.configured ? 'on' : ''}`} aria-hidden="true" />
        {ai?.configured ? (
          <span>
            AI đã cấu hình · <span className="num">{ai.model}</span>. Giải thích câu sai chỉ dùng tài
            liệu ôn tập đã liên kết; đáp án chính thức do đề quy định.
          </span>
        ) : (
          <span>
            AI chưa cấu hình. Đặt <code>AI_API_KEY</code> trong tệp <code>.env</code> ở máy chủ rồi
            khởi động lại để bật giải thích câu sai.
          </span>
        )}
      </div>
    </div>
  );
}
