import { useBlogs } from "../../hooks"
import { Blog } from "../../types/blog.type";
import BlogCard from "./BlogCard"




function Main() {
    const { loading, blogs } = useBlogs();


    

    if (!Array.isArray(blogs) || loading) {
        return null ||
            (<>
                <div className='h-auto w-full flex justify-center items-start mt-20'>
                    <div
                        className=""
                        style={{
                            width: '50px',
                            aspectRatio: '1',
                            borderRadius: '50%',
                            background: 'radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, #ffa516)',
                            WebkitMask: 'radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)',
                            animation: 'l13 1s infinite linear',
                        }}
                    >
                    </div>
                </div>
                <style>{`
                    @keyframes l13 {
                        100% { transform: rotate(1turn) }
                    }
                    `}</style>
            </>); // or return a loading indicator
    }

    return (
        <main className='w-full'>
            <div className='flex justify-center flex-col gap-4 md:gap-10 px-5 md:px-0 md:max-w-3xl lg:max-w-4xl mx-auto mt-14'>
                {blogs.map((blog: Blog, index: number) => {
                    const { id, title, content, author, publishedDate } = blog;
                    // const authorName = author.name
                    return (
                        <BlogCard
                            key={id}
                            id={id}
                            index={index}
                            title={title}
                            content={content}
                            author={author}
                            publishedDate={publishedDate}
                        />
                    )

                })}
            </div>
        </main>
    )
}

export default Main