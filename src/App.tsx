import React, { useState, useCallback } from "react";

import { StrategyFactory, PaperGenerator, Level } from "./generator";

const generator = new PaperGenerator();
const strategy = new StrategyFactory();
strategy.setDifficulty(Level.Medium);
generator.setStrategy(strategy);

const App: React.FC = () => {
  const [level, setLevel] = useState(Level.Low);
  const [count, setCount] = useState(20);
  const [paper, setPaper] = useState(generator.generatePaper(count));

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value, typeof event.target.value);
      setLevel(event.target.value as Level);
    },
    [setLevel]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCount = parseInt(event.target.value) || 1;
      setCount(newCount < 1 ? 1 : newCount > 100 ? 100 : newCount);
    },
    [setCount]
  );

  const handleClick = useCallback(() => {
    strategy.setDifficulty(level);
    setPaper(generator.generatePaper(count));
  }, [setPaper, level, count]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <select value={level} onChange={handleSelectChange}>
          <option value={Level.Low}>Low</option>
          <option value={Level.Medium}>Medium</option>
          <option value={Level.High}>High</option>
        </select>
        <input type="number" value={count} min={1} max={100} onChange={handleInputChange} />
        <button onClick={handleClick}>Generate</button>
      </div>
      <hr></hr>
      <table style={{ margin: "0 auto" }}>
        <tbody>
          <tr>
            <td>
              <div>
                <ol>
                  {paper.printLines().map((line, i) => {
                    return <li key={i}>{line}</li>;
                  })}
                </ol>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
