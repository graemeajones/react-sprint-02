import { useRef } from 'react';
import Badge from './Badge.js';

const renderCountStyling = { position: "absolute" };

export default function RenderCount({background="Cyan",fontColor="White"}) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  const renderCount = useRef(0);
  renderCount.current += 1;
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div style={renderCountStyling}>
      <Badge background={background} fontColor={fontColor}>
        {renderCount.current}
      </Badge>
    </div>
  );
}