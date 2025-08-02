const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name} you're {props.age} years old from {props.ville} in{' '}
        {props.pays}
      </p>
    </div>
  )
}

export default Hello
