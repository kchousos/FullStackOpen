import { createElement, useState } from 'react';

const Display = props => <div>{props.value}</div>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = 100 * good / all;

  if (all !== 0) 
    return (
      <>
        <h1>Statistics</h1>
        <p>
          Good: {good}
          <br/>
          Neutral: {neutral}
          <br/>
          Bad: {bad}
          <br/>
          All: {all}
          <br/>
          Average: {average}
          <br/>
          Positive percentage: {positive}%
        </p>
      </>
    );
  else
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </>);
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}/>
    </>
  );
};

export default App;
