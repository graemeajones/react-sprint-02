import './Form.scss';

export default function FormItem({ children, label, htmlFor, advice, error }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
      {
        advice && <p className="FormAdvice">{advice}</p>
      }
      {
        children
      }
      {
        error && <p className="FormError">{error}</p>
      }
    </div>
  );
}