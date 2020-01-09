/**
 * 二元表达式
 *
 * 组合模式
 */

import { Operator, Priority } from "./const";
import { Expression, RationalNumber } from "./interface";
import { Integer } from "./number";

/** 二元表达式 */
export abstract class BinaryExpression implements Expression {
  /** 左侧表达式 */
  protected left: Expression = new Integer();
  /** 右侧表达式 */
  protected right: Expression = new Integer();

  setLeftExpression(left: Expression) {
    this.left = left;
  }

  setRightExpression(right: Expression) {
    this.right = right;
  }

  /** 获取运算符 */
  abstract getOperator(): Operator;
  /** 获取优先级 */
  abstract getPriority(): Priority;

  abstract calculate(): RationalNumber;

  protected printLeft() {
    const left = this.left.print();
    if (this.left.getPriority() < this.getPriority()) {
      // 左侧表达式优先级较低，需加括号
      return `(${left})`;
    }
    return left;
  }

  protected printRight() {
    const right = this.right.print();
    if (this.right.getPriority() <= this.getPriority()) {
      // 右侧表达式优先级较低或相等，需加括号
      return `(${right})`;
    }
    return right;
  }

  print(): string {
    return `${this.printLeft()} ${this.getOperator()} ${this.printRight()}`;
  }

  /** 是否满足交换律 */
  abstract isCommutative(): boolean;

  equals(rhs: Expression): boolean {
    if (rhs instanceof BinaryExpression) {
      if (this.getOperator() === rhs.getOperator()) {
        if (this.left.equals(rhs.left) && this.right.equals(rhs.right)) {
          return true;
        }
        if (this.isCommutative() && this.left.equals(rhs.right) && this.right.equals(rhs.left)) {
          return true;
        }
      }
    }
    return false;
  }
}

export class AddExpression extends BinaryExpression {
  getOperator(): Operator {
    return Operator.Addition;
  }

  getPriority(): Priority {
    return Priority.Addition;
  }

  calculate() {
    return this.left.calculate().add(this.right.calculate());
  }

  isCommutative(): boolean {
    return true;
  }
}
