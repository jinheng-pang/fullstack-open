const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course
          key={course.id}
          name={course.name}
          parts={course.parts}
        ></Course>
      ))}
    </div>
  );
};

const Course = ({ name, parts }: CourseProps) => {
  const sum = parts.reduce((prev, subparts) => prev + subparts.exercises, 0);
  return (
    <div>
      <h2>{name}</h2>
      {parts.map((subpart) => (
        <p key={subpart.id}>
          {subpart.name} {subpart.name}
        </p>
      ))}
      <strong>total of {sum} exercises</strong>
    </div>
  );
};

interface CourseProps {
  name: string;
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
}

export default App;
