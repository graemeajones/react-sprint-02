import './Badge.scss';

export default function Badge({ children, background, fontColor }) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="Badge" style={{ background: background, color: fontColor }}>
      {children}
    </div>
  );
}