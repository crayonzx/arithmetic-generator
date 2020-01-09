/**
 * 验证表达式是否适合作为考题
 *
 * 访问者模式
 * 桥接模式
 */

import { Expression, Visitor, RationalNumber } from "./interface";
import { Fraction, Integer } from "./number";
import { BinaryExpression } from "./expression";

export class Validator {
  private imp = new ValidatorImp();

  validate(expression: Expression): boolean {
    return this.imp.validateImp(expression);
  }
}

class ValidatorImp implements Visitor {
  /** 保存验证结果 */
  private isValid = true;

  validateImp(expression: Expression): boolean {
    this.isValid = true;
    expression.accept(this);
    return this.isValid;
  }

  /** 检查数字是否符合要求，并保存结果 */
  private isValidNumber(number: RationalNumber): boolean {
    if (number instanceof Fraction) {
      return Math.abs(number.getNumerator()) < 10000 && Math.abs(number.getDenominator()) < 10000;
    }
    console.assert(false);
    return true;
  }
  private isZero(expression: Expression): boolean {
    return expression.calculate().equals(0);
  }
  private isOne(expression: Expression): boolean {
    return expression.calculate().equals(1);
  }

  private checkResult(result: boolean) {
    if (!result) this.isValid = result;
    return result;
  }

  visitFraction(number: Fraction): boolean {
    // 生成的分数应该已经符合要求
    // console.assert(this.isValidNumber(number));
    return true;
  }
  visitInteger(number: Integer): boolean {
    // 生成的整数应该已经符合要求
    // console.assert(this.isValidNumber(number));
    return true;
  }
  visitAdd(add: BinaryExpression): boolean {
    return this.checkResult(
      !this.isZero(add.getLeft()) &&
        !this.isZero(add.getRight()) &&
        this.isValidNumber(add.calculate())
    );
  }
  visitSub(sub: BinaryExpression): boolean {
    return this.checkResult(
      !this.isZero(sub.getLeft()) &&
        !this.isZero(sub.getRight()) &&
        this.isValidNumber(sub.calculate())
    );
  }
  visitMul(mul: BinaryExpression): boolean {
    return this.checkResult(
      !this.isZero(mul.getLeft()) &&
        !this.isZero(mul.getRight()) &&
        !this.isOne(mul.getLeft()) &&
        !this.isOne(mul.getRight()) &&
        this.isValidNumber(mul.calculate())
    );
  }
  visitDiv(div: BinaryExpression): boolean {
    // 除法的除数不能为0
    return this.checkResult(
      !this.isZero(div.getLeft()) &&
        !this.isZero(div.getRight()) &&
        !this.isOne(div.getRight()) &&
        this.isValidNumber(div.calculate())
    );
  }
}
