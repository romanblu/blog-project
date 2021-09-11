import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PostComments from './PostComments';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        minWidth: 375,
        margin: 'auto',
        height: '100%' // different height contents will have the same height
    },
    media:{
        height:300,
        width:'100%'
    }
});


class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            date: this.props.datePosted,
            authorName: "",
            authorId: this.props.authorId,
            image: this.props.imageSrc,
            loggedUser : this.props.currentUser, // issue - not rerendering when app gets current user 
            isAuthor: false,
            hasUpdated: false
        }
    } 


    componentDidMount(){
        if(!this.props.currentUser){
            this.setState({isAuthor:false});
        }else{
            
            if(this.props.currentUser.userId === this.state.authorId){
                this.setState({isAuthor:true});
            }
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentUser !== this.props.currentUser){
            if(!this.props.currentUser){
                this.setState({isAuthor:false});
            }else{
                if(this.props.currentUser.userId === this.state.authorId){
                    this.setState({isAuthor:true});
                }
            }
        }
    }

    handlePostDelete = () => {
        const id = this.state.id;
        const url = `api/posts/${id}`;
        axios.delete(url).then(res => {
          console.log("Posts deleted")
        }).catch((err) => console.log("Could not delete post. Error: ", err))       
        
        this.props.hasUpdated();
    }

    handlePostEdit = () => {
        this.props.editPost(this.state.id);
        
    }
    
    editDeleteButtons = () => {
        
        return (
            this.state.isAuthor ? 
            <div className="edit-delete">
                <button onClick={this.handlePostDelete} className="delete-post">Delete</button> 
                <button onClick={this.handlePostEdit} className="edit-post">
                    <Link to={{pathname:`/edit-post/${this.state.id}`,
                                state:{title:this.state.title,
                                        content:this.state.content,
                                        image:this.state.image}
                                }
                            }>
                        Edit
                    </Link>
                    
                </button>
            </div> : 'Not author'
        )
    } 

     

    render() {
        const { classes } = this.props;
        return (
                // <div className="post">
                //     <div className="content">
                //         <div className="post-image">
                //             <img src={this.props.imageSrc} alt="nice alpaca"/>
                //         </div>
                //         <div className="post-date">
                //                 Posted {this.props.datePosted} by {this.state.authorName}
                //         </div>
                //         <div className="content-holder">
                //             <h3><Link to={`/post/${this.state.id}`} className="blog-title">{this.props.title}</Link></h3>
                            
                //             <p className="description">{this.props.description}</p>
                //         </div>  
                //     </div>
                //     {this.state.isAuthor ? 
                //         <div className="edit-delete">
                //             <button class="delete-post-button" onClick={this.handlePostDelete} className="delete-post">Delete</button> 
                //             <button onClick={this.handlePostEdit} className="edit-post">
                //                 <Link class="edit-post-button" to={{pathname:`/edit-post/${this.state.id}`,
                //                             state:{title:this.state.title,
                //                                     content:this.state.content,
                //                                     image:this.state.image}
                //                             }
                //                         }>
                //                     Edit
                //                 </Link>
                                
                //             </button>
                //         </div> : ''
                //     }

                //     <PostComments postId={this.state.id} authorId={this.state.authorId}/>
                // </div>
                <Card className={classes.root}>
                        <CardMedia 
                            className={classes.media}
                            image={this.props.imageSrc}
                            title={this.props.title}
                        />
                        <CardContent>
                            <Typography variant="body2" style={{marginBottom:10}} color="textSecondary" component="p">
                                {this.props.date}
                            </Typography>
                            <Typography gutterBottom variant="h5" style={{marginBottom:15}} component="h2">
                                {this.props.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.description}
                            </Typography>
                        </CardContent>
                </Card>
            );
    }

}

export default withStyles(styles)(Post);