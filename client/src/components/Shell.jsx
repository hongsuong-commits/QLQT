import { useEffect, useState } from 'react';
import { Link, useRouter } from '../router.jsx';
import { api } from '../api.js';
import {
  BookIcon,
  CloseIcon,
  ExamIcon,
  HistoryIcon,
  HomeIcon,
  MenuIcon,
} from '../icons.jsx';
import { IconButton } from './ui.jsx';

const NAV = [
  { href: '/', label: 'Tổng quan', Icon: HomeIcon },
  { href: '/exams', label: 'Đề thi', Icon: ExamIcon },
  { href: '/documents', label: 'Tài liệu', Icon: BookIcon },
  { href: '/history', label: 'Lịch sử', Icon: HistoryIcon },
];

export function pageTitle(path) {
  const clean = path.split('?')[0].replace(/\/+$/, '') || '/';
  if (clean === '/') return 'Tổng quan';
  if (clean === '/exams' || clean.startsWith('/exams/')) return 'Đề thi';
  if (clean === '/documents') return 'Tài liệu';
  if (clean === '/history') return 'Lịch sử';
  if (clean.startsWith('/take/')) return 'Làm bài';
  if (clean.startsWith('/result/')) return 'Kết quả';
  if (clean.startsWith('/review/')) return 'Xem lại';
  return 'Sổ Đề';
}

function AiFoot({ ai }) {
  const configured = Boolean(ai?.configured);
  return (
    <div className="side-foot">
      <div className="ai-row">
        <span className={`ai-dot ${configured ? 'on' : ''}`} aria-hidden="true" />
        {ai ? (configured ? 'AI đã cấu hình' : 'AI chưa cấu hình') : 'Đang kiểm tra AI'}
      </div>
      <p>
        {configured
          ? `${ai.model} · Giải thích chỉ dùng tài liệu đã liên kết.`
          : 'Đặt AI_API_KEY trong .env để bật giải thích câu sai.'}
      </p>
    </div>
  );
}

function NavList({ onNavigate }) {
  return (
    <nav className="nav" aria-label="Điều hướng chính">
      {NAV.map(({ href, label, Icon }) => (
        <Link key={href} href={href} className="nav-link" onClick={onNavigate}>
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default function Shell({ children }) {
  const { path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ai, setAi] = useState(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    let alive = true;
    api('/api/ai/status')
      .then((result) => {
        if (alive) setAi(result);
      })
      .catch(() => {
        if (alive) setAi({ configured: false, model: '' });
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.title = `${pageTitle(path)} · Sổ Đề`;
  }, [path]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        Bỏ qua điều hướng
      </a>

      <aside className="sidebar">
        <div className="brand">
          <span className="brand-name">Sổ Đề</span>
          <span className="brand-meta">MIS3047 · Luyện đề</span>
        </div>
        <NavList />
        <AiFoot ai={ai} />
      </aside>

      <header className="topbar">
        <span className="topbar-title">{pageTitle(path)}</span>
        <IconButton label="Mở điều hướng" onClick={() => setMenuOpen(true)}>
          <MenuIcon size={18} />
        </IconButton>
      </header>

      {menuOpen ? (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Điều hướng">
          <div className="mobile-sheet-head">
            <div className="brand">
              <span className="brand-name">Sổ Đề</span>
              <span className="brand-meta">MIS3047 · Luyện đề</span>
            </div>
            <IconButton label="Đóng điều hướng" onClick={() => setMenuOpen(false)}>
              <CloseIcon size={18} />
            </IconButton>
          </div>
          <div className="mobile-nav">
            <NavList onNavigate={() => setMenuOpen(false)} />
          </div>
          <AiFoot ai={ai} />
        </div>
      ) : null}

      <main id="main" className="main" tabIndex={-1}>
        <div className={`page ${path === '/' ? 'page--home' : ''}`.trim()}>{children}</div>
      </main>
    </div>
  );
}
