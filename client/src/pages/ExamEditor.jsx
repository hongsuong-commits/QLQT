import { useEffect, useState } from 'react';
import { Link, useRouter } from '../router.jsx';
import { api, upload } from '../api.js';
import { useApi } from '../hooks.js';
import { formatNumber } from '../format.js';
import { plainPreview } from '../components/RichText.jsx';
import {
  Button,
  ConfirmDialog,
  ErrorState,
  Field,
  Loading,
  Notice,
  PageHeader,
  Panel,
  useToast,
} from '../components/ui.jsx';
import { ChevronLeftIcon, PlusIcon, TrashIcon } from '../icons.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];
let keySequence = 0;
function makeKey() {
  keySequence += 1;
  return globalThis.crypto?.randomUUID?.() ?? `q-${Date.now()}-${keySequence}`;
}

function blankQuestion() {
  return {
    key: makeKey(),
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  };
}

function mapImported(questions) {
  return questions.map((question) => ({
    key: makeKey(),
    content: question.content ?? '',
    optionA: question.optionA ?? '',
    optionB: question.optionB ?? '',
    optionC: question.optionC ?? '',
    optionD: question.optionD ?? '',
    correctOption: question.correctOption ?? '',
  }));
}

export default function ExamEditor({ examId }) {
  const isNew = !examId;
  const examState = useApi(examId ? `/api/exams/${examId}` : null);
  const documentsState = useApi('/api/documents');
  const { navigate } = useRouter();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('75');
  const [documentIds, setDocumentIds] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expanded, setExpanded] = useState(() => new Set());
  const [initialized, setInitialized] = useState(isNew);

  const [issues, setIssues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [importOpen, setImportOpen] = useState(isNew);
  const [importTab, setImportTab] = useState('file');
  const [importFile, setImportFile] = useState(null);
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importResult, setImportResult] = useState(null);
  const [pendingApply, setPendingApply] = useState(false);

  useEffect(() => {
    if (isNew || !examState.data || initialized) return;
    const exam = examState.data.exam;
    setTitle(exam.title);
    setSubject(exam.subject);
    setTopic(exam.topic);
    setDescription(exam.description);
    setDuration(String(exam.durationMinutes));
    setDocumentIds(exam.documentIds ?? []);
    setQuestions(
      exam.questions.map((question) => ({
        key: makeKey(),
        content: question.content,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctOption: question.correctOption,
      })),
    );
    setInitialized(true);
  }, [isNew, examState.data, initialized]);

  const documents = documentsState.data?.documents ?? [];
  const allExpanded = questions.length > 0 && expanded.size >= questions.length;

  function updateQuestion(key, patch) {
    setQuestions((list) => list.map((question) => (question.key === key ? { ...question, ...patch } : question)));
  }

  function addQuestion() {
    const question = blankQuestion();
    setQuestions((list) => [...list, question]);
    setExpanded((current) => new Set(current).add(question.key));
  }

  function removeQuestion(key) {
    setQuestions((list) => list.filter((question) => question.key !== key));
    setExpanded((current) => {
      const next = new Set(current);
      next.delete(key);
      return next;
    });
  }

  function toggleQuestion(key) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleDocument(id) {
    setDocumentIds((list) => (list.includes(id) ? list.filter((value) => value !== id) : [...list, id]));
  }

  async function runImport() {
    setImportError(null);
    setImportResult(null);
    if (importTab === 'file' && !importFile) {
      setImportError('Chọn tệp PDF, DOCX, TXT hoặc MD trước.');
      return;
    }
    if (importTab === 'text' && importText.trim().length < 20) {
      setImportError('Văn bản cần ít nhất 20 ký tự.');
      return;
    }
    setImporting(true);
    try {
      let result;
      if (importTab === 'file') {
        const form = new FormData();
        form.append('file', importFile);
        result = await upload('/api/imports/exam', form);
      } else {
        result = await api('/api/imports/exam', {
          method: 'POST',
          body: { text: importText },
        });
      }
      setImportResult(result);
      setTitle((current) => current || result.suggestedTitle || '');
    } catch (cause) {
      setImportError(cause.message);
    } finally {
      setImporting(false);
    }
  }

  function applyImport() {
    if (!importResult) return;
    const mapped = mapImported(importResult.questions);
    setQuestions(mapped);
    setIssues(null);
    setPendingApply(false);
    setImportOpen(false);
    setImportResult(null);
    const firstMissing = mapped.find((question) => !question.correctOption);
    if (firstMissing) {
      setExpanded(new Set([firstMissing.key]));
      toast.info('Một số câu chưa có đáp án chính thức. Mở câu được đánh dấu để chọn.');
    } else {
      toast.success(`Đã đưa ${mapped.length} câu vào bản nháp. Kiểm tra rồi bấm Lưu đề.`);
    }
    document.getElementById('question-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function requestApply() {
    if (!importResult?.questions?.length) return;
    if (questions.length > 0) setPendingApply(true);
    else applyImport();
  }

  function validate() {
    const problems = [];
    if (!title.trim()) problems.push('Đặt tên cho đề.');
    const minutes = Number(duration);
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) {
      problems.push('Thời gian làm bài phải là số nguyên từ 1 đến 600 phút.');
    }
    if (questions.length === 0) problems.push('Đề cần ít nhất một câu hỏi.');

    const invalidKeys = new Set();
    questions.forEach((question, index) => {
      const label = `Câu ${index + 1}`;
      let hasError = false;
      if (!question.content.trim()) {
        problems.push(`${label}: thiếu nội dung câu hỏi.`);
        hasError = true;
      }
      for (const letter of LETTERS) {
        if (!question[`option${letter}`].trim()) {
          problems.push(`${label}: thiếu phương án ${letter}.`);
          hasError = true;
        }
      }
      if (!LETTERS.includes(question.correctOption)) {
        problems.push(`${label}: chưa chọn đáp án chính thức.`);
        hasError = true;
      }
      if (hasError) invalidKeys.add(question.key);
    });

    return { problems, invalidKeys };
  }

  async function save() {
    const result = validate();
    if (result.problems.length) {
      setIssues(result.problems);
      setExpanded((current) => new Set([...current, ...result.invalidKeys]));
      toast.error(`Còn ${result.problems.length} mục cần sửa trước khi lưu.`);
      window.setTimeout(() => {
        document.getElementById('editor-issues')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
      return;
    }

    setIssues(null);
    setSaving(true);
    setSaveError(null);
    const payload = {
      title: title.trim(),
      subject: subject.trim(),
      topic: topic.trim(),
      description: description.trim(),
      durationMinutes: Number(duration),
      documentIds,
      questions: questions.map((question) => ({
        content: question.content,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctOption: question.correctOption,
      })),
    };

    try {
      await api(isNew ? '/api/exams' : `/api/exams/${examId}`, {
        method: isNew ? 'POST' : 'PUT',
        body: payload,
      });
      toast.success(isNew ? 'Đã tạo đề thi.' : 'Đã lưu thay đổi của đề.');
      navigate('/exams');
    } catch (cause) {
      setSaveError(cause.message);
      setSaving(false);
    }
  }

  if (!isNew && examState.loading && !examState.data) {
    return <Loading label="Đang tải đề thi…" />;
  }

  if (!isNew && examState.error && !examState.data) {
    return (
      <>
        <Link href="/exams" className="back-link">
          <ChevronLeftIcon />
          Đề thi
        </Link>
        <ErrorState message={examState.error} onRetry={examState.reload} />
      </>
    );
  }

  if (!isNew && !initialized) return <Loading label="Đang chuẩn bị bản sửa…" />;

  return (
    <>
      <PageHeader
        title={isNew ? 'Nhập đề mới' : 'Sửa đề thi'}
        lead={
          isNew
            ? 'Nhập từ PDF, DOCX hoặc dán văn bản, rồi kiểm tra từng câu và đáp án chính thức trước khi lưu.'
            : 'Nội dung đề được giữ nguyên. Sửa câu hỏi, đáp án hoặc liên kết tài liệu; lịch sử làm bài cũ không đổi.'
        }
        back={
          <Link href="/exams" className="back-link">
            <ChevronLeftIcon />
            Đề thi
          </Link>
        }
        actions={
          <>
            <Link href="/exams" className="btn btn--secondary">
              Hủy
            </Link>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Đang lưu…' : 'Lưu đề'}
            </Button>
          </>
        }
      />

      <div className="editor-grid">
        <div>
          <Panel className="import-panel">
            <div className="panel-head">
              <h2>Nhập nhanh câu hỏi</h2>
              <Button variant="ghost" size="sm" onClick={() => setImportOpen((value) => !value)}>
                {importOpen ? 'Thu gọn' : 'Mở nhập'}
              </Button>
            </div>

            {importOpen ? (
              <div className="import-body">
                <div className="tabs" role="tablist" aria-label="Nguồn đề">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={importTab === 'file'}
                    className="tab"
                    onClick={() => {
                      setImportTab('file');
                      setImportResult(null);
                      setImportError(null);
                    }}
                  >
                    Tải tệp
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={importTab === 'text'}
                    className="tab"
                    onClick={() => {
                      setImportTab('text');
                      setImportResult(null);
                      setImportError(null);
                    }}
                  >
                    Dán văn bản
                  </button>
                </div>

                {importTab === 'file' ? (
                  <Field
                    label="Tệp đề PDF, DOCX, TXT hoặc MD"
                    htmlFor="exam-file"
                    hint="Bộ phân tích nhận dạng “Câu 1.”, bốn phương án A–D và bảng đáp án. Tối đa 15 MB."
                  >
                    <input
                      id="exam-file"
                      className="input"
                      type="file"
                      accept=".pdf,.docx,.txt,.md"
                      onChange={(event) => {
                        setImportFile(event.target.files?.[0] ?? null);
                        setImportResult(null);
                        setImportError(null);
                      }}
                    />
                  </Field>
                ) : (
                  <Field label="Văn bản đề" htmlFor="exam-text">
                    <textarea
                      id="exam-text"
                      className="textarea textarea--mono"
                      rows={8}
                      value={importText}
                      onChange={(event) => setImportText(event.target.value)}
                      placeholder={'Câu 1. Nội dung…\nA. …\nB. …\nC. …\nD. …'}
                    />
                  </Field>
                )}

                <div className="row">
                  <Button variant="outline" onClick={runImport} disabled={importing}>
                    {importing ? 'Đang phân tích…' : 'Phân tích câu hỏi'}
                  </Button>
                  <span className="muted small">Không tự bịa câu hỏi hay đáp án còn thiếu.</span>
                </div>

                {importError ? <div className="notice notice--danger">{importError}</div> : null}

                {importResult ? (
                  <div className="import-result">
                    {importResult.questions.length ? (
                      <Notice tone="success">
                        Nhận ra <strong>{importResult.questions.length} câu</strong> và{' '}
                        <strong>
                          {importResult.questions.filter((question) => question.correctOption).length} đáp án
                        </strong>{' '}
                        từ {importResult.sourceName} ({formatNumber(importResult.charCount)} ký tự).
                      </Notice>
                    ) : (
                      <Notice tone="warning" title="Không nhận ra câu hỏi.">
                        Cần mỗi câu bắt đầu bằng “Câu 1.” và có bốn phương án A, B, C, D. Bạn vẫn có thể dùng
                        văn bản đã trích để nhập thủ công bên dưới.
                      </Notice>
                    )}

                    {importResult.warnings?.length ? (
                      <Notice tone="warning" title={`${importResult.warnings.length} cảnh báo:`}>
                        <ul className="warning-list">
                          {importResult.warnings.slice(0, 6).map((warning) => (
                            <li key={warning}>{warning}</li>
                          ))}
                          {importResult.warnings.length > 6 ? (
                            <li>Còn {importResult.warnings.length - 6} cảnh báo khác.</li>
                          ) : null}
                        </ul>
                      </Notice>
                    ) : null}

                    {importResult.questions.length ? (
                      <>
                        <div className="preview-list">
                          {importResult.questions.slice(0, 3).map((question) => (
                            <div className="preview-item" key={question.position}>
                              <b>Câu {question.position}</b>
                              {plainPreview(question.content, 110)}
                              <span className="muted"> · Đáp án {question.correctOption || 'chưa có'}</span>
                            </div>
                          ))}
                        </div>
                        <div className="row">
                          <Button onClick={requestApply}>
                            Dùng {importResult.questions.length} câu này
                          </Button>
                          <Button variant="ghost" onClick={() => setImportResult(null)}>
                            Bỏ kết quả
                          </Button>
                        </div>
                      </>
                    ) : (
                      <pre className="upload-preview">{importResult.text.slice(0, 1200)}</pre>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}
          </Panel>

          {issues ? (
            <div id="editor-issues" className="editor-issues">
              <Notice tone="warning" title={`Chưa lưu được — ${issues.length} mục cần sửa:`}>
                <ul className="warning-list">
                  {issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </Notice>
            </div>
          ) : null}

          {saveError ? (
            <div className="editor-issues">
              <div className="notice notice--danger">{saveError}</div>
            </div>
          ) : null}

          <div className="editor-toolbar">
            <h2>Câu hỏi ({questions.length})</h2>
            <div className="row">
              {questions.length > 1 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setExpanded(allExpanded ? new Set() : new Set(questions.map((question) => question.key)))
                  }
                >
                  {allExpanded ? 'Thu gọn tất cả' : 'Mở tất cả'}
                </Button>
              ) : null}
              <Button variant="secondary" size="sm" onClick={addQuestion}>
                <PlusIcon />
                Thêm câu hỏi
              </Button>
            </div>
          </div>

          <div id="question-list">
            {questions.length === 0 ? (
              <Panel className="panel--muted">
                <div className="empty">
                  <h3>Chưa có câu hỏi</h3>
                  <p>
                    Dùng “Nhập nhanh” ở trên để phân tích một tệp đề, hoặc thêm câu hỏi thủ công rồi
                    điền nội dung, bốn phương án và đáp án chính thức.
                  </p>
                  <div className="row">
                    <Button size="sm" variant="secondary" onClick={addQuestion}>
                      <PlusIcon />
                      Thêm câu hỏi
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setImportOpen(true)}>
                      Nhập từ tệp
                    </Button>
                  </div>
                </div>
              </Panel>
            ) : null}

            {questions.map((question, index) => {
              const open = expanded.has(question.key);
              const hasError = Boolean(issues) && (!question.content.trim() || !question.correctOption);
              return (
                <div className={`q-edit ${hasError ? 'has-error' : ''}`.trim()} key={question.key}>
                  <button
                    type="button"
                    className="q-edit-head"
                    aria-expanded={open}
                    onClick={() => toggleQuestion(question.key)}
                  >
                    <span className="q-edit-num">Câu {index + 1}</span>
                    <span className="q-edit-preview">
                      {question.content.trim() ? plainPreview(question.content, 120) : 'Chưa có nội dung'}
                    </span>
                    {question.correctOption ? (
                      <span className="pill pill--neutral">Đáp án {question.correctOption}</span>
                    ) : (
                      <span className="pill pill--warning">Chưa có đáp án</span>
                    )}
                    <span className="q-edit-caret" aria-hidden="true">
                      {open ? '▴' : '▾'}
                    </span>
                  </button>

                  {open ? (
                    <div className="q-edit-body">
                      <Field label="Nội dung câu hỏi" htmlFor={`content-${question.key}`}>
                        <textarea
                          id={`content-${question.key}`}
                          className="textarea textarea--mono"
                          rows={5}
                          value={question.content}
                          onChange={(event) =>
                            updateQuestion(question.key, { content: event.target.value })
                          }
                          placeholder="Giữ nguyên khối sơ đồ trong ```…``` nếu có."
                        />
                      </Field>

                      <div>
                        <span className="field-label">Bốn phương án và đáp án chính thức</span>
                        <div className="option-edit-grid" style={{ marginTop: 6 }}>
                          {LETTERS.map((letter) => (
                            <div className="option-edit" key={letter}>
                              <span className="letter" aria-hidden="true">
                                {letter}
                              </span>
                              <input
                                className="input"
                                value={question[`option${letter}`]}
                                onChange={(event) =>
                                  updateQuestion(question.key, { [`option${letter}`]: event.target.value })
                                }
                                aria-label={`Phương án ${letter}`}
                                placeholder={`Phương án ${letter}`}
                              />
                              <label className="radio">
                                <input
                                  type="radio"
                                  name={`correct-${question.key}`}
                                  checked={question.correctOption === letter}
                                  onChange={() => updateQuestion(question.key, { correctOption: letter })}
                                />
                                Đúng
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="q-edit-foot">
                        <span className="muted small">
                          Đáp án chính thức:{' '}
                          {question.correctOption ? `phương án ${question.correctOption}` : 'chưa chọn'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.key)}
                          aria-label={`Xóa câu ${index + 1}`}
                        >
                          <TrashIcon />
                          Xóa câu
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="editor-side">
          <Panel title="Thông tin đề" className="editor-settings">
            <div className="form-grid">
              <Field label="Tên đề" htmlFor="exam-title">
                <input
                  id="exam-title"
                  className="input"
                  value={title}
                  maxLength={200}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Đề mô phỏng 5 — Tổng hợp"
                />
              </Field>
              <Field label="Môn học" htmlFor="exam-subject">
                <input
                  id="exam-subject"
                  className="input"
                  value={subject}
                  maxLength={120}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="MIS3047 — Quản lý quy trình kinh doanh"
                />
              </Field>
              <Field label="Chủ đề" htmlFor="exam-topic">
                <input
                  id="exam-topic"
                  className="input"
                  value={topic}
                  maxLength={160}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="BPMN · Tính toán · AI"
                />
              </Field>
              <Field label="Thời gian làm bài (phút)" htmlFor="exam-duration">
                <input
                  id="exam-duration"
                  className="input"
                  type="number"
                  min="1"
                  max="600"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </Field>
              <Field label="Mô tả" htmlFor="exam-description">
                <textarea
                  id="exam-description"
                  className="textarea"
                  rows={3}
                  value={description}
                  maxLength={2000}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ghi chú ngắn về phạm vi đề."
                />
              </Field>
            </div>
          </Panel>

          <Panel
            title={`Tài liệu liên kết (${documentIds.length})`}
            action={
              documents.length ? (
                <button
                  type="button"
                  className="text-link"
                  onClick={() =>
                    setDocumentIds(documentIds.length === documents.length ? [] : documents.map((doc) => doc.id))
                  }
                >
                  {documentIds.length === documents.length ? 'Bỏ chọn' : 'Chọn tất cả'}
                </button>
              ) : null
            }
          >
            {documentsState.loading ? <Loading label="Đang tải tài liệu…" /> : null}
            {!documentsState.loading && documents.length === 0 ? (
              <p className="panel-text">
                Chưa có tài liệu. <Link href="/documents" className="text-link">Thêm tài liệu</Link> để AI có
                căn cứ giải thích.
              </p>
            ) : null}
            {documents.length ? (
              <>
                <div className="doc-pick">
                  {documents.map((document) => (
                    <label className="checkbox-row" key={document.id}>
                      <input
                        type="checkbox"
                        checked={documentIds.includes(document.id)}
                        onChange={() => toggleDocument(document.id)}
                      />
                      <span>
                        {document.title}
                        <br />
                        <small>{formatNumber(document.charCount)} ký tự</small>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="hint" style={{ marginTop: 10 }}>
                  AI chỉ đọc các tài liệu được chọn. Không chọn tài liệu nào thì phần giải thích sẽ từ chối.
                </p>
              </>
            ) : null}
          </Panel>

          <div className="editor-save">
            <Button block onClick={save} disabled={saving}>
              {saving ? 'Đang lưu…' : isNew ? 'Tạo đề' : 'Lưu thay đổi'}
            </Button>
            <Link href="/exams" className="btn btn--secondary btn--block">
              Hủy và quay lại
            </Link>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={pendingApply}
        title="Thay thế câu hỏi hiện tại?"
        description={
          <>
            Bản nháp đang có <strong>{questions.length} câu</strong>. Dùng bộ câu hỏi vừa phân tích sẽ thay
            thế toàn bộ danh sách hiện tại. Đề chỉ được ghi vào cơ sở dữ liệu khi bạn bấm Lưu.
          </>
        }
        confirmLabel="Thay thế câu hỏi"
        onConfirm={applyImport}
        onClose={() => setPendingApply(false)}
      />
    </>
  );
}
