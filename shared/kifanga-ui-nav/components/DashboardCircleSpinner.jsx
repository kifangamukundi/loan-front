export default function DashboardCircleSpinner({ color = 'green' }) {
  return (
    <svg className={`animate-spin h-10 w-10 text-${color}-600 mx-auto`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
    </svg>
  );
}