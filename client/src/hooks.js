import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './api.js';
import { useRouter } from './router.jsx';
import { useToast } from './components/ui.jsx';

export function useApi(path, { enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(path && enabled));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!path || !enabled) {
      setLoading(false);
      return undefined;
    }
    let alive = true;
    setLoading(true);
    setError(null);
    api(path)
      .then((result) => {
        if (!alive) return;
        setData(result);
        setLoading(false);
      })
      .catch((cause) => {
        if (!alive) return;
        setError(cause.message);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [path, enabled, tick]);

  const reload = useCallback(() => setTick((value) => value + 1), []);
  return { data, error, loading, reload };
}

export function useStartExam() {
  const { navigate } = useRouter();
  const toast = useToast();
  const [starting, setStarting] = useState(null);
  const busy = useRef(false);

  const start = useCallback(
    async (examId) => {
      if (busy.current) return;
      busy.current = true;
      setStarting(examId);
      try {
        const result = await api('/api/attempts/start', {
          method: 'POST',
          body: { examId },
        });
        navigate(`/take/${result.attemptId}`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        busy.current = false;
        setStarting(null);
      }
    },
    [navigate, toast],
  );

  return { start, starting };
}
