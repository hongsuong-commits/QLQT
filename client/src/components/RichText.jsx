import { Fragment } from 'react';

function renderInline(text, keyPrefix) {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={`${keyPrefix}-b-${index}`}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<code key={`${keyPrefix}-c-${index}`}>{token.slice(1, -1)}</code>);
    }
    last = match.index + token.length;
    index += 1;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function RichText({ text, className = '' }) {
  const source = String(text ?? '');
  if (!source.trim()) return null;

  const segments = [];
  const fence = /```[^\n`]*\n?([\s\S]*?)```/g;
  let last = 0;
  let match;
  let index = 0;

  while ((match = fence.exec(source)) !== null) {
    if (match.index > last) {
      segments.push({ type: 'text', value: source.slice(last, match.index) });
    }
    segments.push({ type: 'code', value: match[1].replace(/\s+$/, '') });
    last = match.index + match[0].length;
    index += 1;
  }
  if (last < source.length) segments.push({ type: 'text', value: source.slice(last) });

  return (
    <div className={`rich ${className}`.trim()}>
      {segments.map((segment, segmentIndex) => {
        if (segment.type === 'code') {
          return (
            <pre className="diagram" key={`code-${segmentIndex}`}>
              {segment.value}
            </pre>
          );
        }
        const paragraphs = segment.value.split(/\n{2,}/).filter((value) => value.trim());
        return (
          <Fragment key={`text-${segmentIndex}`}>
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`p-${segmentIndex}-${paragraphIndex}`}>
                {renderInline(paragraph.trim(), `${segmentIndex}-${paragraphIndex}`)}
              </p>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}

export function plainPreview(text, max = 150) {
  const cleaned = String(text ?? '')
    .replace(/```[\s\S]*?```/g, ' [sơ đồ] ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}
