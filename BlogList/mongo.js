const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const BlogTitle = process.argv[3]
const BlogAuthor = process.argv[4]
const BlogURL = process.argv[5]
const BlogLikes = process.argv[6]

const url =
`mongodb+srv://tester:${password}@cluster0.tlnzq.mongodb.net/BlogList?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

if (!BlogTitle)
{
  Blog.find({}).then(result => {
        console.log("Blogs:")
        result.forEach(blog => {
          console.log(blog)
        })
        mongoose.connection.close()
      })
}
else
{
    const blog = new Blog({
        title: BlogTitle,
        author: BlogAuthor,
        url: BlogURL,
        likes: BlogLikes,
      })
      
      blog.save().then(result => {
        console.log(`added ${title} bloglist!`)
        mongoose.connection.close()
      })
}



