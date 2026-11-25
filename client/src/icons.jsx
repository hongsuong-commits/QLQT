function Base({ size = 16, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9v11h13V9" />
      <path d="M10 20v-5.5h4V20" />
    </Base>
  );
}

export function ExamIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 11h6M9 15h6M9 19h3" />
    </Base>
  );
}

export function BookIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M4 18.5V21M8 7h8M8 11h8" />
    </Base>
  );
}

export function HistoryIcon(props) {
  return (
    <Base {...props}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3 4v4h4" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function MenuIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}

export function CloseIcon(props) {
  return (
    <Base {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Base>
  );
}

export function PlusIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function UploadIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4 15v4h16v-4" />
    </Base>
  );
}

export function TrashIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" />
      <path d="M10 11v5M14 11v5" />
    </Base>
  );
}

export function PencilIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 20h4L20 8l-4-4L4 16z" />
      <path d="m14.5 5.5 4 4" />
    </Base>
  );
}

export function FlagIcon(props) {
  return (
    <Base {...props}>
      <path d="M5 21V4" />
      <path d="M5 5h11l-1.5 4L16 13H5" />
    </Base>
  );
}

export function CheckIcon(props) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 6.5" />
    </Base>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <Base {...props}>
      <path d="m14.5 5-7 7 7 7" />
    </Base>
  );
}

export function ChevronRightIcon(props) {
  return (
    <Base {...props}>
      <path d="m9.5 5 7 7-7 7" />
    </Base>
  );
}

export function SparkIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </Base>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function ClockIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  );
}

export function EyeIcon(props) {
  return (
    <Base {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  );
}
