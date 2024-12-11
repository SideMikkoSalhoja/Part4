const dummy = (blogs) => {
    return 1;
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
  
    let favorite = blogs[0];
  
    blogs.forEach(blog => {
      if (blog.likes > favorite.likes) {
        favorite = blog;
      }
    });
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  };

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    const authorCount = {};
  
    blogs.forEach(blog => {
      const author = blog.author;
      if (authorCount[author]) {
        authorCount[author]++;
      } else {
        authorCount[author] = 1;
      }
    });
  
    let topAuthor = { author: '', blogs: 0 };
  
    for (const author in authorCount) {
      if (authorCount[author] > topAuthor.blogs) {
        topAuthor = { author: author, blogs: authorCount[author] };
      }
    }
  
    return topAuthor;
  };

  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
  
    const authorLikes = {};
  
    blogs.forEach(blog => {
      const author = blog.author;
      const likes = blog.likes;
      
      if (authorLikes[author]) {
        authorLikes[author] += likes;
      } else {
        authorLikes[author] = likes;
      }
    });
  
    let topAuthor = { author: '', likes: 0 };
  
    for (const author in authorLikes) {
      if (authorLikes[author] > topAuthor.likes) {
        topAuthor = { author: author, likes: authorLikes[author] };
      }
    }
  
    return topAuthor;
  };

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }

