const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: 'Blog post 1',
        author: 'Lucas Amberg',
        url: 'https://www.github.com/lucas-amberg',
        likes: 222
    },
    {
        title: 'So I found this new site',
        author: 'Lucas Amberg',
        url: 'https://lucasamberg.dev',
        likes: 99999
    }

  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}