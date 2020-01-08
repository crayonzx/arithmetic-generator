import { default as JSFraction } from "fraction.js";

import { Priority } from "./const";
import { RationalNumber, Expression } from "./interface";

/** 分数 */
export class Fraction implements RationalNumber, Expression {
  private value: JSFraction;

  constructor(numerator: number, denominator: number) {
    this.value = new JSFraction(numerator, denominator);
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
    return Fraction.newFraction(this.value.div(rhs.value));
  }
  pow(rhs: Fraction): Fraction {
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
}

/** 整数（可以认为是分母为1的特殊分数） */
export class Integer extends Fraction {
  constructor(value = 0) {
    super(Math.floor(value), 1);
  }
}
