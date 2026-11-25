import { Link } from '../router.jsx';
import { useApi } from '../hooks.js';
import { formatDateTime, formatDuration, formatPercent, formatScore } from '../format.js';
import { Button, EmptyState, ErrorState, Loading, PageHeader, Panel } from '../components/ui.jsx';

export default function History() {
  const { data, error, loading, reload } = useApi('/api/attempts');

  const attempts = data?.attempts ?? [];
  const best = attempts.length ? Math.max(...attempts.map((attempt) => attempt.score)) : null;
  const average = attempts.length
    ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length
    : null;

  return (
    <>
      <PageHeader
        title="Lịch sử"
        lead="Mỗi lần nộp lưu điểm, thời gian, cờ và toàn bộ câu hỏi tại thời điểm làm. Sửa hoặc xóa đề sau đó không làm thay đổi các lần đã nộp."
        actions={
          <Link href="/exams" className="btn btn--primary">
            Chọn đề để làm
          </Link>
        }
      />

      {loading && !data ? <Loading label="Đang tải lịch sử…" /> : null}
      {error && !data ? <ErrorState message={error} onRetry={reload} /> : null}

      {data ? (
        <>
          {attempts.length ? (
            <div className="history-summary">
              <div className="stat">
                <span className="stat-label">Số lần đã làm</span>
                <span className="stat-value">{attempts.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Điểm cao nhất</span>
                <span className="stat-value">
                  {formatScore(best)}
                  <small>/10</small>
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Điểm trung bình</span>
                <span className="stat-value">
                  {formatScore(average)}
                  <small>/10</small>
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Lần gần nhất</span>
                <span className="stat-value" style={{ fontSize: 14 }}>
                  {formatDateTime(attempts[0].submittedAt)}
                </span>
              </div>
            </div>
          ) : null}

          <Panel className="panel--table">
            {attempts.length ? (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Thời điểm</th>
                      <th scope="col">Đề</th>
                      <th scope="col">Điểm</th>
                      <th scope="col">Kết quả</th>
                      <th scope="col">Tỷ lệ</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col" aria-label="Thao tác" />
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="cell-main">
                          <span className="cell-title">{formatDateTime(attempt.submittedAt)}</span>
                          <div className="cell-meta">{attempt.subject}</div>
                        </td>
                        <td data-label="Đề">
                          <span className="small">{attempt.examTitle}</span>
                        </td>
                        <td data-label="Điểm">
                          <span className="score-cell">
                            {formatScore(attempt.score)}
                            <small>/10</small>
                          </span>
                        </td>
                        <td data-label="Kết quả">
                          <span className="small">
                            {attempt.correctCount} đúng · {attempt.wrongCount} sai ·{' '}
                            {attempt.unansweredCount} chưa làm
                          </span>
                        </td>
                        <td data-label="Tỷ lệ">
                          <span className="num small">{formatPercent(attempt.accuracy)}</span>
                        </td>
                        <td data-label="Thời gian">
                          <span className="small muted">{formatDuration(attempt.durationSeconds)}</span>
                        </td>
                        <td className="actions-cell">
                          <Link href={`/result/${attempt.id}`} className="btn btn--outline btn--sm">
                            Mở kết quả
                          </Link>
                          <Link href={`/review/${attempt.id}`} className="btn btn--ghost btn--sm">
                            Xem lại
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: 20 }}>
                <EmptyState
                  title="Chưa có lần làm nào"
                  description="Nộp một đề để bắt đầu ghi lịch sử. Mỗi lần nộp đều giữ nguyên câu hỏi, cờ và đáp án của lần đó."
                  action={
                    <Link href="/exams" className="btn btn--primary btn--sm">
                      Chọn đề để làm
                    </Link>
                  }
                />
              </div>
            )}
          </Panel>
        </>
      ) : null}
    </>
  );
}
