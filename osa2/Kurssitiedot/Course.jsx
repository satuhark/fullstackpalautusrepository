const Course = ({ course, total }) => {
    const title = course.name
    const parts = course.parts
    
  return (
    <div>
    <h1>{title}</h1>
    {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}</p>
        ))} 
        <p>Total of {total} exercises</p>
    </div>
  )
  }
  
  export default Course
