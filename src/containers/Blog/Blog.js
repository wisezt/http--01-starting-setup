import React, {Component} from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [], // define posts as an array
        SelectedPostId: null,
        currentPages: 0,
        nextPages: 4,
        totalPages: 0,
        allPosts: [],

        stateNumber: 0
    }
    currentPage = 0;
    previousPage = 0;
    nextPage = 0;


    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {

                this.setState({allPosts: response.data});
                console.log(this.state.allPosts.length)
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts}); // response.data is array and put the array into state.posts
                console.log(response);
            }
        )
        ;


    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }


    // why we still can get data when the index is negative?

    clickPreviousPages = () => {
        this.currentPage = this.currentPage-4;


        let updatedPosts = this.state.allPosts.slice(this.currentPage, this.currentPage+4);

        this.setState({posts: updatedPosts});
        console.log('currentPage: ' + this.currentPage);

    }

    clickNextPages = () => {
        this.currentPage = this.currentPage+4;


        let updatedPosts = this.state.allPosts.slice(this.currentPage, this.currentPage + 4);

        this.setState({posts: updatedPosts});
        console.log('currentPage: ' + this.currentPage);


    }

    render() {
        const posts = this.state.posts.map(post => {  // map the array to JSX
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}

            />;
        });

        return (
            <div>
                <button onClick={this.clickPreviousPages}>Previous</button>
                <button onClick={this.clickNextPages}>Next</button>
                <section className="Posts">
                    {posts}
                </section>

                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;