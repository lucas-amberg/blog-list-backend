const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./tests_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

})

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
    
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]

    const listWithNoBlogs = []

    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: 'd228dhjhd82hdiajsd',
            title: 'Lucas Amberg Github',
            author: 'Lucas Amberg',
            url: 'https://www.github.com/lucas-amberg',
            likes: 23,
            __v: 0
        }
    ]

    test('when list has no blogs, equals zero', () => {
        const result = listHelper.totalLikes(listWithNoBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs, equals the sum of the likes of those blogs', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(28)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]

    const listWithNoBlogs = []

    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: 'd228dhjhd82hdiajsd',
            title: 'Lucas Amberg Github',
            author: 'Lucas Amberg',
            url: 'https://www.github.com/lucas-amberg',
            likes: 23,
            __v: 0
        }
    ]

    test('when there is no blogs returns \"None\"', () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs)
        expect(result).toBe("None")
    })
    test('when there is only one blog returns self', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })    

    test('when there is multiple blogs returns the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        expect(result).toEqual({
            title: 'Lucas Amberg Github',
            author: 'Lucas Amberg',
            likes: 23
        })
    })
})

describe('api', () => {
    test('works with get request', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})
