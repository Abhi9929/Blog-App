import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { SigninType, SignupType } from "@abhi.makedevs/common-01"
import { verifyJWT } from '../middlewares/auth.middleware';

// creating a hono variable and specifying the enviroment variables
const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


user.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: SignupType = await c.req.json();

    let token;

    try {

        // check for existing User
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        
        if (user) {            
            
            c.status(409);
            return c.json({error: "email already exists"})
        }

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        // generating a token:
        const payload = {
            email: newUser.email,
            id: newUser.id,
            name: newUser.name,
            password: newUser.password,
        }
        const secret = c.env.JWT_SECRET;

        token = await sign(payload, secret);

    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing up" })
    }
    return c.json({
        message: "User registered successfully",
        accessToken: token,
    })
});

user.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: SigninType = await c.req.json();

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        },
    })
    if (!user) {
        c.status(411);
        return c.json({ error: "Invalid email and password" })
    }

    // generating a token:
    const payload = {
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
    }
    const secret = c.env.JWT_SECRET;

    const token = await sign(payload, secret);


    return c.json({
        message: "User logged in successfully",
        accessToken: token,
    })

});

user.get('/details', verifyJWT, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');

    let user;
    try {
        user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
            }
        })
    } catch (error) {
        c.status(411);
        return c.json({ message: "error while fetching user logging" })
    }

    return c.json({user})

})
export default user;