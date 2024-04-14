import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { Blog } from '../../types/blog.type';
import { PublishedDate, extractFirst25Words } from '../../utils/publishDate';



function BlogCard2({ id, title, content, author, index, publishedDate }: Blog) {
    const formattedDate = PublishedDate(publishedDate);
    content = extractFirst25Words(content);
    return (
        <>
            <div key={id} className="w-full md:max-w-sm bg-white border-slate-100 border rounded-lg">
                <div className='h-[380px] md:h-[270px] w-full overflow-hidden'>
                    <Link to={`/blog/:${id}?q=${index}`}
                        className=''
                    >
                        <img className=" rounded-t-lg
                                " src={`https://source.unsplash.com/random/?random&${index}`} alt="" width={'100%'}
                            height={'100%'}
                        />
                    </Link>
                </div>
                <div className='mt-5 px-5 text-[18px] text-black flex items-center gap-1'>
                    <Avatar avatar={author?.name} />
                    <span> {author.name}.</span>
                </div>
                <div className="pt-5 pb-2 px-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{content}...</p>
                    <Link to={`/blog/:${id}?q=${index}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <div className='mt-2 text-sm text-zinc-900 ps-1 '>
                        <span className='font-semibold'> posted on: </span> {formattedDate}
                    </div>
                </div>
            </div>
        </>
    )
}


export default BlogCard2