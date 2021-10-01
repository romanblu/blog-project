import React from 'react';
import axios from 'axios';
import { EditorState, convertToRaw, ConvertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles } from '@material-ui/styles';
import draftToHtml from 'draftjs-to-html';
import { convertToHTML} from 'draft-convert';

const styles = theme => ({
    root:{
        width:'50%',
        marginLeft: 'auto',
        marginRight:'auto',
        innerHeight: 500,
    },
    editor:{
        
    }
})

class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            image:'',
            editorState: EditorState.createEmpty(),
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
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
    
    onEditorStateChange(editorState){
        this.setState({
          editorState,
        });
      };

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
        const { editorState } = this.state;
        const {classes} = this.props;
        return (
            
            <div>
                <div className={classes.root}>
                    <div className={classes.editor}>
                        <Editor 
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={{
                                image:{defaultSize:{width:100}}
                            }}
                        />
                    </div>
               
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                    
                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
                    <div dangerouslySetInnerHTML={{ __html: convertToHTML(editorState.getCurrentContent()) }} />

                    <Editor 
                        editorState={EditorState.createWithContent(ConvertFromRaw(editorState))}
                        readOnly={true}
                    />

                    {/* <div className="new-post">
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
                    </div> */}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NewPost);