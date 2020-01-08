import React from "react";

import { StrategyFactory, Generator, Level } from "./generator";

const generator = new Generator();
const strategy = new StrategyFactory();
strategy.setDifficulty(Level.Low);
generator.setStrategy(strategy);

const App: React.FC = () => {
  return (
    <div>
      {generator
        .generatePaper(30)
        .printLines()
        .map((line, i) => {
          console.log(line);
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
