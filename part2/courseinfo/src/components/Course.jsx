const Header = ({name}) =>
      <h2>{name}</h2>;

const Content = ({parts}) => {
  return (
  <>
    {parts.map((part) => <Part key={part.id} part={part} />)}
  </>
  );
};

const Part = ({part}) =>
      <p>{part.name} {part.exercises}</p>;

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => part.exercises + sum, 0);
  return (
    <>
      Total of {total}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
