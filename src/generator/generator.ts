/**
 * 表达式生成器
 */

import { DifficultyStrategy } from "./difficulty";
import { Expression } from "./interface";
import { BinaryExpression } from "./expression";
import { randomInt } from "./utils";

/** 试卷 */
export class ExamPaper {
  expressions: BinaryExpression[];

  constructor(expressions: BinaryExpression[] = []) {
    this.expressions = expressions;
  }

  printLines() {
    return this.expressions.map(expression => {
      return `${expression.print()} = ${expression.calculate().toString()}`;
    });
  }
}

/** 表达式生成器 */
export class ExpressionGenerator {
  private strategy!: DifficultyStrategy;

  setStrategy(strategy: DifficultyStrategy) {
    this.strategy = strategy;
  }

  generate(): BinaryExpression {
    /** 剩余未生成的表达式的个数 */
    let count = this.strategy.randomOperatorCount();

    /** 生成根表达式（语法树的根） */
    const rootExpression = this.strategy.randomExpression();
    count--;

    /** 当前可设置二元表达式的所有叶子列表 */
    const leafSetters = [getLeftSetter(rootExpression), getRightSetter(rootExpression)];

    // 每次随机选择一个叶子，替换为二元表达式
    while (count > 0) {
      count--;
      const thisSetter = leafSetters.splice(randomInt(leafSetters.length - 1))[0];
      const thisBinary = this.strategy.randomExpression();
      thisSetter(thisBinary);
      leafSetters.push(getLeftSetter(thisBinary), getRightSetter(thisBinary));
    }

    // 剩余的叶子全部替换为随机数
    leafSetters.forEach(setter => {
      setter(this.strategy.randomNumber());
    });

    return rootExpression;

    function getLeftSetter(binary: BinaryExpression) {
      return (expression: Expression) => {
        binary.setLeft(expression);
      };
    }

    function getRightSetter(binary: BinaryExpression) {
      return (expression: Expression) => {
        binary.setRight(expression);
      };
    }
  }
}

/** 试卷生成器 */
export class PaperGenerator extends ExpressionGenerator {
  generatePaper(expressionCount: number): ExamPaper {
    const expressions: BinaryExpression[] = [];
    while (expressionCount > 0) {
      const newExpression = this.generate();
      if (expressions.every(exist => !exist.equals(newExpression))) {
        expressions.push(newExpression);
        expressionCount--;
      }
    }
    return new ExamPaper(expressions);
  }
}
