const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length  === 0 
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "None"
    }
    const blogWithMostLikes = blogs.reduce((mostLiked, current) => {
        return current.likes > mostLiked.likes ? current : mostLiked
    }, blogs[0])
    const {__v, _id, url, ...remainingObject} = blogWithMostLikes
    return remainingObject
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}