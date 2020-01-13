/**
 * 表达式工厂
 *
 * 简单工厂模式
 * 单例模式
 */

import { Operator } from "./const";
import {
  BinaryExpression,
  AddExpression,
  SubExpression,
  MulExpression,
  DivExpression,
  PowExpression
} from "./expression";
import { randomInt } from "./utils";

/** 表达式工厂 */
export class ExpressionFactory {
  /** 单例模式 */
  private static instance: ExpressionFactory;
  static getInstance(): ExpressionFactory {
    if (!this.instance) this.instance = new ExpressionFactory();
    return this.instance;
  }

  private expressionByOperator = {
    [new AddExpression().getOperator()]: AddExpression,
    [new SubExpression().getOperator()]: SubExpression,
    [new MulExpression().getOperator()]: MulExpression,
    [new DivExpression().getOperator()]: DivExpression,
    [new PowExpression().getOperator()]: PowExpression
  };

  /** 给定运算符，产生新的表达式，简单工厂模式 */
  newExpression(operator: Operator): BinaryExpression {
    return new this.expressionByOperator[operator]();
  }

  /** 给定一组可选运算符，随机选择其中一个来产生新的表达式 */
  randomExpression(candidates: Operator[]): BinaryExpression {
    return this.newExpression(candidates[randomInt(candidates.length - 1)]);
  }
}
