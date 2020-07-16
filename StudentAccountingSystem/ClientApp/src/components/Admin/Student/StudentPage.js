import React, { Component } from 'react';

class StudentPage extends Component {
    state = {  }

    componentDidMount(){
        const { id } = this.props.match.params;
        console.log("StudentId: ",id);
    }

    render() { 
        return ( 
            <div>Info</div>
         );
    }
}
 
export default StudentPage;