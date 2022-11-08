import PropTypes from 'prop-types';
import './Card.scss';


Card.propTypes = {
  onClick: PropTypes.func,
  isParentHovering: PropTypes.bool
};

export default function Card({ children, onClick, isParentHovering=false }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>
      {children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string
};

function Container({ children, className="" }) {
  return (
    <div className={"CardContainer " + className}>
      {children}
    </div>
  );
}

// -----------------------------------------
// Compose Card Object /////////////////////
// -----------------------------------------

Card.Container = Container;
