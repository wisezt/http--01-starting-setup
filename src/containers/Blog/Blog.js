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
        nextPages: 0,
        totalPages: 0
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>
            {

                const posts = response.data.slice(this.state.currentPages, this.state.nextPages);
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
        const newCurrentPages ={...this.state.currentPages};
        newCurrentPages>4 ?
        this.setState({currentPages: newCurrentPages-4}):
            this.setState({currentPages: 0});
    }

    clickNextPages=()=>{
        const newNextPages ={...this.state.nextPages};
        (newNextPages + 4)> this.state.posts.length ?
            this.setState({currentPages: this.state.posts.length}):
            this.setState({currentPages: newNextPages + 4});

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