import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react";

const useRelativeFontSize = (
  initialRelativeSize = 0.5,
  initialDimension = "width"
) => {
  if (
    initialDimension !== "width" &&
    initialDimension !== "height" &&
    initialDimension !== "area"
  ) {
    throw new Error(
      'Incorrect argument for useRelativeFontSize. Acceptable options (1 of 3): "width", "height" or "area".'
    );
  }

  try {
    const [fontSize, setFontsize] = useState(0);
    const elementRef = useRef(null);

    const calculateFontsize = (dimension) => {
      if (dimension === "width") {
        console.log(elementRef.current.className + " width: " + elementRef.current.clientWidth);
        return elementRef.current.clientWidth * initialRelativeSize;
      } else if (dimension === "height") {
        console.log(elementRef.current.className + " height: " + elementRef.current.clientHeight);
        return elementRef.current.clientHeight * initialRelativeSize;
      } else {
        return (
          elementRef.current.clientHeight *
          elementRef.current.clientWidth *
          initialRelativeSize
        );
      }
    };

    useEffect(() => {
      setFontsize(calculateFontsize(initialDimension));
    }, []);

    const resizeFont = () => {
      setFontsize(calculateFontsize(initialDimension));
    };

    useEffect(() => {
      window.addEventListener("resize", resizeFont);

      return () => window.removeEventListener("resize", resizeFont);
    }, []);

    return [fontSize, elementRef];
  } catch (error) {
    console.error(error);
  }
};

export default useRelativeFontSize;
