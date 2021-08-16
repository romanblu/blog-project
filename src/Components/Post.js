import React from 'react';
import './post.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PostComments from './PostComments';
import './post.css';

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
        return (
                <div className="post">
                    <div className="content">
                        <div className="content-holder">
                            <h3><Link to={`/post/${this.state.id}`} className="blog-title">{this.props.title}</Link></h3>
                            
                            <p className="description">{this.props.description}</p>
                            <div className="post-date">
                                Posted {this.props.datePosted} by {this.state.authorName}
                            </div>

                        </div>

                        <div className="post-image">
                            <img src={this.props.imageSrc} alt="nice alpaca"/>
                        </div>

                        
                    </div>
                    {this.state.isAuthor ? 
                        <div className="edit-delete">
                            <button class="delete-post-button" onClick={this.handlePostDelete} className="delete-post">Delete</button> 
                            <button onClick={this.handlePostEdit} className="edit-post">
                                <Link class="edit-post-button" to={{pathname:`/edit-post/${this.state.id}`,
                                            state:{title:this.state.title,
                                                    content:this.state.content,
                                                    image:this.state.image}
                                            }
                                        }>
                                    Edit
                                </Link>
                                
                            </button>
                        </div> : ''
                    }

                    <PostComments postId={this.state.id} authorId={this.state.authorId}/>
                </div>
            );
    }

}

export default Post;