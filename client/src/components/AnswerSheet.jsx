import { statusLabel } from '../format.js';

function cellClass({ mode, answered, status, active, flagged }) {
  const classes = ['sheet-cell'];
  if (mode === 'result') {
    classes.push(`is-${status}`);
  } else if (answered) {
    classes.push('is-answered');
  }
  if (active) classes.push('is-current');
  if (flagged) classes.push('is-flagged');
  return classes.join(' ');
}

export default function AnswerSheet({
  questions,
  currentIndex = -1,
  onSelect,
  mode = 'take',
  mini = false,
}) {
  return (
    <div className={`sheet ${mini ? 'sheet--mini' : ''}`.trim()} role="group" aria-label="Phiếu trả lời">
      {questions.map((question, index) => {
        const answered = mode === 'result' ? question.status !== 'unanswered' : Boolean(question.answered);
        const active = index === currentIndex;
        const label =
          mode === 'result'
            ? `Câu ${question.position}: ${statusLabel(question.status)}${question.flagged ? ', có cờ' : ''}`
            : `Câu ${question.position}: ${answered ? 'đã trả lời' : 'chưa trả lời'}${
                question.flagged ? ', có cờ' : ''
              }`;
        if (onSelect) {
          return (
            <button
              type="button"
              key={question.position}
              className={cellClass({
                mode,
                answered,
                status: question.status,
                active,
                flagged: question.flagged,
              })}
              aria-label={label}
              aria-current={active ? 'true' : undefined}
              onClick={() => onSelect(index)}
            >
              {question.position}
            </button>
          );
        }
        return (
          <span
            key={question.position}
            className={cellClass({
              mode,
              answered,
              status: question.status,
              active,
              flagged: question.flagged,
            })}
            title={label}
            aria-label={label}
            role="img"
          >
            {question.position}
          </span>
        );
      })}
    </div>
  );
}

export function SheetLegend({ mode = 'take' }) {
  if (mode === 'result') {
    return (
      <div className="legend" aria-label="Chú thích phiếu trả lời">
        <span className="legend-item">
          <span className="legend-swatch is-correct" aria-hidden="true" /> Đúng
        </span>
        <span className="legend-item">
          <span className="legend-swatch is-wrong" aria-hidden="true" /> Sai
        </span>
        <span className="legend-item">
          <span className="legend-swatch is-unanswered" aria-hidden="true" /> Chưa làm
        </span>
        <span className="legend-item">
          <span className="legend-swatch is-flagged" aria-hidden="true" /> Có cờ
        </span>
      </div>
    );
  }
  return (
    <div className="legend" aria-label="Chú thích phiếu trả lời">
      <span className="legend-item">
        <span className="legend-swatch is-answered" aria-hidden="true" /> Đã trả lời
      </span>
      <span className="legend-item">
        <span className="legend-swatch" aria-hidden="true" /> Chưa trả lời
      </span>
      <span className="legend-item">
        <span className="legend-swatch is-current" aria-hidden="true" /> Đang xem
      </span>
      <span className="legend-item">
        <span className="legend-swatch is-flagged" aria-hidden="true" /> Có cờ
      </span>
    </div>
  );
}
