import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
        <Switch>
          <Route path={['/tv', '/tv/:tvId']}>
            <Tv />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path={['/', '/movie/:movieId']}>
            <Home />
          </Route>
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

export default RouteComponent
