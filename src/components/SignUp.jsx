import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import {signup} from '../services/auth'

class SignUp extends Component {
    state = { 
        account:{username:'',email:'', password:''},
        errors:{},
        signingUp:false,
        accountCreated:false 
     }

    schema = {
        username:Joi.string().required().min(5),
        email:Joi.string().required().email().label("Email"),
        password:Joi.string().required().min(5).label("Password")
    } 
    validate = () =>{
        const options = {abortEarly:false};
        const res = Joi.validate(this.state.account, this.schema, options);
        console.log(res)
        if(!res.error) return null;
        const errors = {};
        for(let item of res.error.details){
            errors[item.path[0]] = item.message
        }
        return errors;
    }

    handleSubmit=(e) =>{
        e.preventDefault();
        const errors = this.validate();
        console.log(errors);
        this.setState({errors:errors || {}}) 
        if(errors){
            return;
        }
        console.log("User account created");
        this.doSubmit();
    }
    handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
        let account = {...this.state.account};
        account[e.target.name] = e.target.value;
        this.setState({account});
    }

    doSubmit=() =>{
        const {account} = this.state;
        this.setState({signingUp:true});
        signup({username:account.username, email:account.email, password: account.password})
        .then(data =>{ 
        console.log(data)
        if(data.error){
            console.log("inside data.error if block ", data.error);
            const errors = {...this.state.err};
            errors.username = data.error;
            this.setState({errors});
        }
        else{
            let account = {username:'',email:'', password:''};
            console.log("inside else block ");
            this.setState({accountCreated:true});
            this.setState({account});
            this.setState({signingUp:false});
        }});
    }
   
    render() { 
        const {account, errors} = this.state;
        return ( 
        <div className="container my-5">
            <h1 className="form-headings">Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input value={account.username} onChange={this.handleChange} className="form-control input-field" id="username" name="username" type="text"/>
                    {errors.username &&<p className="text-danger">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={account.email} onChange={this.handleChange} className="form-control input-field" id="email" name="email" type="text"/>
                    {errors.email &&<p className="text-danger">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={account.password} className="form-control input-field" onChange={this.handleChange}  id="password" name="password" type="password"/>
                    {errors.password &&<p className="text-danger">{errors.password}</p>}
                </div>
                <button className="btn btn-dark mr-2" type="submit">{this.state.signingUp ? 'SIGNING UP...' : 'SIGN UP'}</button>
                <Link to="/signin">Already have an account? signin</Link>
                {this.state.accountCreated && <p className="text-success">Account Created Succesfully! please signin</p>}
            </form>
        </div> );
    }
}
 
export default SignUp;