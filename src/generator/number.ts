/**
 * 有理数：整数和分数
 *
 * 适配器模式
 */

import { default as JSFraction } from "fraction.js";

import { Priority } from "./const";
import { RationalNumber, Expression, Visitor } from "./interface";

/**
 * 分数
 *
 * 对象适配器模式（区别于类模式）
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

  add(rhs: Fraction): Fraction {
    return Fraction.newFraction(this.value.add(rhs.value));
  }
  sub(rhs: Fraction): Fraction {
    return Fraction.newFraction(this.value.sub(rhs.value));
  }
  mul(rhs: Fraction): Fraction {
    return Fraction.newFraction(this.value.mul(rhs.value));
  }
  div(rhs: Fraction): Fraction {
    // 0不能为除数
    if (rhs.value.equals(0)) {
      return new Fraction(NaN, 1);
    }
    return Fraction.newFraction(this.value.div(rhs.value));
  }
  pow(rhs: Fraction): Fraction {
    // 0的非正指数幂没有意义
    if (this.value.equals(0) && rhs.value.compare(0) <= 0) {
      return new Fraction(NaN, 1);
    }
    return Fraction.newFraction(this.value.pow(rhs.value));
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
