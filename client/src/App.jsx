import { RouterProvider, matchPath, useRouter } from './router.jsx';
import { ToastProvider } from './components/ui.jsx';
import Shell from './components/Shell.jsx';
import Home from './pages/Home.jsx';
import Exams from './pages/Exams.jsx';
import ExamEditor from './pages/ExamEditor.jsx';
import Documents from './pages/Documents.jsx';
import Take from './pages/Take.jsx';
import Result from './pages/Result.jsx';
import Review from './pages/Review.jsx';
import History from './pages/History.jsx';
import NotFound from './pages/NotFound.jsx';

function Routes() {
  const { path } = useRouter();
  const clean = path.split('?')[0].replace(/\/+$/, '') || '/';

  if (clean === '/') return <Home />;
  if (clean === '/exams') return <Exams />;
  if (clean === '/exams/new') return <ExamEditor />;

  const edit = matchPath(clean, '/exams/:id/edit');
  if (edit) return <ExamEditor examId={edit.id} />;

  const take = matchPath(clean, '/take/:sessionId');
  if (take) return <Take sessionId={take.sessionId} />;

  const result = matchPath(clean, '/result/:attemptId');
  if (result) return <Result attemptId={result.attemptId} />;

  const review = matchPath(clean, '/review/:attemptId');
  if (review) return <Review attemptId={review.attemptId} />;

  if (clean === '/documents') return <Documents />;
  if (clean === '/history') return <History />;

  return <NotFound />;
}

export default function App() {
  return (
    <RouterProvider>
      <ToastProvider>
        <Shell>
          <Routes />
        </Shell>
      </ToastProvider>
    </RouterProvider>
  );
}
