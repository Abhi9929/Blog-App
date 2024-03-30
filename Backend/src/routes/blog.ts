import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verifyJWT } from '../middlewares/auth.middleware';
import { createPostType, updatePostType } from "@abhi.makedevs/common-01"

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


// Adding an Auth Middleware to the below routes:

blog.post('', verifyJWT, async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: createPostType = await c.req.json();

    let post;
    try {
        post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                publishedDate: body.publishedDate
            }
        })
    } catch (error) {
        c.status(411);
        return c.json({ message: "error" })
    }

    return c.json({ id: post.id })
});

blog.put('', verifyJWT, async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: updatePostType = await c.req.json();

    try {
        const updatePost = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title,
                content: body.content,
            },

        })
    } catch (error) {
        c.status(411);
        return c.json({ message: "error" })
    }

    return c.text("Post updated successfully")
});

blog.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let posts;
    let authorNames: ({ name: string | null; } | null)[];
    try {
        posts = await prisma.post.findMany(
            {
              select: {
                id: true,
                title: true,
                content: true,
                published: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
              }  
            });        
        if (!posts) {
            c.status(411);
            return c.json({ message: "Unable to fetch blogs" })
        }
        /*
        const authorID = posts.map(post => post.authorId);
        // finding author name via authorId
        const authorNamesPromises = authorID.map(async (elemId) => {
            try {
                const authorName = await prisma.user.findUnique(
                    {
                        where: {
                            id: elemId
                        },
                        select: {
                            name: true,
                        }
                    }
                );
                return authorName;
            } catch (error) {
                console.error("Error fetching author name:", error);
                return null; // or handle the error as needed
            }
        });
        
        // Wait for all promises to resolve
        authorNames = await Promise.all(authorNamesPromises);
        
        // Check if any author names are null (indicating an error occurred)
        if (authorNames.some(name => !name)) {
            c.status(411);
            return c.json({ error: "Internal server error" });
        }
        // console.log(authorNames);

        posts = posts.map((post, index) => {
            const authorName = authorNames[index]?.name || '';
            return {...post, authorName}
        })
        */
    } catch (error) {
        c.status(411)        
        return c.json({ message: error });
    }
    c.status(200)
    return c.json(posts);
})

blog.get('/:id', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id');

    let post;
    try {
        post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true,
                    }
                },
            }
        })
        if (!post) {
            c.status(411);
            return c.json({ message: "error occurs" })
        }
        console.log("Post: ", post);
    } catch (error) {
        c.status(411)
        return c.json({ message: error });
    }
    return c.json(post);
});




export default blog;