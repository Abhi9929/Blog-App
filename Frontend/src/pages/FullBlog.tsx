/* eslint-disable prefer-const */
import { useLocation, useParams } from "react-router-dom"
import { useEffect } from "react";
import BlogCard2 from "../components/blogs/BlogCard2";
import Appbar from "../components/blogs/Appbar";
import { useBlog, useBlogs } from "../hooks";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Avatar from "../components/blogs/Avatar";
import { Blog } from "../types/blog.type";
import { PublishedDate } from "../utils/publishDate";



function FullBlog() {
  let { id } = useParams();
  id = id?.replace(':', '');

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');

  let { loading, blogs } = useBlogs();

  let { loading1, singleBlog } = useBlog(id);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  if (loading1 && !singleBlog) {
    return (<>
      <SkeltonComponent />
    </>)
  }

  if (!Array.isArray(blogs) || loading) {
    return null
      ||
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
      </>);
  }

  blogs = blogs.filter((blog: Blog) => blog.id != id);

  let publishedDate;
  if (singleBlog != null) {
    publishedDate = PublishedDate(singleBlog.publishedDate);
  }

  return (
    <>
      <Appbar />
      <main className='w-full'>
        <div className="w-full lg:max-w-6xl mx-auto mt-10">
          <div className="w-full rounded-sm col-span-12 grid h-fit min-h-96 max-h-[600px] overflow-hidden">
            <img className="h-fulll w-full object-center object-cover rounded-t-sm"
              src={`https://source.unsplash.com/random/?random&${query}`}
              alt=""
            />
          </div>
        </div>
        <div className='px-5 md:px-0 md:max-w-3xl lg:max-w-6xl mx-auto'>
          <div className="w-full grid grid-cols-12 gap-3 mt-10">
            <div className="content col-start-1 col-end-13  lg:col-start-3  lg:col-end-11 grid gap-03 pe-5">
              <h1 className="text-4xl font-bold md:text-5xl leading-tight">{singleBlog?.title}</h1>
            </div>
            <div className="Author mt-4 col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 pb-4">
              <div className="flex items-start gap-2 mt-4">
                <Avatar avatar={singleBlog?.author?.name} />
                <div>
                  <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold capitalize">{singleBlog?.author?.name}</h2>
                  <p className="text-slate-400 mt-1">Posted on {publishedDate}</p>
                </div>
              </div>
            </div>
            <div className="w-full col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 h-[0.5px] rounded-full bg-slate-700" ></div>
            <br />

            <div className="Content col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 text-lg text-slate-800">
              <p className="leading-snug">
                {singleBlog?.content}
              </p>
            </div>
          </div>
          <br />
        </div>
      </main>
      <hr />
      <br />
      <div className="w-full mt-8">
        <div className="w-full px-5 md:px-0 md:max-w-4xl mx-auto justify-between flex flex-wrap gap-16">
          {
            blogs.map((blog: Blog, index: number) => {
              const { id, title, content, author, publishedDate } = blog;
              return (
                <BlogCard2
                  key={id}
                  id={id}
                  index={index}
                  title={title}
                  content={content}
                  author={author}
                  publishedDate={publishedDate}
                />
              )

            })

          }

        </div>
      </div>
    </>
  )
}

function SkeltonComponent() {
  return (<>
    <Appbar />
    <div className='px-5 md:px-0 md:max-w-3xl lg:max-w-6xl mx-auto mt-20'>
      <div className="w-full grid grid-cols-12 gap-3 mt-10">
        <div className="content col-start-1 col-end-13  lg:col-start-3  lg:col-end-11 grid gap-03 pe-5">
          <h1 className="text-4xl font-bold md:text-5xl leading-tight"> <Skeleton /></h1>
        </div>
        <div className="Author mt-4 col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 pb-4">
          <div className="flex items-start gap-2 mt-4">
            <div className="profile-pic w-7 h-7 rounded-full bg-gray-400"></div>
            <div>
              <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold capitalize"><Skeleton /></h2>
              <p className="text-slate-400 mt-1">Posted on xx/xx/xxxx</p>
            </div>
          </div>
        </div>
        <div className="w-full col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 h-[0.5px] rounded-full bg-slate-700" ></div>
        <br />

        <div className="Content col-start-1 col-end-13 lg:col-start-3  lg:col-end-11 text-lg text-slate-800">
          <p className="leading-snug">
            <Skeleton count={10} />
            <br />
          </p>
        </div>
      </div>
      <br />
    </div>
  </>)
}

export default FullBlog 