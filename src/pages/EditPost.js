import React, { Component } from 'react'
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { Editor } from "@tinymce/tinymce-react";
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import { Redirect } from 'react-router';


const styles = theme => ({
    
        
});



class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            postContent:"",
            image:"",
            postId: this.props.match.params.postId,
            redirect:false
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount(){
        const url = `/api/posts/${this.props.match.params.postId}`;
        axios.get(url).then((res) => {
            this.setState({
                title: res.data.title,
                postContent: res.data.content,
                image: res.data.image
            })
        }).catch(err => console.log("Could not retrieve post. Error: ", err));
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

    onChange(e){
        this.setState({
            postContent:e.target.getContent()
        })
    }

    handleSubmit(){
       
        const url = `/api/posts/${this.props.match.params.postId}`;    
        const data = {
            title:this.state.title,
            content: this.state.postContent,
            image: this.state.image,
            };
        axios.put(url, data).then(res => {
            console.log("SUCCESS ",res)
            this.setState({redirect:true})
        }).catch(err => console.log("error", err));
    }
    
    handleRedirect = () => {
        if(this.state.redirect){
            return <Redirect to={`/post/${this.state.postId}`}/>
        }
    }

    render() {

        const toolbar = "fontselect fontsizeselect formatselect | " +
        "bold italic underline strikethrough subscript superscript | " +
        "blockquote removeformat | forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "indent outdent | numlist bullist | " +
        "link unlink | hr table image | fullscreen code | undo redo";

        return (
            <div>

                <Typography component="h3" variant="h3" align="center" color="primary">
                    Edit post
                </Typography>

                <TextField onChange={this.handleImageUrlChange} label="Image" variant="outlined" required fullWidth margin="normal" 
                    id="standard-error-helper-text"  helperText="Please enter an image" value={this.state.image}
                    error={this.state.error}
                />
                <TextField onChange={this.handleTitleChange} label="Title" variant="outlined" required fullWidth margin="normal"
                    id="standard-error-helper-text"  helperText="Please enter a title" value={this.state.title}
                    error={this.state.error}
                />
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar
                    }}
                    initialValue={this.state.postContent}
                    onChange={this.onChange}
                />

                
                <Button onClick={this.handleSubmit} color="primary" variant="outlined">
                    Submit Edit
                </Button>

               {this.handleRedirect()}
            </div>
        )
    }
}

export default withStyles(styles)(EditPost);
