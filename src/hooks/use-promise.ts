import { useLayoutEffect, useState } from 'react';

type isProcessing = boolean;
type result<T> = T;
type rejectReason = any;
type caller = () => void;

/**
 * This hook help allow to control of the promise running and state of execution.
 * You can check if it finish with positive scenario or with exception.
 * @param {() => Promise} promise caller to the promise
 * @param {boolean} [runImmediately=false] if hook should run before first component render, then should be `true`
 */
export function usePromise<T>(
  promise: (...args: any[]) => Promise<T>,
  runImmediately: boolean = false
): [caller, isProcessing, result<T | null>, rejectReason] {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolveResult, setResolveResult] = useState<T | null>(null);
  const [rejectReason, setRejectReason] = useState(null);

  const caller = (): void => {
    setIsProcessing(true);
    setResolveResult(null);
    setRejectReason(null);

    promise()
      .then(r => {
        setIsProcessing(false);
        setResolveResult(r);
      })
      .catch(error => {
        setIsProcessing(false);
        setRejectReason(error);
      });
  };

  useLayoutEffect(() => {
    if (runImmediately) {
      caller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [caller, isProcessing, resolveResult, rejectReason];
}
