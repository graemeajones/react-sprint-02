import { useState } from 'react';
import { ActionTray, ActionAdd, ActionClose } from './Actions.js';
import ToolTipDecorator from './ToolTipDecorator.js';
import './Form.scss';

export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
  const handleSubmit = () => onSubmit();
  const handleCancel = () => onCancel();

  // View ----------------------------------------
  return (  
    <form className="BorderedForm">

      <div className="FormTray">
        {
          children
        }
      </div>

      <ActionTray>
        <ToolTipDecorator message="Submit record">
          <ActionAdd showText onClick={handleSubmit} buttonText="Submit"/>
        </ToolTipDecorator>
        <ToolTipDecorator message="Cancel form">
          <ActionClose showText onClick={handleCancel} buttonText="Cancel" />
        </ToolTipDecorator>
      </ActionTray>

    </form>
  );
}

function Item({ children, label, htmlFor, advice, error }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
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

function useForm(initialRecord, conformance, { isValid, errorMessage }, onCancel, onSubmit) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce((accum, key) => ({ ...accum, [key]: null }), {})
  );

  // Context -------------------------------------
  // Handlers ------------------------------------
  const handleChange = (event) => { 
    const { name, value } = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    setRecord({ ...record, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]});
  };

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(record).forEach((key) => {
      if (isValid[key](record[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    return isRecordValid;
  }

  const handleSubmit = () => { 
    isValidRecord(record) && onSubmit(record) && onCancel();
    setErrors({...errors});
  };
  
  // View ----------------------------------------
  return [record, errors, handleChange, handleSubmit];
}

// -----------------------------------------
// Compose Form Object /////////////////////
// -----------------------------------------
Form.Item = Item;
Form.useForm = useForm;
