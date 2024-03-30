import { z } from "zod";
declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
type SignupType = z.infer<typeof signupInput>;
declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
type SigninType = z.infer<typeof signinInput>;
declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    publishedDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    publishedDate: Date;
}, {
    title: string;
    content: string;
    publishedDate: Date;
}>;
type createPostType = z.infer<typeof createPostInput>;
declare const updatePostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id?: string | undefined;
}, {
    title: string;
    content: string;
    id?: string | undefined;
}>;
type updatePostType = z.infer<typeof updatePostInput>;
export { signupInput, signinInput, createPostInput, updatePostInput, SigninType, SignupType, updatePostType, createPostType };
