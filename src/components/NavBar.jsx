import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { singout, isAuthenticated } from './../services/auth';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state =  {
        project:{title:''},
        errors:{},
        submitted:false,
        }
    }
    handleSignOut = () =>{
        singout();
        this.props.history.push('/signin');
    }

    render() { 
        return ( 
            <>
        <nav className="navbar mb-5 navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/logs">Timer</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/logs">Logs</Link>
            <Link className="nav-item nav-link active" to="/">Create Log <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link active" to="/project">Create Project</Link>
            {isAuthenticated() && <button className="btn btn-dark" onClick={this.handleSignOut}>SignOut</button>}
            </div>
        </div>
        </nav>
            </>
         );
    }
}
 
export default withRouter(NavBar);