import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state ={
        posts: [], // define posts as an array
        SelectedPostId: null,
        currentPages: 0,
        nextPages: 4,
        totalPages: 0,
        newPosts:[],
        newNextPages :0,
        newCurrentPages :0,
        stateNumber: 0
    }



    componentDidMount(){

        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>
            {

                this.setState({newPosts: response.data});
                console.log(this.state.newPosts.length)
                const posts = response.data.slice(0, 4);
                const updatedPosts =posts.map(post =>{
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts}); // response.data is array and put the array into state.posts
                console.log(response);}
        )
        ;




    }

    postSelectedHandler = (id) =>{
            this.setState({selectedPostId:id});
}


    clickPreviousPages=()=>{

    }

    clickNextPages=()=>{

    }

    render () {
        const posts =this.state.posts.map(post =>{  // map the array to JSX
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                 clicked={()=>this.postSelectedHandler(post.id)}

            />;});

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <button onClick={this.clickPreviousPages}>Previous</button>
                <button onClick={this.clickNextPages}>Next</button>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;