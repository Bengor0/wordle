import { useCallback, useEffect, useRef, useState } from "react";

const useRelativeFontSize = (initialRelativeSize = 0.5) => {
  const [relativeSize, setRelativeSize] = useState(initialRelativeSize);
  const [fontSize, setFontsize] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    setFontsize(elementRef.current.clientWidth * initialRelativeSize);
  }, []);

  const resizeFont = useCallback(() => {
    setFontsize(elementRef.current.clientWidth * relativeSize);
    console.log(`${elementRef.current.clientWidth} * ${relativeSize} = ${elementRef.current.clientWidth * relativeSize}`);
  }, []); 

  useEffect(() => {
    window.addEventListener('resize', resizeFont);

    return () => window.removeEventListener('resize', resizeFont);
  }, []); 

  return [fontSize, elementRef];
};

export default useRelativeFontSize;
