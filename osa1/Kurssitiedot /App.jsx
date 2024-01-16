import React from 'react'

const Header = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

const Part = (props) => {
  const { part } = props
  
  return (
  <div>
    <p>{part.name} {part.exercises}</p>
  </div> 
  )
}

const Content = (props) => {
  const { parts } = props

  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  )
}

const Total = (props) => {
  const { parts } = props;
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Total exercises: {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App;

