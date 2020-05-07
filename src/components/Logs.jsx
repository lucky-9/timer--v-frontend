import React, { Component } from 'react';



class Logs extends Component {
  constructor(props){
    super(props);
    this.state={started:false, stopped:true};
  }
  handleDuration =(taskName, taskDuartion) =>{
    console.log("clicked ", taskName);
    this.setState({started:true});
    this.setState({stopped:false});
  }
  render() { 
    return (
    <>
      <td>
          {this.props.task}
        </td>
          <td>
          {this.props.projectName}
          </td>
          <td>
         {new Date(this.props.startDate).toLocaleDateString()}
        </td>
        <td>
        {new Date(this.props.endDate).toLocaleDateString()}
        </td>
        <td>
          {this.props.startTime}
        </td>
        <td>
          {this.props.endTime}
        </td>
        <td>
          {this.props.duration}
        </td>

    </> );
  }
}
 
export default Logs;