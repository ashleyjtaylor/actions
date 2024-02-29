export const add = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr)

export const subtract = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev - curr)

export const multiply = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev * curr)

export const divide = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev / curr)

export const random = () => Math.random()

export const mod = (num1: number, num2: number) => num1 % num2
