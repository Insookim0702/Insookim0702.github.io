import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Routes/Home'
import Tv from './Routes/Tv'
import Search from './Routes/Search'
import { Fragment } from 'react'
import Header from './components/Header'
function RouteComponent () {
  return (
    <BrowserRouter>
      <Header />
      <Fragment>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/tv' element={<Tv />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default RouteComponent
