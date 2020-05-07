import React, { Component } from 'react';
import Joi from 'joi-browser';
import{ submitProject}from '../services/project';
import { isAuthenticated } from './../services/auth';

class ProjectForm extends Component {
    state = { 
        project:{title:''},
        errors:{},
        submitted:false 
     }

     componentDidMount(){
        if(!isAuthenticated()){
            this.props.history.push('/signin')
        }
     }
    schema = {
        title:Joi.string().required().min(3).label("Title"),
    } 
    validate = () =>{
        const options = {abortEarly:false};
        const res = Joi.validate(this.state.project, this.schema, options);
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
        let project = {...this.state.project};
        project[e.target.name] = e.target.value;
        this.setState({project});
    }

    doSubmit= () =>{
        const {project} = this.state;
        submitProject({title:project.title})
        .then(data =>{ 
        console.log(data)
        if(data.error){
            console.log("inside data.error if block ", data.error);
            const errors = {...this.state.errors};
            errors.title = data.error;
            this.setState({errors});
        }
        else{
            console.log("inside else block ");
            this.props.history.push('/');
        }});
    }
   
    render() { 
        const {project, errors} = this.state;
        return ( 
        <div className="container my-5">
            <h1 className="form-headings">Project</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter Project Name</label>
                    <input value={project.title} onChange={this.handleChange} className="form-control input-field" id="title" name="title" type="text"/>
                    {errors.title &&<p className="text-danger">{errors.title}</p>}
                </div>
                <button className="btn btn-dark m-2" type="submit">{this.state.submitted?'SUBMITTING...':'SUBMIT'}</button>
            </form>
        </div> );
    }
}
 
export default ProjectForm;