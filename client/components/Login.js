import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link,Redirect} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

/*style for paper*/

const styles = {
  paper: {
    width: '70%',
    height: '350px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor:'#78a82d',
    margin:'150px 240px 10px 200px'   
  },
 
};

export default class Login extends React.Component {
     constructor(){
         super()
                this.state={
                username:'',
                password:'',
                loginstatus:false
               }
                   }
 Changeusername(event) {
   
          this.setState ({
          username: event.target.value
          
      });
  }
 Changepassword(event) {
        
         this.setState ({
           password: event.target.value
        
      });
  }
  /*when we click login button handle login will be called*/
  handlelogin(event){
                 event.preventDefault();
                 localStorage.setItem("username", "");
                 localStorage.setItem("username",this.state.username) ;
              var self=this;
              $.ajax({
                        url:'http://http://eclipseche2.niit-mts.com:36860//login',
                        type:'post',
                        datatype: 'JSON',
                        data:{
                                 'username':this.state.username,
                                 'password':this.state.password
                               },
                               success:function(res){
                                    self.setState({loginstatus:true});
                               },
                               error:function(err){
                                  alert("Invalid username or password");
                                 console.log(err);
                               }
                      });
      
  }
  render() {
      const styles1 = {
      head:{
      color:'white',
     
  }
  };

     if(this.state.loginstatus) {
              return (
                <Redirect to='/dashboard' push />
              )
         }
  
      return (
            <Paper style={styles.paper}>
            
                    <h1 style={styles1.head}>Welcome to  Movie App</h1>
                   
                   <TextField value={this.state.username} 
                     hintText="Enter Your Username" 
                     onChange={this.Changeusername.bind(this)}
                     floatingLabelText="Username"
                     
                   /><br />
                     <TextField value={this.state.password} 
                      hintText="Enter Your Password"
                      floatingLabelText="Password"
                      type="password"
                      onChange={this.Changepassword.bind(this)}
                          
                   /><br />
                 <RaisedButton label="Login" secondary={true} onClick={this.handlelogin.bind(this)} />
        
          </Paper>
    );
  }

  
}
