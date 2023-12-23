const Blog = require("../models/blog")
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'User1',
        password: 'Password1',
        name: 'First User'
    },
    {
        username: 'User2',
        password: 'Password2',
        name: 'Second User'
    }
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    initialUsers,
    usersInDb
}