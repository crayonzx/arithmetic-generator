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

  newExpression(operator: Operator): BinaryExpression {
    return new this.expressionByOperator[operator]();
  }

  randomExpression(candidates: Operator[]): BinaryExpression {
    return this.newExpression(candidates[randomInt(candidates.length - 1)]);
  }
}
