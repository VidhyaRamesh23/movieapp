import React from 'react'; 
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card'; 
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*displaying favourite movies in card*/
/*'movies' is the iterated values from the handledisplay function in dashboard'*/
export default class Favourites extends React.Component {
     constructor(props){
        super(props);
          this.state={
              title:false,
              showButtons:false,
              movietitle:this.props.movies.title, posterpath:this.props.movies.poster_path,
              release_date:this.props.movies.release_date
        
            };
   }
    onMouseOver(){
       this.setState({title:true});
       this.setState({showButtons:true});
   }
   onMouseOut(){
       this.setState({title:false});
       this.setState({showButtons:true});   
   }
   /*deleted movie details is sent to the parent component*/
   deletefav(){
       this.props.handledelfav({movie:this.state.movietitle,movieposter:this.state.posterpath,release_date:this.state.release_date})
   }
   render(){
            const styles={
                    cardpic:{
                        width:'400px',
                        margin:'auto',
                        paddingBottom:'30px',
                    },
            cardhead:{
                backgroundColor:'#91a82d'
            },
        } ;
return( <MuiThemeProvider>

<div>    

        <Card style={styles.cardpic} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
        {this.state.title?<CardHeader style={styles.cardhead} title={this.props.movies.title} open={this.state.title}/>:''}
          <CardMedia>     
            <img src={'http://image.tmdb.org/t/p/w185/'+this.props.movies.poster} alt="" /> 
          </CardMedia> 
          {this.state.showButtons?<CardActions onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
            
          <RaisedButton label="Delete from Favourite" onClick={this.deletefav.bind(this)} primary={true}/>
        </CardActions>:''}
        </Card>    
</div>
</MuiThemeProvider> 
); 
} 
}

