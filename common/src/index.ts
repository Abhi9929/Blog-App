import { z } from "zod";

const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: 'Password must be of 8 characters' })
})
type SignupType = z.infer<typeof signupInput>;


const signinInput = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: 'Password must be of 8 characters' })
})
type SigninType = z.infer<typeof signinInput>;

const createPostInput = z.object({
    title: z.string().min(1, { message: "Title can't be empty" }),
    content: z.string().min(1, { message: 'content cannot be empty' }),
    publishedDate: z.date()
})
type createPostType = z.infer<typeof createPostInput>;


const updatePostInput = z.object({
    title: z.string().min(1, { message: "Title can't be empty" }),
    content: z.string().min(1, { message: 'content cannot be empty' }),
    id: z.string().optional(),
})
type updatePostType = z.infer<typeof updatePostInput>;


export {
    signupInput,
    signinInput,
    createPostInput,
    updatePostInput,
    SigninType,
    SignupType,
    updatePostType,
    createPostType
}