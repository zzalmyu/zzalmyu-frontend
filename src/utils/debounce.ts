type Timer = ReturnType<typeof setTimeout>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <TFunction extends (...args: any[]) => void>(
  targetFunction: TFunction,
  delay: number,
): ((...args: Parameters<TFunction>) => void) => {
  let timer: Timer;

  return function (this: unknown, ...args: Parameters<TFunction>) {
    clearTimeout(timer as Timer);

    timer = setTimeout(() => {
      targetFunction.apply(this, args);
    }, delay);
  };
};
