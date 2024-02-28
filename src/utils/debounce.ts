type Timer = ReturnType<typeof setTimeout>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timer: Timer;

  return function (this: unknown, ...args: Parameters<F>) {
    clearTimeout(timer as Timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
