'use server'
import axios from 'axios'

export const onGetBlogPosts = async () => {
    try {
        const postArray: {
            id: string | number
            title: string
            image: string
            content: string
            createdAt: Date
        }[] = []
        const postsUrl = process.env.CLOUDWAYS_POSTS_URL
        if (!postsUrl) return
        const posts = await axios.get(postsUrl)
        const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL
        if (!featuredImages) return

        let i = 0
        while (i < posts.data.length) {
            const image = await axios.get(
                `${featuredImages}/${posts.data[i].featured_media}`
            )
            if (image) {
                //we push a post object into the array
                console.log(image.data.media_details)
                const post: {
                    id: string | number
                    title: string
                    image: string
                    content: string
                    createdAt: Date
                } = {
                    id: posts.data[i].id,
                    title: posts.data[i].title.rendered,
                    image: image.data.media_details.file,
                    content: posts.data[i].content.rendered,
                    createdAt: new Date(posts.data[i].date),
                }
                postArray.push(post)
            }
            i++
        }

        if (posts.data) {
            return postArray
        }
    } catch (error) {
        console.log(error)
    }
}

export const onGetBlogPost = async (id: string | number) => {
    try {
        console.log(id, "idddddd")
        const postUrl = process.env.CLOUDWAYS_POSTS_URL
        console.log(postUrl, "posturl")
        if (!postUrl) return
        const { data: postData } = await axios.get(`${postUrl}/${id}`)
        console.log(postData, "postttt")
        if (postData) {
            const authorUrl = process.env.CLOUDWAYS_USERS_URL
            console.log(authorUrl, "authorurl")
            if (!authorUrl) return
            const { data: author } = await axios.get(`${authorUrl}${postData?.author}`)
            console.log(author, "authorrrr")
            if (author) {
                return {
                    id: postData.id,
                    title: postData.title.rendered,
                    content: postData.content.rendered,
                    createdAt: new Date(postData.date),
                    author: author.name,
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
