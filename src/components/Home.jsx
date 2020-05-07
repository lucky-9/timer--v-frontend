import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import { isAuthenticated } from './../services/auth';
import { API } from './../backend';
import { submitLog } from './../services/log';



class Home extends Component {
    state = {
        log:{task:'', project:'', startDate:'', endDate:'', startTime:'', endTime:''},
        errors:{}, 
        logSubmitted:false,
        userProjects:[],
        userLogs:[] ,
        logPosted:false 
    };
    async componentDidMount(){
        if(!isAuthenticated()){
            this.props.history.push('/signin')
        }

        if(isAuthenticated()){
            const result = isAuthenticated();
            const userId=result._id;
            try {
                const userApiCall = await fetch(`${API}/user/${userId}`, {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${result.token}`
                    }});
                let user = await userApiCall.json();
                console.log(user.userProjects);
                const userProjects = user.userProjects;
                const userLogs = user.userLogs;
                console.log("user logs: ", userLogs);
                this.setState({userProjects});
                this.setState({userLogs});
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    schema = {
            task:Joi.string().required().min(3).label("Task"),
            project:Joi.string().required(),
            startDate:Joi.string(),
            endDate:Joi.string(),
            startTime:Joi.string(),
            endTime:Joi.string()
    } 
    validate = () =>{
        const options = {abortEarly:false};
        const res = Joi.validate(this.state.log, this.schema, options);
        console.log(res)
        if(!res.error) return null;
        const errors = {};
        for(let item of res.error.details){
            errors[item.path[0]] = item.message
        }
        return errors;
    }

    handleProject =(e) =>{
        console.log("changed projec ");
        
        var value = this.state.userProjects.filter(function(proj) {
            return proj.title === e.target.value
          })
        console.log(value[0]._id);
        const {log} = this.state
         log["project"] = value[0]._id;
         this.setState({log});
    }
    handleSubmit=(e) =>{
        e.preventDefault();
        const errors = this.validate();
        console.log("errors in handle submit ",errors);
        this.setState({errors:errors || {}}) 
        if(errors){
            return;
        }
        console.log("log submitted");
        this.doSubmit();
    }
    handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
        let log = {...this.state.log};
        log[e.target.name] = e.target.value;
        this.setState({log});
    }

    doSubmit= () =>{
        const {log} = this.state;
        console.log("log submitted ", log); 
        console.log("final log ", log);
        this.setState({logSubmitted:true});
        submitLog({task:log.task, startDate:log.startDate, endDate: log.endDate, project:log.project, startTime:log.startTime, endTime:log.endTime})
        .then(data =>{ 
        console.log(data)
        if(data.error){
            console.log("inside data.error if block ", data.error);
            const errors = {...this.state.errors};
            errors.task = data.error;
            this.setState({errors});
        }
        else{
            console.log("inside else block ");
            let log = {task:'', project:'', startDate:'', endDate:'', startTime:'', endTime:''};
            this.setState({logPosted:true})
            this.setState({log}); 
            this.setState({logSubmitted:false})
        }});
    }
    render() {
        const {log, errors} = this.state; 
        return ( 
        <>
       <form onSubmit={this.handleSubmit} className="container">
        <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="task">Task Name</label>
            <input onChange={this.handleChange} value={log.task} name="task" type="text" className="form-control" id="task" placeholder="Enter any Task" required>
            </input>
            {errors.task &&<p className="text-danger">{errors.task}</p>}
            </div>
            <div class="form-group col-md-6">
            <label htmlFor="inputState">Project Name</label>
            <select onChange={this.handleProject} name="project" id="inputState" className="form-control" required>
                <option selected>Project Name....</option>
                {this.state.userProjects.map((project) =>{
                return <option key={project._id}>{project.title}</option>
                })}
            </select>
            {errors.project &&<p className="text-danger">{errors.project}</p>}
            </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="startDate">Start Date</label>
                <input value={log.startDate} onChange={this.handleChange} name="startDate" type="date" className="form-control" id="startDate" placeholder="Start Date" required>
                </input>
                {errors.startDate &&<p className="text-danger">{errors.startDate}</p>}
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="endDate">End Date</label>
                <input value={log.endDate} onChange={this.handleChange} name="endDate" type="date" className="form-control" id="endDate" placeholder="End Date" required>
                </input>
                {errors.endDate &&<p className="text-danger">{errors.endDate}</p>}
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="startTime">Start Time</label>
                <input value={log.startTime} onChange={this.handleChange} name="startTime" type="time" className="form-control" id="startTime" placeholder="Start Time" required>
                </input>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="endTime">End Time</label>
                <input value={log.endTime} onChange={this.handleChange} name="endTime" type="time" className="form-control" id="endTime" placeholder="End Time" required>
                </input>
                </div>
            </div>
            <button type="submit" className="btn btn-dark">{this.state.logSubmitted ? 'ADDING...' : 'ADD'}</button>
            {this.state.logPosted && <p className="text-success">Log Posted Succesfully!</p>}
            </form>
       
        </> );
    }
}
 
export default Home;