// Top-down F1 car, pointing right (DESIGN_SPEC §4.5).
export default function Car() {
  return (
    <svg className="car" width="30" height="14" viewBox="0 0 30 14" aria-hidden="true">
      <rect x="0" y="0" width="3" height="14" rx="1" fill="#FF3B30" />
      <rect x="5" y="0" width="7" height="3" rx="1" fill="#6A6A72" />
      <rect x="5" y="11" width="7" height="3" rx="1" fill="#6A6A72" />
      <rect x="2" y="4" width="24" height="6" rx="3" fill="#FF3B30" />
      <rect x="18" y="0" width="6" height="3" rx="1" fill="#6A6A72" />
      <rect x="18" y="11" width="6" height="3" rx="1" fill="#6A6A72" />
      <rect x="26" y="1" width="3" height="12" rx="1" fill="#FF3B30" />
      <circle cx="12" cy="7" r="1.8" fill="#121215" />
    </svg>
  );
}
