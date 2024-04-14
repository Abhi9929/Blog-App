/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Blog } from '../../types/blog.type'
import { PublishedDate, extractFirst15Words } from '../../utils/publishDate'


function BlogCard({ id, title, content, author, index, publishedDate }: Blog) {
    content = extractFirst15Words(content);
    const publishDate = PublishedDate(publishedDate);
    return (
        <>
            <div key={id} className="w-full mb-10  sm:mb-5 sm:max-h-[200px] overflow-hidden">
                <Link to={`/blog/:${id}?q=${index}`} className=" grid gap-2 sm:gap-6 h-full grid-cols-12">
                    <div className="col-span-12 sm:col-span-8">
                        <div className="flex flex-col gap-2 relative h-full">
                            <div className="flex gap-2 items-center">
                                <Avatar avatar={author.name} />
                                <div className="Writer font-semibold">
                                    <h4>
                                        {author.name}.
                                    </h4>
                                </div>
                            </div>
                            <h2 className="text-[16px] title font-bold sm:text-[18px] md:text-2xl leading-tight">{title}</h2>
                            <p className="text-sm content md:block text-slate-600 sm:text-base">
                                {content}...
                            </p>
                            <p className="text-zinc-900 text-sm mt-1"> <span className='font-semibold'>posted on:</span> {publishDate}</p>
                        </div>
                    </div>
                    <div className="image h-[350px] sm:h-full col-span-12 sm:col-span-4 bg-slate-200 overflow-hidden -order-1 sm:order-1">
                        <img alt="random" className='h-full w-full object-cover object-center rounded-lg' src={`https://source.unsplash.com/random/?random&${index}`} />
                    </div>
                </Link>
            </div>

        </>
    )
}

export default BlogCard