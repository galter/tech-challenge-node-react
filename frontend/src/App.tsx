import { AsteroidsProvider } from './contexts/AsteroidsContext'

import Main from './components/Main'

function App() {
  return (
    <AsteroidsProvider>
      <Main />
    </AsteroidsProvider>
  )
}
export default App
