import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Home } from './home';
import { Profile } from './profile';
import { Search } from './search';

interface IProps {}

export const Router: React.FC<IProps> = () => {
  return (
    <Switch>
      <Route path="/search" component={Search}/>
      <Route path="/profile/:login" component={Profile}/>
      <Route path="/" exact><Home/></Route>
      <Route>
        <Redirect to={{
          pathname: '/'
        }} />
      </Route>
    </Switch>
  )
}
