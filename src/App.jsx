import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} est déjà dans le répertoire. Voulez-vous remplacer l'ancien numéro ?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => console.error(error))

        return // On arrête ici pour éviter l'ajout
      }
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .createPerson(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => console.error(error))
  }

  const deletePerson = (id) => {
    const existingPerson = persons.find((person) => person.id === id)

    if (existingPerson) {
      if (window.confirm(`Delete ${existingPerson.name}?`)) {
        personService
          .deletePerson(id)
          .then((returnedPerson) => {
            setPersons(persons.filter((person) => person.id !== id))
          })
          .catch((error) => console.error(error))
      }
    }
  }

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onPersonDelete={deletePerson} />
    </div>
  )
}

export default App
