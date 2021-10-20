import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Button, TextField, Typography} from '@material-ui/core';
import axios from 'axios';
import { Redirect } from "react-router";



class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            postContent:'',
            error: false,
            image:'',
            title:'',
            redirect:false,
            newPostId: null
        }
    }

    onChange(e){
        console.log(e.target.getContent())
        this.setState({
            postContent:e.target.getContent()
        })
    }

    changeImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }
   
    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onSubmit = (e) => {
        console.log('POST ADDED');
        const url = '/api/posts';
        const data = {
            title:this.state.title,
            content: this.state.postContent,
            image: this.state.image,
            author_id: this.props.user.userId,
            author_name: this.props.user.username
        };
        axios.post(url, data).then(res => {
            this.setState({redirect:true, newPostId:res.data.id})
        });
    }

    handleRedirect = () => {
        if(this.state.redirect){
            return <Redirect to={`post/${this.state.newPostId}`}/>
        }
    }

    render(){
        const toolbar = "fontselect fontsizeselect formatselect | " +
        "bold italic underline strikethrough subscript superscript | " +
        "blockquote removeformat | forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "indent outdent | numlist bullist | " +
        "link unlink | hr table image | fullscreen code | undo redo";
    

        return (
            
            <div>
                <Typography component="h3" variant="h3" align="center" color="primary">
                    Add A New Post
                </Typography>

                <TextField onChange={this.changeImage} label="Image" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter an image"
                    error={this.state.error}
                />
                
                <TextField onChange={this.changeTitle} label="Title" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter a title"
                    error={this.state.error}
                />
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar
                    }}
                    onChange={this.onChange}
                />

                
                <Button onClick={this.onSubmit} color="primary" variant="outlined">
                    Add Post
                </Button>

                {this.handleRedirect()}
            </div>
            
        )
    }

}

export default AddPost;