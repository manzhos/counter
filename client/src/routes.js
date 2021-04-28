import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Counter} from './pages/Counter'

export const useRoutes = isAuthenticated => {
  return (
    <Switch>
      <Route path="/counter" exact>
        <Counter />
      </Route>

      <Redirect to="/counter" />
    </Switch>
  )
}
