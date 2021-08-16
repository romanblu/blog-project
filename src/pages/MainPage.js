import React from 'react';
import Post from '../Components/Post';
import PostsList from '../Components/PostsList';
import axios from 'axios';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { data: [] , hasUpdated:false };
    }

    // trigger rerendering when some post changed
    componentDidUpdate(prevProps){
        if(this.state.hasUpdated === true){
            this.getAllPosts();
            this.setState({hasUpdated:false})
        }
    }

    updatePosts = () => {
        this.setState({hasUpdated:true})
    }

    getUserById =async (id) => {
        const url  = "/api/users/" + id;
        axios.get(url).then((res) => {
            return res.data;
        });
    }

    getAuthorNameById = () => {
        return new Promise( resolve => {
            // setTimeout(() => { resolve("ROMEOOOO")}, 2000);
        }
        )
    }
    
    getAllPosts = () => {
        const url = "/api/posts";
        axios.get(url).then((res) => {
            
          console.log(res.data);
          this.setState({
            data:res.data,
            resp:null
          });
        });
      }
    
      
    
      componentDidMount(){
        this.getAllPosts();
      }

    render() {
        this.getAuthorNameById().then(res => console.log(res));
        
        const postItems = this.state.data.map(post => (
            <Post key={post.id} 
                title={post.title} 
                description={post.content} 
                image={post.image} 
                authorName={ "" }
                authorId={post.author_id}
                imageSrc={post.image}
                id={post.id} 
                name={"Romeo"} 
                currentUser={this.props.loggedUser}
                deletePost={this.props.deletePost}
                editPost={this.props.editPost}
                hasUpdated={this.updatePosts}/>
            
        ));
        
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
        console.log("current logged user ", this.state.loggedUser)

        return (
            <div>
                <div className="container">
                    <div className="blog-posts">
                        <div className="header"><h1>This is my blog</h1></div>
                        {postItems}
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

export default MainPage;