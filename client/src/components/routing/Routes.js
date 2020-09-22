import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../profile-forms/EditProfile';
import CreateProfile from '../profile-forms/CreateProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NoFound from '../layout/NoFound';
// auth
import Register from '../auth/Register';
import Login from '../auth/Login';
import PrivateRoute from '../routing/PrivateRoute';


const Routes = () => {
    return (
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/profiles' component={Profiles}/>
          <Route exact path='/posts' component={Posts}/>
          <Route exact path='/posts/:id' component={Post}/>
          <Route exact path='/profile/:id' component={Profile}/>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
          <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
          <PrivateRoute exact path='/add-experience' component={AddExperience}/>
          <PrivateRoute exact path='/add-education' component={AddEducation}/>
          <Route  component={NoFound}/>
        </Switch>
      </section>
    )
}

export default Routes
