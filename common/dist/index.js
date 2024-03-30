"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
const signupInput = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(8, { message: 'Password must be of 8 characters' })
});
exports.signupInput = signupInput;
const signinInput = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(8, { message: 'Password must be of 8 characters' })
});
exports.signinInput = signinInput;
const createPostInput = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title can't be empty" }),
    content: zod_1.z.string().min(1, { message: 'content cannot be empty' }),
    publishedDate: zod_1.z.date()
});
exports.createPostInput = createPostInput;
const updatePostInput = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title can't be empty" }),
    content: zod_1.z.string().min(1, { message: 'content cannot be empty' }),
    id: zod_1.z.string().optional(),
});
exports.updatePostInput = updatePostInput;
