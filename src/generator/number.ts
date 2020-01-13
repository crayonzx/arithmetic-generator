/**
 * 有理数：整数和分数
 *
 * （对象）适配器模式
 */

import { default as JSFraction } from "fraction.js";

import { Priority } from "./const";
import { RationalNumber, Expression, Visitor } from "./interface";

/**
 * 分数
 *
 * 对象适配器模式（区别于类模式，使用聚合而不是继承）
 */
export class Fraction implements RationalNumber {
  private value: JSFraction;

  constructor(numerator: number, denominator: number) {
    this.value = new JSFraction(numerator, denominator);
  }

  /** 获取分子 */
  getNumerator(): number {
    return this.value.n;
  }

  /** 获取分母 */
  getDenominator(): number {
    return this.value.d;
  }

  /** 由JSFraction创建分数 */
  private static newFraction(frac: JSFraction): Fraction {
    const f = new Fraction(0, 1);
    f.value = frac;
    return f;
  }

  /** 遵循里氏替换原则，返回值的类型更加严格 */
  add(rhs: RationalNumber): Fraction {
    if (rhs instanceof Fraction) {
      return Fraction.newFraction(this.value.add(rhs.value));
    } else {
      throw Error(`rhs is not a fraction, but is ${typeof rhs}`);
    }
  }
  /** 遵循里氏替换原则，返回值的类型更加严格 */
  sub(rhs: RationalNumber): Fraction {
    if (rhs instanceof Fraction) {
      return Fraction.newFraction(this.value.sub(rhs.value));
    } else {
      throw Error(`rhs is not a fraction, but is ${typeof rhs}`);
    }
  }
  /** 遵循里氏替换原则，返回值的类型更加严格 */
  mul(rhs: RationalNumber): Fraction {
    if (rhs instanceof Fraction) {
      return Fraction.newFraction(this.value.mul(rhs.value));
    } else {
      throw Error(`rhs is not a fraction, but is ${typeof rhs}`);
    }
  }
  /** 遵循里氏替换原则，返回值的类型更加严格 */
  div(rhs: RationalNumber): Fraction {
    if (rhs instanceof Fraction) {
      // 0不能为除数
      if (rhs.value.equals(0)) {
        return new Fraction(NaN, 1);
      }
      return Fraction.newFraction(this.value.div(rhs.value));
    } else {
      throw Error(`rhs is not a fraction, but is ${typeof rhs}`);
    }
  }
  /** 遵循里氏替换原则，返回值的类型更加严格 */
  pow(rhs: RationalNumber): Fraction {
    if (rhs instanceof Fraction) {
      // 0的非正指数幂没有意义
      if (this.value.equals(0) && rhs.value.compare(0) <= 0) {
        return new Fraction(NaN, 1);
      }
      return Fraction.newFraction(this.value.pow(rhs.value));
    } else {
      throw Error(`rhs is not a fraction, but is ${typeof rhs}`);
    }
  }

  getPriority(): Priority {
    return Priority.Number;
  }

  calculate() {
    return this;
  }

  print() {
    // 小于0时需要加括号
    if (this.value.compare(0) < 0) {
      return `(${this.value.toFraction(false)})`;
    }
    return `${this.value.toFraction(false)}`;
  }

  toString() {
    return `${this.value.toFraction(false)}`;
  }

  equals(rhs: Expression | number) {
    if (rhs instanceof Fraction) {
      return this.value.equals(rhs.value);
    }
    if (typeof rhs === "number") {
      return this.value.equals(rhs);
    }
    return false;
  }

  accept(visitor: Visitor) {
    return visitor.visitFraction(this);
  }
}

/** 整数，它可以认为是分母为 1 的一种特殊分数 */
export class Integer extends Fraction {
  constructor(value = 0) {
    super(Math.floor(value), 1);
  }

  accept(visitor: Visitor) {
    return visitor.visitInteger(this);
  }
}
