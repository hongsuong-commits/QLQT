import { useState } from 'react';
import { api, upload } from '../api.js';
import { useApi } from '../hooks.js';
import { formatDate, formatNumber } from '../format.js';
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Field,
  Loading,
  Modal,
  PageHeader,
  Panel,
  useToast,
} from '../components/ui.jsx';
import { PlusIcon } from '../icons.jsx';

const SOURCE_LABEL = {
  seed: 'Có sẵn',
  upload: 'Tải lên',
  text: 'Văn bản',
};

function resetDraft() {
  return {
    tab: 'file',
    file: null,
    text: '',
    parsed: null,
    title: '',
    error: null,
  };
}

export default function Documents() {
  const { data, error, loading, reload } = useApi('/api/documents');
  const { data: ai } = useApi('/api/ai/status');
  const toast = useToast();

  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState(resetDraft);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [previewTarget, setPreviewTarget] = useState(null);
  const [preview, setPreview] = useState({ loading: false, error: null, document: null });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const documents = data?.documents ?? [];

  function openAdd() {
    setDraft(resetDraft());
    setParsing(false);
    setSaving(false);
    setAddOpen(true);
  }

  function closeAdd() {
    if (parsing || saving) return;
    setAddOpen(false);
  }

  async function readSource() {
    setDraft((value) => ({ ...value, error: null }));
    if (draft.tab === 'file' && !draft.file) {
      setDraft((value) => ({ ...value, error: 'Chọn một tệp PDF, DOCX, TXT hoặc MD trước.' }));
      return;
    }
    if (draft.tab === 'text' && draft.text.trim().length < 20) {
      setDraft((value) => ({ ...value, error: 'Văn bản cần ít nhất 20 ký tự.' }));
      return;
    }
    setParsing(true);
    try {
      let result;
      if (draft.tab === 'file') {
        const form = new FormData();
        form.append('file', draft.file);
        result = await upload('/api/imports/document', form);
      } else {
        result = await api('/api/imports/document', {
          method: 'POST',
          body: { text: draft.text },
        });
      }
      setDraft((value) => ({
        ...value,
        parsed: {
          text: result.text,
          sourceName: result.sourceName,
          charCount: result.charCount,
        },
        title: value.title || result.suggestedTitle || '',
      }));
    } catch (cause) {
      setDraft((value) => ({ ...value, parsed: null, error: cause.message }));
    } finally {
      setParsing(false);
    }
  }

  async function saveDocument() {
    if (!draft.parsed) return;
    if (!draft.title.trim()) {
      setDraft((value) => ({ ...value, error: 'Đặt tên cho tài liệu trước khi lưu.' }));
      return;
    }
    setSaving(true);
    setDraft((value) => ({ ...value, error: null }));
    try {
      const result = await api('/api/documents', {
        method: 'POST',
        body: {
          title: draft.title.trim(),
          text: draft.parsed.text,
          sourceType: draft.tab === 'file' ? 'upload' : 'text',
          filename: draft.tab === 'file' ? draft.parsed.sourceName : null,
        },
      });
      toast.success(`Đã lưu tài liệu với ${result.document.chunkCount} đoạn tra cứu.`);
      setAddOpen(false);
      setDraft(resetDraft());
      reload();
    } catch (cause) {
      setDraft((value) => ({ ...value, error: cause.message }));
    } finally {
      setSaving(false);
    }
  }

  function openPreview(document) {
    setPreviewTarget(document);
    setPreview({ loading: true, error: null, document: null });
    api(`/api/documents/${document.id}`)
      .then((result) => setPreview({ loading: false, error: null, document: result.document }))
      .catch((cause) => setPreview({ loading: false, error: cause.message, document: null }));
  }

  async function removeDocument() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await api(`/api/documents/${deleteTarget.id}`, { method: 'DELETE' });
      toast.success('Đã xóa tài liệu. Các đề liên kết không còn dùng tài liệu này.');
      setDeleteTarget(null);
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
        title="Tài liệu"
        lead="AI chỉ đọc những tài liệu được liên kết với đề. Tải PDF, DOCX, TXT hoặc dán văn bản; hệ thống trích nội dung và chia đoạn để tra cứu."
        actions={
          <Button onClick={openAdd}>
            <PlusIcon />
            Thêm tài liệu
          </Button>
        }
      />

      <div className="ai-strip">
        <div className="ai-strip-main">
          <div className="ai-strip-title">
            <span className={`ai-dot ${ai?.configured ? 'on' : ''}`} aria-hidden="true" />
            Trạng thái AI
            <span className={`pill ${ai?.configured ? 'pill--positive' : 'pill--warning'}`}>
              {ai ? (ai.configured ? 'Đã cấu hình' : 'Chưa cấu hình') : 'Đang kiểm tra'}
            </span>
          </div>
          {ai?.configured ? (
            <p>
              Model <span className="num">{ai.model}</span> tại <span className="num">{ai.host}</span>. Khóa
              API chỉ đọc ở máy chủ và không gửi xuống trình duyệt.
            </p>
          ) : (
            <p>
              Đặt <code>AI_API_KEY</code>, <code>AI_BASE_URL</code> và <code>AI_MODEL</code> trong tệp{' '}
              <code>.env</code> ở máy chủ rồi khởi động lại. Mọi chức năng khác vẫn dùng được; nút giải
              thích sẽ báo lỗi cho đến khi cấu hình.
            </p>
          )}
        </div>
      </div>

      {loading && !data ? <Loading label="Đang tải tài liệu…" /> : null}
      {error && !data ? <ErrorState message={error} onRetry={reload} /> : null}

      {data ? (
        <Panel className="panel--table">
          {documents.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Tài liệu</th>
                    <th scope="col">Ký tự</th>
                    <th scope="col">Liên kết đề</th>
                    <th scope="col">Ngày thêm</th>
                    <th scope="col" aria-label="Thao tác" />
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr key={document.id}>
                      <td className="cell-main">
                        <span className="cell-title">{document.title}</span>
                        <div className="cell-meta">
                          {SOURCE_LABEL[document.sourceType] || document.sourceType}
                          {document.filename ? ` · ${document.filename}` : ''}
                        </div>
                      </td>
                      <td data-label="Ký tự">
                        <span className="num">{formatNumber(document.charCount)}</span>
                      </td>
                      <td data-label="Liên kết đề">
                        {document.linkedExamCount ? (
                          <span title={document.linkedExams.map((exam) => exam.title).join(', ')}>
                            <span className="num">{document.linkedExamCount}</span>{' '}
                            <span className="muted small">đề</span>
                          </span>
                        ) : (
                          <span className="muted small">Chưa liên kết</span>
                        )}
                      </td>
                      <td data-label="Ngày thêm">
                        <span className="small muted">{formatDate(document.createdAt)}</span>
                      </td>
                      <td className="actions-cell">
                        <Button variant="outline" size="sm" onClick={() => openPreview(document)}>
                          Xem
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteError(null);
                            setDeleteTarget(document);
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
                title="Chưa có tài liệu nào"
                description="Thêm giáo trình hoặc ghi chú ôn tập để AI có căn cứ giải thích câu sai."
                action={
                  <Button size="sm" onClick={openAdd}>
                    Thêm tài liệu
                  </Button>
                }
              />
            </div>
          )}
        </Panel>
      ) : null}

      <Modal
        open={addOpen}
        onClose={closeAdd}
        title="Thêm tài liệu ôn tập"
        wide
        footer={
          <>
            <Button variant="ghost" onClick={closeAdd} disabled={parsing || saving}>
              Hủy
            </Button>
            <Button onClick={saveDocument} disabled={!draft.parsed || saving || parsing}>
              {saving ? 'Đang lưu…' : 'Lưu tài liệu'}
            </Button>
          </>
        }
      >
        <div className="import-body">
          <div className="tabs" role="tablist" aria-label="Nguồn tài liệu">
            <button
              type="button"
              role="tab"
              aria-selected={draft.tab === 'file'}
              className="tab"
              onClick={() =>
                setDraft((value) => ({ ...value, tab: 'file', parsed: null, error: null }))
              }
            >
              Tải tệp
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={draft.tab === 'text'}
              className="tab"
              onClick={() =>
                setDraft((value) => ({ ...value, tab: 'text', parsed: null, error: null }))
              }
            >
              Dán văn bản
            </button>
          </div>

          {draft.tab === 'file' ? (
            <Field
              label="Tệp PDF, DOCX, TXT hoặc MD"
              htmlFor="doc-file"
              hint="Tối đa 15 MB. PDF scan không có lớp chữ sẽ báo lỗi."
            >
              <input
                id="doc-file"
                className="input"
                type="file"
                accept=".pdf,.docx,.txt,.md"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setDraft((value) => ({ ...value, file, parsed: null, error: null }));
                }}
              />
            </Field>
          ) : (
            <Field label="Nội dung tài liệu" htmlFor="doc-text">
              <textarea
                id="doc-text"
                className="textarea textarea--mono"
                rows={8}
                value={draft.text}
                onChange={(event) =>
                  setDraft((value) => ({ ...value, text: event.target.value, parsed: null }))
                }
                placeholder="Dán ghi chú hoặc nội dung giáo trình…"
              />
            </Field>
          )}

          <div className="row">
            <Button variant="outline" onClick={readSource} disabled={parsing}>
              {parsing ? 'Đang đọc…' : 'Đọc nội dung'}
            </Button>
            {draft.parsed ? (
              <span className="muted small">
                Đã trích {formatNumber(draft.parsed.charCount)} ký tự từ {draft.parsed.sourceName}
              </span>
            ) : null}
          </div>

          {draft.error ? <div className="notice notice--danger">{draft.error}</div> : null}

          {draft.parsed ? (
            <>
              <Field label="Tên tài liệu" htmlFor="doc-title">
                <input
                  id="doc-title"
                  className="input"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft((value) => ({ ...value, title: event.target.value }))
                  }
                  maxLength={200}
                />
              </Field>
              <div>
                <span className="field-label">Xem trước nội dung</span>
                <pre className="upload-preview">{draft.parsed.text.slice(0, 1400)}</pre>
              </div>
            </>
          ) : null}
        </div>
      </Modal>

      <Modal
        open={Boolean(previewTarget)}
        onClose={() => setPreviewTarget(null)}
        title={previewTarget?.title || 'Tài liệu'}
        wide
        footer={
          <Button variant="secondary" onClick={() => setPreviewTarget(null)}>
            Đóng
          </Button>
        }
      >
        {preview.loading ? <Loading label="Đang tải nội dung…" /> : null}
        {preview.error ? <ErrorState message={preview.error} /> : null}
        {preview.document ? (
          <>
            <div className="doc-meta">
              <span>{formatNumber(preview.document.charCount)} ký tự</span>
              <span>{preview.document.chunkCount} đoạn tra cứu</span>
              <span>Thêm ngày {formatDate(preview.document.createdAt)}</span>
            </div>
            <pre className="doc-preview">{preview.document.text}</pre>
          </>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Xóa tài liệu?"
        description={
          deleteTarget ? (
            <>
              Tài liệu <strong>{deleteTarget.title}</strong> sẽ bị xóa và gỡ khỏi mọi đề đang liên kết.
              AI sẽ không còn dùng tài liệu này để giải thích.
            </>
          ) : null
        }
        confirmLabel="Xóa tài liệu"
        tone="danger"
        busy={deleting}
        error={deleteError}
        onConfirm={removeDocument}
        onClose={() => {
          if (deleting) return;
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
