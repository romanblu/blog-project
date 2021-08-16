import React from 'react';
import PostsList from '../Components/PostsList';
import Post from '../Components/Post';
import axios from 'axios';

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
            authorName: "",
            authorId: this.props.authorId,
            image: this.props.imageSrc

        };
    }
    
    
    posts = [
        {
            title:"Blog post #1",
            description:"My  first blog post  is all about my  blog post  and how to write a new post in my blog, find it here",
            dateNumber: 2 ,
            dateUnit:"days",
            authorName:"Israel",
            imageSrc:"https://cdn.pixabay.com/photo/2015/10/12/20/52/alpaca-985158_960_720.jpg"
        },
        {
            title:"Blog post #2",
            description:"My first blog post is all about my blog post and how to write a new post in my blog, find it heret",
            dateNumber: 2 ,
            dateUnit:"days",
            authorName:"Joe",
            imageSrc:"https://images.unsplash.com/photo-1511885663737-eea53f6d6187?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
        },
        {
            title:"Blog post #3",
            description:"My third blog post is all about my blog post",
            dateNumber: 3 ,
            dateUnit:"days",
            authorName:"Israel",
            imageSrc:"https://images.unsplash.com/photo-1534615098829-958121bcc188?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
        
    ];

    
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
           console.log("POST DATA ",res)
            this.setState({
                data:res.data,
                id: id,
                title: res.data.title,
                content: res.data.content,
                authorId: res.data.author_id,
                image: res.data.image
            });

          
        });
      }

      
    componentDidMount (){
        const {id} = this.props.match.params;

        this.getPostById(id);
    }

    render () {
        
    const postsLinks1 = [
        {
            postTitle: "Blog post #1 ",
            destination:"#"
        },
        {
            postTitle: "Blog post #2 ",
            destination:"#"
        },
        {
            postTitle: "Blog post #3 ",
            destination:"#"
        }
    ];
    const postsLinks2 = [
        {
            postTitle: "Blog post #3 ",
            destination:"#"
        },
        {
            postTitle: "Blog post #1 ",
            destination:"#"
        },
        {
            postTitle: "Blog post #2 ",
            destination:"#"
        }
    ];
        
        return (
            
            <div>
                <div className="container">
                    <div className="blog-posts">
                           
                        <Post title={this.state.title} 
                        description={this.state.content} 
                        authorName={this.state.authorName}
                        imageSrc={this.state.image}
                        id={this.state.id} 
                        authorId={this.state.authorId}
                        />
                    </div>

                    <div className="sidebar">
                        <PostsList title="Latest" postsLinks={postsLinks1}/>
                        <PostsList title="Popular" postsLinks={postsLinks2}/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default PostPage;