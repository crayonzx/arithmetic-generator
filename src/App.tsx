import React from "react";

import { StrategyFactory, PaperGenerator, Level } from "./generator";

const generator = new PaperGenerator();
const strategy = new StrategyFactory();
strategy.setDifficulty(Level.Medium);
generator.setStrategy(strategy);

const paper = generator.generatePaper(30);

const App: React.FC = () => {
  return (
    <div>
      {paper.printLines().map((line, i) => {
        return (
          <span key={i}>
            {line}
            <br />
          </span>
        );
      })}
    </div>
  );
};

export default App;
