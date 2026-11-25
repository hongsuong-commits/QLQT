import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons.jsx';

export function cx(...values) {
  return values.filter(Boolean).join(' ');
}

export function Button({ variant = 'primary', size, block, className = '', children, ...rest }) {
  return (
    <button
      type="button"
      className={cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({ label, className = '', children, ...rest }) {
  return (
    <button type="button" className={cx('icon-btn', className)} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}

export function Panel({ title, action, children, className = '', as: Tag = 'section', ...rest }) {
  return (
    <Tag className={cx('panel', className)} {...rest}>
      {(title || action) && (
        <div className="panel-head">
          {typeof title === 'string' ? <h2>{title}</h2> : title}
          {action}
        </div>
      )}
      {children}
    </Tag>
  );
}

export function PageHeader({ title, lead, actions, back }) {
  return (
    <header className="page-head">
      <div>
        {back}
        <h1>{title}</h1>
        {lead ? <p className="page-lead">{lead}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

export function Tile({ label, value, unit, caption }) {
  return (
    <div className="tile">
      <span className="tile-label">{label}</span>
      <div>
        <div className="tile-value">
          {value}
          {unit ? <small>{unit}</small> : null}
        </div>
        {caption ? <div className="tile-caption">{caption}</div> : null}
      </div>
    </div>
  );
}

export function Field({ label, htmlFor, hint, children, className = '' }) {
  return (
    <div className={cx('field', className)}>
      {label ? (
        <label htmlFor={htmlFor}>
          {label}
          {hint ? <span className="hint"> {hint}</span> : null}
        </label>
      ) : null}
      {children}
    </div>
  );
}

export function Notice({ tone = 'info', title, children }) {
  return (
    <div className={cx('notice', `notice--${tone}`)}>
      <div>
        {title ? <strong>{title}</strong> : null}
        {title ? ' ' : null}
        {children}
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  if (status === 'correct') return <span className="pill pill--positive">Đúng</span>;
  if (status === 'wrong') return <span className="pill pill--negative">Sai</span>;
  if (status === 'unanswered') return <span className="pill pill--outline">Chưa trả lời</span>;
  return null;
}

export function Loading({ label = 'Đang tải…' }) {
  return (
    <div className="loading" role="status">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-block" role="alert">
      <span>{message || 'Không tải được dữ liệu.'}</span>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Thử lại
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer, wide = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => {
      const focusable = ref.current?.querySelector(
        'input:not([type="hidden"]), textarea, select, button, [href]',
      );
      focusable?.focus();
    }, 20);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className={cx('modal', wide && 'modal--wide')}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        ref={ref}
      >
        <div className="modal-head">
          <h2 className="modal-title">{title}</h2>
          <IconButton label="Đóng" className="modal-close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-foot">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  tone = 'primary',
  busy = false,
  error,
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onClose={busy ? undefined : onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Đang xử lý…' : confirmLabel}
          </Button>
        </>
      }
    >
      <div>{description}</div>
      {error ? <div className="ai-error">{error}</div> : null}
    </Modal>
  );
}

const ToastContext = createContext(null);
let toastSequence = 0;

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setItems((list) => list.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (message, tone = 'info') => {
      const id = ++toastSequence;
      setItems((list) => [...list.slice(-3), { id, message, tone }]);
      const timer = window.setTimeout(() => dismiss(id), tone === 'error' ? 8000 : 5000);
      timers.current.set(id, timer);
      return id;
    },
    [dismiss],
  );

  useEffect(
    () => () => {
      for (const timer of timers.current.values()) window.clearTimeout(timer);
    },
    [],
  );

  const value = useMemo(
    () => ({
      push,
      success: (message) => push(message, 'success'),
      error: (message) => push(message, 'error'),
      info: (message) => push(message, 'info'),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" aria-live="polite">
        {items.map((item) => (
          <div key={item.id} className={cx('toast', `toast--${item.tone}`)} role="status">
            <span>{item.message}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Đóng thông báo"
              onClick={() => dismiss(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('ToastProvider is missing.');
  return value;
}
