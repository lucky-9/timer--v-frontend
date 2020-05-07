import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
// import BlogList from './components/BlogList';
// import BlogDescription from './components/BlogDescription';
// import BlogForm from './components/BlogForm';
import './App.css';
import { isAuthenticated } from './services/auth';
import NavBar from './components/NavBar';
import ProjectForm from './components/ProjectForm';
import LogList from './components/LogList';


class App extends Component {
  state = { user:'' }
  componentDidMount(){
      if(isAuthenticated()){
        const {user, _id} = isAuthenticated();
        console.log("user id ",_id);
        const username = user.username
        this.setState({user:username})
        console.log(username);
      }
  }

  render() { 
    return (  <>
    <NavBar userName = {this.state.user}/>
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/project" component={ProjectForm}/>
        <Route path="/logs" component={LogList}/>
        <Route path='/' component={Home}/>
        {/* <Route path="/create/blog" component={BlogForm}/>
        <Route path="/blog/description/:blogId" component={BlogDescription}/>
         */}
      </Switch>
      </> );
  }
}
 
export default App;