import React from 'react';
import PostsList from '../Components/PostsList';
import Post from '../Components/Post';
import axios from 'axios';
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import { mergeClasses, withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import PostComments from '../Components/PostComments';

// import '../App.module.css';


const styles = theme => ({
    root: {
        // backgroundColor: '#fff'
    },
    container:{
        backgroundColor: '#fff',
        paddingTop:75,
        maxWidth: 800,
        margin: 'auto',
    },
    image:{
        marginTop:35,
        marginBottom:50,
        width:'100%'
    },
    content:{
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:50
    },
    title:{
        marginLeft:25,
        marginRight:25
    },
    author:{
        marginTop: 25,
        marginLeft:25
    }
});

class PostPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            user: {
                name: "",
                username:"",
                password:""
            },
            id: this.props.id,
            title: this.props.title,
            content: this.props.description,
            date: this.props.datePosted,
            authorName: this.props.username,
            authorId: this.props.authorId,
            image: this.props.imageSrc,
            redirect: false

        };
    }
   
    
    getAuthorNameById = (id) => {
        const url = "/api/users/"+id;
        axios.get(url).then((res) => {
            
            this.setState({
                authorName: res.data.username
            });
        });
    }

    getPostById = (id) => {
        const url = "/api/posts/" + id;
        axios.get(url).then((res) => {
            this.setState({
                data:res.data,
                id: id,
                title: res.data.title,
                content: res.data.content,
                authorId: res.data.author_id,
                image: res.data.image,
                authorName: res.data.author_name
            });

          
        });
      }

      
    componentDidMount (){
        const {id} = this.props.match.params;

        this.getPostById(id);
    }

    // handlePostEdit = () => {
    //     this.props.editPost(this.state.id);
        
    // }

    handlePostDelete = () => {
        const id = this.state.id;
        const url = `/api/posts/${id}`;
        
        axios.delete(url).then(res => {
          console.log("Posts deleted")
            this.setState({redirect: true});
        //   this.props.deletePost(id);
        }).catch((err) => console.log("Could not delete post. Error: ", err))       
        
    }

    handleRedirect = () => {
        if(this.state.redirect){
            return <Redirect to="/" />;
        }
    }

    editDeleteButtons = () => {
        
        return (
            <div className="edit-delete">
                <Button onClick={this.handlePostDelete} className="delete-post">Delete</Button> 
                <Button className="edit-post">
                    <Link to={{pathname:`/edit-post/${this.state.id}`,
                                state:{title:this.state.title,
                                        content:this.state.content,
                                        image:this.state.image}
                                }
                            }>
                        Edit
                    </Link>
                    
                </Button>
            </div> 
        )
    } 

    render () {
        
        const { classes } = this.props;
        console.log(this.state)
        
        return (
            
            <div className={classes.root}>
                <div className={classes.container}>
                        
         
                        <Typography className={classes.title} component="h3" variant="h4" align="center" >
                            {this.state.title}
                        </Typography>
                        <Typography className={classes.author} component="p" variant="h6" align="left" >
                            writen by {this.state.authorName}
                        </Typography>
                        <img className={classes.image} src={this.state.image}/>
                        {this.editDeleteButtons()}
                        <div className={classes.content} dangerouslySetInnerHTML={{__html:this.state.content}}>

                        </div>
                        <PostComments postId={this.state.id} authorId={this.state.authorId} authorName={this.state.authorName}/>
                        
                    {this.handleRedirect()}
                </div> 
            </div>
        );
    }
}

export default withStyles(styles)(PostPage);