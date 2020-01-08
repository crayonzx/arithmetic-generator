/**
 * 难度策略
 *
 * 策略工厂模式
 */

import { Level } from "./const";
import { RationalNumber } from "./interface";
import { Integer } from "./number";
import { BinaryExpression, AddExpression } from "./expression";
import { randomInt } from "./utils";

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

export class DifficultyStrategy implements DifficultyStrategy {
  getDifficulty(): Level {
    return Level.Low;
  }
  randomNumber(): RationalNumber {
    return new Integer(randomInt(-99, 99));
  }
  randomExpression(): BinaryExpression {
    return new AddExpression();
  }
  randomOperatorCount(): number {
    return randomInt(1, 2);
  }
}

/** 难度策略工厂 */
export class StrategyFactory implements DifficultyStrategy {
  private difficultyStrategies: { [x in Level]: DifficultyStrategy };
  private current: DifficultyStrategy;

  constructor() {
    this.difficultyStrategies = {} as StrategyFactory["difficultyStrategies"];
    [DifficultyStrategy].forEach(difficultyClass => {
      const difficulty = new difficultyClass();
      this.difficultyStrategies[difficulty.getDifficulty()] = difficulty;
    });
    this.current = this.difficultyStrategies[Level.Low];
  }

  setDifficulty(level: Level) {
    this.current = this.difficultyStrategies[level];
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
