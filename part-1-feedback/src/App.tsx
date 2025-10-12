import { useState } from "react";

interface ButtonProps {
  body: string;
  handleClick: () => void;
}

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
  total: number;
}

interface StatisticLineProps {
  feedbackType: string;
  feedbackCount: number;
}

const Button = ({ body, handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>{body}</button>;
};

const StatisticLine = ({feedbackType, feedbackCount}: StatisticLineProps) => {
  return <div>{feedbackType} {feedbackCount}</div>
}

const Statistics = ({ good, neutral, bad, total }: StatisticsProps) => {
  if (total === 0) return <div>No feedback given</div>;

  const calcAverage = () => (good - bad) / total;
  const calcPositive = () => (good / total) * 100;
  const average = calcAverage();
  const positive = calcPositive();
  return (
    <div>
      <StatisticLine feedbackType="good" feedbackCount={good} />
      <StatisticLine feedbackType="bad" feedbackCount={bad} />
      <StatisticLine feedbackType="neutral" feedbackCount={neutral} />
      <StatisticLine feedbackType="all" feedbackCount={total} />
      <StatisticLine feedbackType="average" feedbackCount={average} />
      <StatisticLine feedbackType="positive" feedbackCount={positive} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState<number>(0);
  const [neutral, setNeutral] = useState<number>(0);
  const [bad, setBad] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleFeedback = (id: string) => {
    return () => {
      if (id === "good") {
        const updatedGood = good + 1;
        setGood(updatedGood);
      } else if (id === "neutral") {
        const updatedNeutral = neutral + 1;
        setNeutral(updatedNeutral);
      } else {
        const updatedBad = bad + 1;
        setBad(updatedBad);
      }

      setTotal(total + 1);
    };
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button body="good" handleClick={handleFeedback("good")} />
      <Button body="neutral" handleClick={handleFeedback("neutral")} />
      <Button body="bad" handleClick={handleFeedback("bad")} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
