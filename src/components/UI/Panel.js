import React from 'react';
import { useState } from 'react';
import ToolTipDecorator from './ToolTipDecorator.js';
import Icon from './Icons.js';
import PropTypes from 'prop-types';
import './Panel.scss';

Panel.propTypes = {
  title: PropTypes.string,
  level: PropTypes.number,
  isOpen: PropTypes.bool
};

export default function Panel({ children, title, level=1, isOpen=false }) {
  // Initialise ----------------------------------
  // State ---------------------------------------
  const [isExpanded, setIsExpanded] = useState(isOpen);

  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className={"Panel PanelLevel" + level + (isExpanded ? " PanelOpen" : " PanelClosed")}>
      <header onClick={() => setIsExpanded(!isExpanded)}>
        <span className="title">{title}</span>
        <span className="icon">
          {
            isExpanded
              ? <ToolTipDecorator message="Click to hide table records">
                  <Icon.Collapse />
                </ToolTipDecorator>
              : <ToolTipDecorator message="Click to show table records">
                  <Icon.Expand />
                </ToolTipDecorator>
          }
        </span>
      </header>
      {
        isExpanded && <main>{children}</main>
      }
    </div>
  );
}

Static.propTypes = {
  level: PropTypes.number
};

function Static({ children, level }) {
  // Initialise ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className={"StaticPanel PanelLevel" + level}>
        {children}
    </div>
  );
}


Container.propTypes = {
  className: PropTypes.string
};

function Container({ children, className="" }) {
  return (
    <div className={"PanelContainer " + className}>
      {children}
    </div>
  );
}

// -----------------------------------------
// Compose Card Object /////////////////////
// -----------------------------------------

Panel.Container = Container;
Panel.Static = Static;
