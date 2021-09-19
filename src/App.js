import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search">
            <Header />
            <Search />
          </Route>
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites">
            <Header />
            <Favorites />
          </Route>
          <Route path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/page-not-found" component={ NotFound } />
          <Route exact path="/">
            <Login />
          </Route>
          <Redirect to="/page-not-found" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
