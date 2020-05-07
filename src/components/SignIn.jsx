import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Link } from 'react-router-dom';
import {signin, authenticate} from '../services/auth';

class SignIn extends Component {
    state = { 
        account:{email:'', password:''},
        errors:{},
        signingIn:false 
     }


    schema = {
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
        console.log("blog submitted");
        this.doSubmit();
    }
    handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
        let account = {...this.state.account};
        account[e.target.name] = e.target.value;
        this.setState({account});
    }

    doSubmit= () =>{
        const {account} = this.state;
        signin({email:account.email, password: account.password})
        .then(data =>{ 
        console.log(data)
        if(data.error){
            console.log("inside data.error if block ", data.error);
            const errors = {...this.state.errors};
            errors.email = data.error;
            this.setState({errors});
        }
        else{
            console.log("inside else block ");
            authenticate(data, ()=>
            {
            console.log("Inside authenticate block ");
            this.props.history.push('/');
            })
        }});
    }
   
    render() { 
        const {account, errors} = this.state;
        return ( 
        <div className="container my-5">
            <h1 className="form-headings">Sign In</h1>
            <form onSubmit={this.handleSubmit}>
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
                <button className="btn btn-dark m-2" type="submit">{this.state.signingIn?'SIGNING IN...':'SIGN IN'}</button>
                <Link to="/signup">Don't have an account? signup</Link>
            </form>
        </div> );
    }
}
 
export default SignIn;