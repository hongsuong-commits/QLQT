import { useState } from 'react';
import { Link } from '../router.jsx';
import { api } from '../api.js';
import { useApi, useStartExam } from '../hooks.js';
import { formatDateTime, formatScore } from '../format.js';
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Loading,
  PageHeader,
  Panel,
  useToast,
} from '../components/ui.jsx';
import { PlusIcon } from '../icons.jsx';

export default function Exams() {
  const { data, error, loading, reload } = useApi('/api/exams');
  const { start, starting } = useStartExam();
  const toast = useToast();
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const exams = data?.exams ?? [];

  async function remove() {
    if (!target) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await api(`/api/exams/${target.id}`, { method: 'DELETE' });
      toast.success('Đã xóa đề. Lịch sử các lần làm vẫn được giữ.');
      setTarget(null);
      reload();
    } catch (cause) {
      setDeleteError(cause.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Đề thi"
        lead="Bốn đề mô phỏng 40 câu. Mở đề để sửa nội dung và liên kết tài liệu, hoặc bắt đầu làm bài ngay."
        actions={
          <Link href="/exams/new" className="btn btn--primary">
            <PlusIcon />
            Nhập đề mới
          </Link>
        }
      />

      {loading && !data ? <Loading label="Đang tải đề thi…" /> : null}
      {error && !data ? <ErrorState message={error} onRetry={reload} /> : null}

      {data ? (
        <Panel className="panel--table">
          {exams.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Đề</th>
                    <th scope="col">Câu</th>
                    <th scope="col">Tài liệu</th>
                    <th scope="col">Lần gần nhất</th>
                    <th scope="col" aria-label="Thao tác" />
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.id}>
                      <td className="cell-main">
                        <Link href={`/exams/${exam.id}/edit`} className="cell-title">
                          {exam.title}
                        </Link>
                        <div className="cell-meta">
                          {exam.subject}
                          {exam.topic ? ` · ${exam.topic}` : ''} · {exam.durationMinutes} phút
                        </div>
                      </td>
                      <td data-label="Câu">
                        <span className="num">{exam.questionCount}</span>
                      </td>
                      <td data-label="Tài liệu">
                        <span className="num">{exam.documentCount}</span>
                      </td>
                      <td data-label="Lần gần nhất">
                        {exam.lastAttempt ? (
                          <div>
                            <span className="score-cell">
                              {formatScore(exam.lastAttempt.score)}
                              <small>/10</small>
                            </span>
                            <div className="cell-meta">{formatDateTime(exam.lastAttempt.submittedAt)}</div>
                          </div>
                        ) : (
                          <span className="muted small">Chưa làm</span>
                        )}
                      </td>
                      <td className="actions-cell">
                        <Button
                          size="sm"
                          onClick={() => start(exam.id)}
                          disabled={starting !== null}
                        >
                          {starting === exam.id ? 'Đang mở…' : 'Làm bài'}
                        </Button>
                        <Link href={`/exams/${exam.id}/edit`} className="btn btn--outline btn--sm">
                          Sửa
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteError(null);
                            setTarget(exam);
                          }}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: 20 }}>
              <EmptyState
                title="Chưa có đề nào"
                description="Nhập đề từ tệp PDF, DOCX hoặc dán văn bản để bắt đầu."
                action={
                  <Link href="/exams/new" className="btn btn--primary btn--sm">
                    Nhập đề mới
                  </Link>
                }
              />
            </div>
          )}
        </Panel>
      ) : null}

      <ConfirmDialog
        open={Boolean(target)}
        title="Xóa đề thi?"
        description={
          target ? (
            <>
              Đề <strong>{target.title}</strong> và toàn bộ câu hỏi của đề sẽ bị xóa. Các lần làm
              bài cũ vẫn giữ nguyên câu hỏi, đáp án và điểm trong lịch sử.
            </>
          ) : null
        }
        confirmLabel="Xóa đề"
        tone="danger"
        busy={deleting}
        error={deleteError}
        onConfirm={remove}
        onClose={() => {
          if (deleting) return;
          setTarget(null);
        }}
      />
    </>
  );
}
