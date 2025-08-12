import axios from 'axios'

const baseUrl = 'http://localhost:3000/persons'

const getAllPersons = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

const createPerson = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

const updatePerson = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data)
    .catch((error) => console.error(error))
}
const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }
