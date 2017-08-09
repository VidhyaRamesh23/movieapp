import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Redirect} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery';
import Viewmovies from './Viewmovies';
import Favourites from './Favourites';
import Search from './Search';
import Route from '../routesconfig/routes.js';

injectTapEventPlugin();
var list =" ";
var obj1=" ";
export default class  Dashboard  extends React.Component{
    
constructor(props) {
       super(props);
       this.state = {open: false ,drawer:false,SearchEnable:false,AddFav:false,DisplayFav:false,movielist:'',logoutstatus:false};
}

// togge for drawer
handleToggle(){
      
            this.setState({drawer: !this.state.drawer});
} 

// search in drawer
handleSearch(){
       
        this.setState({drawer:false});
        this.setState({SearchEnable:true});
        this.setState({AddFav: false});  
}

// Add new plalist
handleAddlist(){
            this.setState({drawer:false});
            this.setState({DisplayFav:true}); 
}

/*searched movie name has come from the search component and the details about that movie is to be retreived from the api */
displaymovie(moviename){
                    this.setState({SearchEnable:false});
                    var movieobj=this;
                    var that=this;
             
                   $.ajax({
                                   
                               url:'https://api.themoviedb.org/3/search/movie?api_key=7aebafe32b82c7ee36fd33d30d8491a1&language=en-US&query=' + moviename + '&page=1&include_adult=false',
                               type:'get',
                               data : { username: localStorage.getItem("username")},
                               
                               /*data will come from the api then data will be iterated and return to the viewmovies component */
                               
                               success:function(data)
                               {
                                   
                                    list=data.results.map(movie=>{ 
                                    return(
                                          <Viewmovies movies={movie} handlefav={that.handlefav.bind(that)} />
                                          );
                                 });
                                   movieobj.setState({movielist:list});
                               
                               }
                          });
}

/*adding favourite movies in database*/
handlefav(movies){
          
        $.ajax({
       
                   url : Route.movieadd,
                   type : 'POST',
                   data : {
                   movie:movies.movie,
                   movieposter:movies.movieposter,
                   release_date:movies.release_date,
                   username: localStorage.getItem("username")
                   },
               
                    success : function(response){
                        
                          if (response=="already added") {
                                alert("Movie already added");
                           } 
                          else { 
                                alert("Added to favourite list");
                          }
                    },
                    error : function(err){
                                alert("Cannot add in a list"); 
                          }
                });
    
  }
  
  /*displaying favourite movies*/
handleDisplay(){
    
        var that=this;
        var displayobj=this;
        this.setState({drawer:false});
        this.setState({AddFav: true});
        this.setState({SearchEnable:false});
 
          $.ajax({   
       
               url : Route.moviedisplay,
               type : 'GET',
               data:{
                    username: localStorage.getItem("username")
               },
                    success:function(data) 
                    {   
                        obj1=data.map(item=>{    
                         
                        return(
                        <Favourites movies={item} handledelfav={that.handledelfav.bind(that)} />);
                   
                                            });
                                displayobj.setState({movielist:obj1});
       
                    },
          
                     error : function(err){
                             alert("error");
                       }
      
                 });
            }
            /*deleting movie details has come from the deletefav in favourites component*/
handledelfav(movies1){
    
    var self=this;
   
    $.ajax({
       
           url : Route.moviedelete,
           type : 'GET',
           data : {
           movie:movies1.movie,
           movieposter:movies1.movieposter,
           release_date:movies1.release_date,
            username: localStorage.getItem("username")
           },
           
           success : function(response){
               alert("successfully deleted");
                self.handleDisplay();
           },
           error : function(err){
               alert("error");
           }
       });
      
}

/*logout  with respect to username*/

handlelogout(){
        var that=this;
   
        $.ajax({
                   url : Route.logout,
                   type : 'GET',
                   data : {
                        username: localStorage.getItem("username")
                   },
                   
                    success : function(response){
                       alert("successfuly logged out");
                       that.setState({logoutstatus:true});
                       
             
                    },
                    error : function(err){
                       alert("error");
                    }
         
                });
}



    render(){
           if(this.state.logoutstatus) {
              return (
                <Redirect to='/' />
              );
         }
       const styleapp={
            col:{
                 backgroundColor:'#91a82d'
                
            },
            title:{
                color:'white',
                fontSize:'25px',
                fontFamily: 'Josefin Slab'
            },
            logoutbutton:{
                float:'right',
               
            }
        };
           
        return(
 
        <div>
                <h1 style={styleapp.title}><center>10 Movies to Watch before you die</center></h1>
                <RaisedButton style={styleapp.logoutbutton} label="Logout" primary={true} onClick={this.handlelogout.bind(this)} />
                <AppBar
                  onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
                <Drawer
                      docked={true}
                      width={200}
                      open={this.state.drawer}
                      onRequestChange={(open) => this.setState({open})}
                    >
                     <MenuItem onClick={this.handleSearch.bind(this)}>Search</MenuItem>
                      <MenuItem onClick={this.handleDisplay.bind(this)}>Display Favourites</MenuItem>
                      <MenuItem onClick={this.handleAddlist.bind(this)}>Add new Playlist</MenuItem>
                </Drawer>
                  {(this.state.SearchEnable) ? <Search  displaymovie={this.displaymovie.bind(this)}/> :''}
                  {this.state.movielist}
        </div>
    );
  }
}
           