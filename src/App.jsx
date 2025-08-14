import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import personService from './services/persons'
import MessageNotification from './components/MessageNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [message, setMessage] = useState(null)
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
            setMessage({
              text: `Mise à jour du numéro ${returnedPerson.name}`,
              type: 'success',
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage({ text: 'Erreur lors de la mise à jour', type: 'error' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })

        return
      }
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .createPerson(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `${returnedPerson.name} est  ajouté`,
          type: 'success',
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
            setMessage({
              text: `${existingPerson.name} est Supprimé`,
              type: 'success',
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error',
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
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
      <MessageNotification message={message} />
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
