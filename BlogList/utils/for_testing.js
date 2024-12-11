const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}
  
const testBlogIdField = async () => {
    const blog = new Blog({
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 10,
    });
  
    const savedBlog = await blog.save();
    const blogObject = savedBlog.toJSON();
  
    assert.strictEqual(blogObject.id, savedBlog._id.toString());
    assert.strictEqual(blogObject.hasOwnProperty('_id'), false);
  
    console.log('Test passed');
  };

  module.exports = {
    reverse,
    average,
    testBlogIdField,
  }