/**
 * 难度策略
 *
 * 单例模式
 * 策略工厂模式
 */

import { Level, Operator } from "./const";
import { RationalNumber } from "./interface";
import { Integer } from "./number";
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

/** 简单难度 */
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

/** 难度策略工厂 */
export class StrategyFactory implements DifficultyStrategy {
  private strategyByLevel = {
    [EasyStrategy.getInstance().getDifficulty()]: EasyStrategy.getInstance()
  };
  private current!: DifficultyStrategy;

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