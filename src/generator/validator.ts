/**
 * 验证表达式是否适合作为考题
 *
 * 访问者模式
 * 桥接模式
 */

import { Expression, Visitor, RationalNumber } from "./interface";
import { Fraction, Integer } from "./number";
import { BinaryExpression } from "./expression";
import { randomInt } from "./utils";

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
    // 加法两边不能为0
    const left = add.getLeft().calculate();
    const right = add.getRight().calculate();
    return this.checkResult(
      !left.equals(0) && !right.equals(0) && this.isValidNumber(left.add(right))
    );
  }
  visitSub(sub: BinaryExpression): boolean {
    // 减法两边不能为0
    const left = sub.getLeft().calculate();
    const right = sub.getRight().calculate();
    return this.checkResult(
      !(left.equals(0) || right.equals(0)) && this.isValidNumber(left.sub(right))
    );
  }
  visitMul(mul: BinaryExpression): boolean {
    // 乘法两边不能为0或1
    const left = mul.getLeft().calculate();
    const right = mul.getRight().calculate();
    return this.checkResult(
      !(left.equals(0) || right.equals(0)) &&
        !(left.equals(1) || right.equals(1)) &&
        this.isValidNumber(left.mul(right))
    );
  }
  visitDiv(div: BinaryExpression): boolean {
    // 除法两边不能为0，除数不能为1
    const left = div.getLeft().calculate();
    const right = div.getRight().calculate();
    return this.checkResult(
      !(left.equals(0) || right.equals(0)) &&
        !right.equals(1) &&
        this.isValidNumber(left.div(right))
    );
  }

  private validExponents = [-3, -2, -1, 2, 3];

  visitPow(pow: BinaryExpression): boolean {
    // 乘方的底不能为0，指数必须是在[-3,3]范围内的整数且不能为0或1
    const left = pow.getLeft().calculate();
    let right = pow.getRight().calculate();

    if (!checkExponent(right as Fraction)) {
      if (pow.getRight() instanceof BinaryExpression) {
        return this.checkResult(false);
      } else {
        // 尝试修正而不是反复生成
        do {
          right = new Integer(this.validExponents[randomInt(this.validExponents.length - 1)]);
          pow.setRight(right);
        } while (!checkExponent(right as Fraction));
      }
    }

    return this.checkResult(!left.equals(0) && this.isValidNumber(left.pow(right)));

    function checkExponent(exp: Fraction) {
      const n = exp.getNumerator();
      const d = exp.getDenominator();
      return d === 1 && n >= -3 && n <= 3 && n !== 0 && n !== 1;
    }
  }
}
