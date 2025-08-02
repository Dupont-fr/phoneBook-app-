import Hello from './component/hello'

const App = () => {
  const friends = [
    {
      name: 'peter',
      age: 20,
      sexe: 'Masculin',
    },
    {
      name: 'paul',
      age: 22,
      sexe: 'Masculin',
    },
  ]
  console.log('Hello from component')
  return (
    <div>
      <h1>greeting</h1>

      <Hello name='jhon' age={20} ville='Dschang' pays='Cameroun' />
      <Hello name='peter' age={23} ville='Yaounde' pays='Cameroun' />
      <Hello name='Dupont' age={20} ville='Douala' pays='Cameroun' />
      <Hello name='alesxr' age={123} ville='Bafoussam' pays='Cameroun' />

      <p>
        {friends[0].name} age: {friends[0].age} ans, sexe: {friends[0].sexe}
      </p>
      <p>
        {friends[1].name} age: {friends[1].age} ans, sexe: {friends[1].sexe}
      </p>
    </div>
  )
}

export default App
