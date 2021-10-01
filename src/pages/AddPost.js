import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";



class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            postContent:''
        }
    }

    onChange(e){
        console.log(e.target.getContent())
        this.setState({
            postContent:e.target.getContent()
        })
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
                <Editor
                    init={{
                        plugins: 'link image code',
                        toolbar
                    }}
                    onChange={this.onChange}
                />

                <p>
                    {this.state.postContent}
                </p>

            </div>
            
        )
    }

}

export default AddPost;