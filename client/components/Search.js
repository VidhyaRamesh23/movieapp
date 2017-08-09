import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

import $ from 'jquery';
const styles = {
  paper: {
    width: '70%',
    height: '200px',
    margin:'auto',
    textAlign: 'center',
    paddingTop: '10px',
    backgroundColor:'#512DA8',   
  },
 
};

export default class Search extends React.Component {
    
    constructor(){
       super()
       this.state={
            moviename:'' ,
            dataSource:[]
       }
}
  changeName(event) {
      this.setState ({
          moviename: event.target.value
          });
  }
  onUpdateInput(moviename) {
      
    let searchResults = [];
    const self = this;
    this.setState({
      moviename:moviename
    });
  /*searching film from the tmdb api*/
    $.ajax({
        
        url:'https://api.themoviedb.org/3/search/movie?api_key=731d96383cdf751b7cfafe0303f82ea3&language=en-US&query='+moviename,
        type:'GET',
        data:{
                username: localStorage.getItem("username")
           },
        success:function(data){
           data.results.map(data=> {
               return(searchResults.push(data.title))

        });
    
        self.setState({dataSource: searchResults });
      
    
        },
        error: function (data) {
                   console.log("error");
        }
      
       });
    
  }
  /*searched movie name is sent to displaymovie function in dashboard page where the searchenable is true*/
  searchmovie(){
      this.props.displaymovie(this.state.moviename);
  }
  render() {
      const styles1 = {
       head:{
      color:'green'
      
  }
  };
      return (
      <Paper style={styles.paper}>
      
        <h4 style={styles1.head}>Enter the film name to be searched</h4>
             <div> 
             
                     <AutoComplete hintText="Enter the MovieName"
                      dataSource={this.state.dataSource}
                      onChangeName={this.changeName.bind(this)}
                      onUpdateInput={this.onUpdateInput.bind(this)}
                      />
                
                    <RaisedButton label="Search" primary={true} onClick={this.searchmovie.bind(this)}/>
               
                </div>
      </Paper>
    );
  }

  
}
