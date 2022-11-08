import { useRef, useState, useLayoutEffect } from 'react';

export default function useDimensions(dependencies=[]) {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({});
  useLayoutEffect(() => { 
    ref.current && 
      setDimensions(ref.current.getBoundingClientRect().toJSON());
  }, dependencies);

  return [ref, dimensions];
}