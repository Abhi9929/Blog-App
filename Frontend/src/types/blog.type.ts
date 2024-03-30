type Blog = {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    }
    publishedDate: string;
    index?: number;
}

type SingleBlog = {
    title: string;
    content: string;
    publishedDate: string;
    author: {
        name: string;
    }
}

type BlogResponse = {
    loading1: boolean;
    singleBlog: SingleBlog | null;
}

export type { Blog, SingleBlog, BlogResponse };