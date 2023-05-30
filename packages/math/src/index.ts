export const add = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr);

export const subtract = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev - curr);

export const multiply = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev * curr);

export const divide = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev / curr);

// export const random = () => Math.random();
