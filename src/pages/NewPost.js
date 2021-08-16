import React from 'react';
import axios from 'axios';

class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            image:''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});

    }

    handleContentChange(event) {
        this.setState({content: event.target.value});

    }

    handleImageUrlChange(event){
        this.setState({image: event.target.value});
    }
    
    

    handleSubmit(){
        // send new post to server
        const url = '/api/posts';
        const data = {
            title:this.state.title,
            content: this.state.content,
            image: this.state.image,
            author_id: this.props.user.userId};
        
        axios.post(url, data).then(res => {
            console.log("NEW POST ADDED");
        });
        
    }

    render  (){
        return (
            
            <div>
                <div className="container">
                    <div className="new-post">
                        <h1>New Post</h1>
                        <label htmlFor="post-title">Title: </label>
                        <input type="text" id="post-title" value={this.state.title} onChange={this.handleTitleChange}/>
                        <label htmlFor="post-content">Write Post Content:</label>
                        <textarea name="content" id="new-post-content" cols="30" rows="10" className="new-post-content" 
                        value={this.state.content} onChange={this.handleContentChange}></textarea>
                        <p className="characters-left smaller-font">256 characters left</p>
                        <label htmlFor="post-image">Enter image url: </label>
                        <input type="text" id="post-image" value={this.state.image} onChange={this.handleImageUrlChange}/>
                        <button type="submit" value="Send Post" className="submit-post" onClick={this.handleSubmit}>Send Post</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default NewPost;