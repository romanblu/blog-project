import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Button, TextField, Box, Container, Typography} from '@material-ui/core';
import {  makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router';
const useStyles =  makeStyles({
    root:{
        paddingLeft:25,
        paddingRight:25
    },
    userComment:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        margin: '10px 0px',
        gap:'25px'
    },
    userAvatar:{
        verticalAlign: 'middle',
        // marginTop: 'auto',
        // marginBottom: 'auto',
        verticalAlign: 'middle',
        textAlign: 'center',
        //  borderRadius: '50%',
        //  overflow:'hidden',
        //  position:'center'
    },
    userAvatarImage:{
        borderRadius: '50%',
        objectFit:'cover',
        width: 50,
        height: 50,
        
    },
    comment:{
        marginTop:'25px',
        display:'flex',
        gap:'25px'
    },
    commentDetails:{

    },
    commentDate:{
        fontSize:14,
        color:'#4b6e7b'
    },
    authorName:{
        fontSize:18,
        color:'#2e4750',
        fontWeight:'600'
    }
});

function PostComments(props) {
    const [showComments, setShowComments] = useState(false);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [postComments, setPostComments] = useState([])
    const classes = useStyles();
    const demoComments = [
        {
            authorName: 'Ricardo',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo2',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo3',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo4',
            authorId:12,
            postId:10,
            content: 'lLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularise',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo6',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        }
    ]
    const {id} = useParams(); 
    console.log("POST ID ", id);

    useEffect(() => {
        const url = `/api/posts/${id}/comments`;
        axios.get(url).then(res => {
            let allComments = []
            res.data.map(comment => {
                
                allComments.push({...comment});
            })
            console.log(allComments);
            setPostComments(allComments);
        })
        .catch(err => console.log("Error fetching comments ", err));
    }, [])


    const onShowComments = () => {
        setShowComments(true);
    }

    const onHideComments = () => {
        setShowComments(false);
    }

    const handleNewCommentChange = (event) => {
        setNewCommentContent(event.target.value)
    }

    const submitNewComment = () => {
        const url = `/api/posts/${id}/comments`;
        const data = {
            author_id:props.authorId,
            author_name: props.authorName,
            content:newCommentContent
        }

        axios.post(url, data).then(res => {
            console.log("RESPONSE ",res);
            setNewCommentContent('');
            setPostComments([...postComments, {
                comment_id: res.data.comment_id,
                author_id: res.data.author_id,
                author_name: res.data.author_name,
                post_id: res.data.post_id,
                content: res.data.content
                
            }])
        }).catch(err => console.log("error adding a comment, ", err));

        // axios.get(`api/users/${props.authorId}`).then(user => {
        //     axios.post(url, data).then(res => {

        //         setPostComments([...postComments, {
        //             comment_id: res.data.author_id,
        //             author_id: res.data.author_id,
        //             post_id: res.data.post_id,
        //             content: res.data.content,
        //             username: user.data.username
        //         }])
        //         setNewCommentContent('')
        //     }).catch(err => console.log("Error adding new comment: ", err));
        // })
        
    }

    const Comments = postComments.map(comment => 
         (<div  className={classes.comment}>
             <div className={classes.userAvatar}>
                    <img className={classes.userAvatarImage} src="https://assets.atdw-online.com.au/images/9a9e6bc10a768c84cb66b7fda9149e2a.jpeg?rect=0,1071,3672,2754&w=745&h=559&&rot=360" alt="" />
                </div>
            <div className={classes.commentDetails}>
                <Typography className={classes.authorName}>{comment.author_name}</Typography>
                <Typography className={classes.commentDate}>Today at 15:05</Typography>
                <Typography className={classes.commentContent}>{comment.content}</Typography>
            </div>
            
        </div>)
    ) 
    
    const showCommentsButton = <Button  onClick={onShowComments}>Show Comments</Button>;
    const hideCommentsButton = <Button  onClick={onHideComments}>Hide Comments</Button>;

    return (


        <div className={classes.root}>
            
            {showComments ? hideCommentsButton : showCommentsButton}
            {showComments ? Comments : '' }
            <div className={classes.userComment}>
                <div className={classes.userAvatar}>
                    <img className={classes.userAvatarImage} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06esYfQM8YO9mUMLqyA3hGkivXdCdry8I_Q&usqp=CAU" alt="" />
                </div>
                
                <TextField id="outlined-basic" multiline fullWidth value={newCommentContent}  onChange={handleNewCommentChange} variant="outlined" placeholder="Say something smart please..."/>
                    
                <Button onClick={submitNewComment} color="primary" variant="outlined" className="send-comment" >Send</Button>
                

            </div>
        </div>
    )
}

export default PostComments;