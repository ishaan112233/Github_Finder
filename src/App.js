import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Alert from './Components/Layout/Alert';
import NavBar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import axios from 'axios'; // For fetching 
import Search from './Components/Users/Search';

import About from './Components/Pages/About';
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // async componentDidMount(){
  //   //For Request
  //   this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   // console.log(res.data);
  //   this.setState({users: res.data, loading: false});
  // }

  searchUsers = async (text) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    // console.log(res.data);
    this.setState({users: res.data.items, loading: false});
  };

  clearUsers = () => {
    this.setState({users: [], loading:false});
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}});
    setTimeout(() => this.setState({alert: null}), 2000);
  }; 
  
  //Get Single Github User
  getUser = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    

    this.setState({user: res.data, loading: false});
    // console.log(this.state.user);
  }

  //Get User Repos
  getUserRepos = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    

    this.setState({repos: res.data, loading: false});
    // console.log(this.state.user);
  }

  render(){
    return (
      <Router>
      <div className="App">
        {/* <NavBar title='Github Finder'/> */}
        <NavBar/>
        <div className="container">
          <Alert alert={this.state.alert}/> 
          <Switch>
            <Route exact path='/user/:login' render={props => ( <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} user={this.state.user} loading={this.state.loading}/>)}/>
            <Route exact path='/about' component={About}/>
            <Route exact poth='/' render={props=> (
              <React.Fragment>
                <Search searchUser={this.searchUsers} clearUser={this.clearUsers} showUser = {this.state.users.length > 0 ? true: false} setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users}/>
              </React.Fragment>
            )}/>
            
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
  
}

export default App;
