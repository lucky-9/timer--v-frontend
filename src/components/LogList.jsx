import React, { Component } from 'react';
import { isAuthenticated } from './../services/auth';
import Logs from './Logs';
import { API } from './../backend';

class LogList extends Component {
    constructor(props) {
        super(props);
        this.state = { userLogs:[] }
    }
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
                const userLogs = user.userLogs;
                console.log("user logs: ", userLogs);
                this.setState({userLogs});
            } catch (error) {
                console.log(error);
            }
        }
    }
    render() { 
        return (<div className="container">
        <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Task Name</th>
          <th scope="col">Project</th>
          <th scope="col">start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Duration</th>
        </tr>
      </thead>
       <tbody>
           
              {this.state.userLogs.map((log) =>
              <tr  key={log._id}>
                  <Logs task={log.task} startTime={log.startTime} endTime={log.endTime} projectName={log.project.title} startDate={log.startDate} endDate={log.endDate} duration={log.duration}/>
                </tr>
              )}
           
       </tbody>
       </table>
        </div> );
    }
}
 
export default LogList;