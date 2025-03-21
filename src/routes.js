import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonInfo from './pages/PokemonInfo'
import Header from './components/Header'
import Team from './pages/Team'

function RoutesApp(){
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='pokemon/:name' element={ <PokemonInfo/> }/>
        <Route path='/team' element={ <Team/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp