import { Provider } from 'react-redux'
import './App.css'
import { MainView } from './components/MainView/MainView'
import { store } from './services/store'

function App() {

  return (
    <>
      <div>
        <Provider store={store}>
          <MainView />
        </Provider>
      </div>
    </>
  )
}

export default App
