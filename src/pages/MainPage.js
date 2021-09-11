import React from 'react';
import Post from '../Components/Post';
import PostsList from '../Components/PostsList';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 50,        
    },
    pageTitle:{
        marginBottom:75
    }
    
});

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

    demoPosts =[
        {
            id: 1,
            title:'Meet Microsoft’s 2021-2022 Showcase Schools and MIE Experts',
            description: 'At Microsoft, we are inspired every day by the impact that dedicated educators and thoughtful leaders are making to innovate education, and ultimately, improve student outcomes. The last 18 months have only increased our appreciation of the critical work educators and school leaders do to help every student achieve more.',
            date:'September 02, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/1293bd74-0658-449d-a485-1cd772898378/MicrosoftEDU_1040x585_083021_3.png',
            tags:['Educators', 'School leaders', 'Innovative educator']
        },
        {
            id: 2,
            title:'5 resources to help teachers prepare for back-to-school',
            description: 'Back-to-school time represents new beginnings, new perspectives, and new chances to grow. To set teachers up with the confidence, tools, and training they need to help students of all abilities thrive this year, we’ve rounded up several free resources for educators looking to personalize student learning and supercharge classroom engagement.',
            date:'August 26, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/5d6baff2-a768-42ea-8fbe-d21eca585081/Hero_WIN22_HybridLearning_022.png',
            tags:['Educators', 'School leaders', 'Re3mote & Hybrid learning']
        },
        {
            id: 3,
            title:'Announcing AP Computer Science Principles with Microsoft MakeCode',
            description: 'In partnership with the United States College Board organization, whose mission is to expand access to higher education for every student, Microsoft is proud to announce a free new curriculum resource for high school educators who teach the College Board’s Advanced Placement Computer Science Principles course.',
            date:'August 19, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/e9c432ba-1312-418f-9751-5f65218d070c/Blocks.png',
            tags:['Educators', 'School leaders', 'STEM']
        },
        {
            id: 4,
            title:'Announcing AP Computer Science Principles with Microsoft MakeCode',
            description: 'In partnership with the United States College Board organization, whose mission is to expand access to higher education for every student, Microsoft is proud to announce a free new curriculum resource for high school educators who teach the College Board’s Advanced Placement Computer Science Principles course.',
            date:'August 19, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/e9c432ba-1312-418f-9751-5f65218d070c/Blocks.png',
            tags:['Educators', 'School leaders', 'STEM']
        },
        {
            id: 5,
            title:'Announcing AP Computer Science Principles with Microsoft MakeCode',
            description: 'In partnership with the United States College Board organization, whose mission is to expand access to higher education for every student, Microsoft is proud to announce a free new curriculum resource for high school educators who teach the College Board’s Advanced Placement Computer Science Principles course.',
            date:'August 19, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/e9c432ba-1312-418f-9751-5f65218d070c/Blocks.png',
            tags:['Educators', 'School leaders', 'STEM']
        },
        {
            id: 6,
            title:'Announcing AP Computer Science Principles with Microsoft MakeCode',
            description: 'In partnership with the United States College Board organization, whose mission is to expand access to higher education for every student, Microsoft is proud to announce a free new curriculum resource for high school educators who teach the College Board’s Advanced Placement Computer Science Principles course.',
            date:'August 19, 2021',
            image:'https://forrit-cms-msedu-consumables.azureedge.net/media/e9c432ba-1312-418f-9751-5f65218d070c/Blocks.png',
            tags:['Educators', 'School leaders', 'STEM']
        }
    ]

    render() {
        this.getAuthorNameById().then(res => console.log(res));
        
        const postItems = this.demoPosts.map(post => (
            <Grid item xs={4}>
                <Post key={post.id} 
                    title={post.title} 
                    description={post.description}
                    date={post.date} 
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
            </Grid>
        ));
        
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography className={classes.pageTitle} gutterBottom variant="h2" align="center">This is my blog</Typography>
                <Grid container spacing={3}>
                    {postItems}

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);