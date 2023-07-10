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

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
  <>
    <h1>WebDev Curriculum</h1>
    {courses.map((course) => <Course key={course.id} course={course} />)}
  </>
  );
};

export default App;
