/** 运算符 */
export const enum Operator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "×",
  Division = "÷",
  Power = "^"
}

/** 优先级 */
export const enum Priority {
  Addition = 1,
  Subtraction = 1,
  Multiplication = 2,
  Division = 2,
  Power = 3,
  /** 数字的优先级最大 */
  Number = 9
}
