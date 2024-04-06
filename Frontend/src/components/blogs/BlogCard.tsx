/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Blog } from '../../types/blog.type'
import { PublishedDate } from '../../utils/publishDate'


function BlogCard({ id, title, content, author, index, publishedDate }: Blog) {

    const publishDate = PublishedDate(publishedDate);
    return (
        <>
            <div key={id} className="w-full mb-8  sm:mb-5 h-auto  sm:h-[168px] overflow-hidden">
                <Link to={`/blog/:${id}?q=${index}`} className=" cursor-pointer grid gap-2 sm:gap-6 h-full grid-cols-12">
                    <div className="col-span-12 sm:col-span-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <Avatar avatar={author.name} />
                                <div className="Writer font-semibold">
                                    <h4>
                                        {author.name}.
                                    </h4>
                                </div>
                            </div>
                            <h2 className="text-[16px] title font-bold sm:text-lg md:text-2xl">{title}</h2>
                            <p className="text-sm content md:block text-slate-600 sm:text-base">
                                {content.split('.')[0]}.
                            </p>
                            <p className="text-zinc-900 text-sm mt-1">{publishDate}</p>
                        </div>
                    </div>
                    <div className="image h-[350px] col-span-12 sm:col-span-4 bg-slate-200 overflow-hidden -order-1 sm:order-1">
                        <img alt="random" className='h-full w-full object-cover object-center rounded-lg' src={`https://source.unsplash.com/random/?random&${index}`} />
                    </div>
                </Link>
            </div>

        </>
    )
}

// function Info({ author }: { author: string }) {
//     return (
//         <div className="flex gap-2 items-center">
//             <Avatar avatar={author} />
//             <AuthorName author={author} />
//         </div>
//     )
// }

// function AuthorName({ author }: { author: string }) {
//     return (
//         <div className="Writer font-semibold">
//             <h4>
//                 {author}.
//             </h4>
//         </div>
//     )
// }

// function Title({ title }: { title: string }) {
//     return (
//         <h2 className="title font-bold text-lg md:text-2xl">{title}</h2>
//     )
// }

// function Content({ content }: { content: string }) {
//     return (
//         <>
//             <p className="content md:block text-slate-600 text-base">
//                 {content.split('.')[0]}.
//             </p>
//         </>
//     )
// }

// function PublishedDate({ pubDate }: { pubDate: string }) {
//     return (
//         <p className="text-slate-600 text-sm">{pubDate}</p>
//     )
// }
export default BlogCard