/**
 * 难度策略
 *
 * 单例模式
 * 策略工厂模式
 */

import { Level, Operator } from "./const";
import { RationalNumber } from "./interface";
import { Integer, Fraction } from "./number";
import { BinaryExpression } from "./expression";
import { ExpressionFactory } from "./expression-factory";
import { randomInt } from "./utils";

/** 难度策略接口 */
export interface DifficultyStrategy {
  /** 获取难度 */
  getDifficulty(): Level;
  /** 随机生成有理数 */
  randomNumber(): RationalNumber;
  /** 随机生成二元表达式 */
  randomExpression(): BinaryExpression;
  /** 随机生成运算符个数 */
  randomOperatorCount(): number;
}

/**
 * 低级难度：百以内加减法，带负数，最多2个运算符
 */
export class EasyStrategy implements DifficultyStrategy {
  /** 单例模式 */
  private static instance: EasyStrategy;
  static getInstance(): EasyStrategy {
    if (!this.instance) this.instance = new EasyStrategy();
    return this.instance;
  }

  private operators = [Operator.Addition, Operator.Subtraction];

  getDifficulty(): Level {
    return Level.Low;
  }
  randomNumber(): RationalNumber {
    return new Integer(randomInt(-99, 99));
  }
  randomExpression(): BinaryExpression {
    return ExpressionFactory.getInstance().randomExpression(this.operators);
  }
  randomOperatorCount(): number {
    return randomInt(1, 2);
  }
}

/**
 * 中等难度：百以内加减乘除，带负数，最多4个运算符，结果可有分数
 */
export class MediumStrategy implements DifficultyStrategy {
  /** 单例模式 */
  private static instance: MediumStrategy;
  static getInstance(): MediumStrategy {
    if (!this.instance) this.instance = new MediumStrategy();
    return this.instance;
  }

  private operators = [
    Operator.Addition,
    Operator.Subtraction,
    Operator.Multiplication,
    Operator.Division
  ];

  getDifficulty(): Level {
    return Level.Medium;
  }
  randomNumber(): RationalNumber {
    return new Integer(randomInt(-99, 99));
  }
  randomExpression(): BinaryExpression {
    return ExpressionFactory.getInstance().randomExpression(this.operators);
  }
  randomOperatorCount(): number {
    return randomInt(2, 4);
  }
}

/**
 * 高级难度：百以内加减乘除和乘方（4 ^ 2 = 16），带负数，带分数，简单乘方（-3~3），最多6个运算符，结果可有分数
 */
export class HardStrategy implements DifficultyStrategy {
  /** 单例模式 */
  private static instance: HardStrategy;
  static getInstance(): HardStrategy {
    if (!this.instance) this.instance = new HardStrategy();
    return this.instance;
  }

  private operators = [
    Operator.Addition,
    Operator.Subtraction,
    Operator.Multiplication,
    Operator.Division,
    Operator.Power
  ];

  getDifficulty(): Level {
    return Level.High;
  }
  randomNumber(): RationalNumber {
    return randomInt(0, 1)
      ? new Integer(randomInt(-99, 99))
      : new Fraction(randomInt(-99, 99), randomInt(2, 99));
  }
  randomExpression(): BinaryExpression {
    return ExpressionFactory.getInstance().randomExpression(this.operators);
  }
  randomOperatorCount(): number {
    return randomInt(3, 6);
  }
}

/**
 * 难度策略工厂
 *
 * 策略工厂模式
 * 工厂模式与策略模式的结合，实现不同策略间的快速切换
 * 关键在于它同样实现了策略接口中的各种方法
 */
export class StrategyFactory implements DifficultyStrategy {
  private strategyByLevel = {
    [Level.Low]: EasyStrategy.getInstance(),
    [Level.Medium]: MediumStrategy.getInstance(),
    [Level.High]: HardStrategy.getInstance()
  };
  private current!: DifficultyStrategy;

  /** 设置难度，从而在不同难度策略间快速切换 */
  setDifficulty(level: Level) {
    this.current = this.strategyByLevel[level];
  }

  getDifficulty(): Level {
    return this.current.getDifficulty();
  }
  randomNumber(): RationalNumber {
    return this.current.randomNumber();
  }
  randomExpression(): BinaryExpression {
    return this.current.randomExpression();
  }
  randomOperatorCount(): number {
    return this.current.randomOperatorCount();
  }
}
