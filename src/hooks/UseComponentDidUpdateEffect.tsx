/**
 * Custom use effect hooks to mimic the deprecated componentDidUpdate function.
 * This will NOT fire on the initial render but is active thereafter.
 */

import { useEffect, useRef } from "react";

export const useComponentDidUpdateEffect = (
  func: () => void,
  dependencies: any[],
) => {
  const componentDidUpdate = useRef(false);

  useEffect(() => {
    if (componentDidUpdate.current) {
      func();
    } else {
      componentDidUpdate.current = true;
    }
  }, dependencies);
};
