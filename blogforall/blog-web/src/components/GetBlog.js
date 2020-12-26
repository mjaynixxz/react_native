import React, { useEffect, useContext } from 'react';
import { Context as BlogContext } from '../context/BlogContext'

const GetBlog = () => {
    const { state, getBlogPost } = useContext(BlogContext);
    
      useEffect(
          () => {
              getBlogPost();
          },
       []);

    const renderBlogList = () => state.map(blog => {
    return (
        
        <div class="ui relaxed divided list" style={{ borderBottom: '3px solid gray', margin: '20px', lineHeight: 1.5 }}>
        <div style={{ marginBottom: '10px' }} class="item">
          <i class="large user middle aligned icon"></i>
          <div class="content">
            <h1 class="header">Title - {blog.title}</h1>
        <h1 className='header'>Author - {blog.author}</h1>
            <div class="description">Content - {blog.content}</div>
          </div>
        </div>
        </div>
         
    );
    })


    return (
        <>
        <div style={{ display: 'flex', alignContent: 'center', justifyContent:'center', marginTop: '100px', fontSize: 150 }}><h1>Blog For all</h1></div>
        <div className='ui container' style={{ marginTop: '150px' }}>

            {renderBlogList()}
        </div>
        
        </>
       
    )
}

export default GetBlog
