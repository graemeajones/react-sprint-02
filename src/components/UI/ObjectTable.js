import './ObjectTable.scss';

export default function ObjectTable({ object, attributes }) {
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <table className="ObjectTable">
      <tbody>
      {
        attributes.map((attribute) => {
          const value = typeof(object[attribute.key]) === "boolean" ? (object[attribute.key] ? "true" : "false") : object[attribute.key];
          return (
            <tr key={attribute.key}>
              <td className="left">{attribute.label}</td>
              <td className="right">{value}</td>
            </tr>
          )
        })
      } 
      </tbody>
    </table>
  );
}