type Timer = ReturnType<typeof setTimeout>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <Functioin extends (...args: any[]) => void>(
  targetFunction: Functioin,
  delay: number,
): ((...args: Parameters<Functioin>) => void) => {
  let timer: Timer;

  return function (this: unknown, ...args: Parameters<Functioin>) {
    clearTimeout(timer as Timer);

    timer = setTimeout(() => {
      targetFunction.apply(this, args);
    }, delay);
  };
};
