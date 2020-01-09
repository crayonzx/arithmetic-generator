/**
 * 接口定义
 */

import { Priority } from "./const";

/** 表达式 */
export interface Expression {
  /** 获取优先级 */
  getPriority(): Priority;
  /** 计算结果 */
  calculate(): RationalNumber;
  /** 打印输出字符串 */
  print(): string;
  /** 比较两个表达式是否相同或等价 */
  equals(rhs: Expression): boolean;
}

/** 有理数，它也是一种特殊的表达式 */
export interface RationalNumber extends Expression {
  add(rhs: RationalNumber): RationalNumber;
  sub(rhs: RationalNumber): RationalNumber;
  mul(rhs: RationalNumber): RationalNumber;
  div(rhs: RationalNumber): RationalNumber;
  pow(rhs: RationalNumber): RationalNumber;

  /** 转为字符串，与print的区别是它不会输出括号 */
  toString(): string;
}
