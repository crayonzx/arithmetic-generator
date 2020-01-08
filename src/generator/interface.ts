import { Priority } from "./const";

/** 有理数 */
export interface RationalNumber {
  add(rhs: RationalNumber): RationalNumber;
  sub(rhs: RationalNumber): RationalNumber;
  mul(rhs: RationalNumber): RationalNumber;
  div(rhs: RationalNumber): RationalNumber;
  pow(rhs: RationalNumber): RationalNumber;
  /** 打印输出字符串 */
  print(): string;
}

/** 表达式 */
export interface Expression {
  /** 获取优先级 */
  getPriority(): Priority;
  /** 计算结果 */
  calculate(): RationalNumber;
  /** 打印输出字符串 */
  print(): string;
}
