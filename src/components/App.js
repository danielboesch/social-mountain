import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
      this.setState({posts: results.data})
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(element => { this.setState({
      posts: element.data
    })

    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(element => {
      this.setState({
        posts: element.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, {text})
    .then(element => {

     this.setState ({text: element.data})})
  }

  render() {
    const { posts } = this.state;


    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map(element => (
            <Post key={element.id} text={element.text} date={element.date} updatePostFn={this.updatePost} id={element.id} deletePostFn={this.deletePost} createPostFn={this.createPost}/>
          ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;



