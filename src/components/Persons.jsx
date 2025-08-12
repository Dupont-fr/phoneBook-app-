const Persons = ({ persons, onPersonDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => onPersonDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
