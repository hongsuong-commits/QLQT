import { Link } from '../router.jsx';
import { PageHeader, Panel } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <>
      <PageHeader title="Không tìm thấy trang" lead="Đường dẫn này không nằm trong ứng dụng." />
      <Panel>
        <p className="panel-text">
          Quay về tổng quan để chọn đề, xem tài liệu ôn tập hoặc mở lịch sử các lần làm.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          <Link href="/" className="btn btn--primary btn--sm">
            Về tổng quan
          </Link>
          <Link href="/exams" className="btn btn--outline btn--sm">
            Đề thi
          </Link>
        </div>
      </Panel>
    </>
  );
}
