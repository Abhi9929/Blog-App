/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

function TextBox() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const date = new Date().toISOString();

    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const titleBox = titleRef.current;
        const descBox = contentRef.current;

        //@ts-expect-error
        titleBox?.classList.remove('border-red-400');
        //@ts-expect-error
        descBox?.classList.remove('border-red-400');
    }, [title, description])

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const publishBlog = async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
                publishedDate: date
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage?.getItem("token") || '')}`
                }
            });
            console.log(response.data);

            navigate(`/blog/${response.data.id}`)
        }
        const titleBox = titleRef.current;
        const descBox = contentRef.current;
        if (title.length == 0) {
            //@ts-expect-error
            titleBox?.classList.add('border-red-400')
            return;
        }
        
        if (description.length == 0) {
            //@ts-expect-error
            descBox?.classList.remove('border-red-400')
            //@ts-expect-error
            descBox?.classList.add('border-red-400')
            return;
        }
        else {
            publishBlog()
        }
    }
    return (
        <>
            <div className="flex flex-col w-full ms-2">
                <input
                    type="text"
                    ref={titleRef}
                    className="w-full h-[75px] text-3xl sm:text-4xl rounded-lg px-2 bg-gray-50 border border-gray-300 outline-none text-zinc-900 py-2" placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <TextEditor
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    reference={contentRef}
                />
                <button
                    onClick={handleClick}
                    type="submit" className="mt-2 w-fit items-center px-5 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </>
    )
}

function TextEditor({ onChange, reference }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, reference: any }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border rounded-lg bg-gray-50 border-gray-300"
                ref={reference}

            >
                <div className="rounded-b-lg w-full pe-[2px]">
                    <label className="sr-only">Publish post</label>
                    <textarea id="editor" rows={8}
                        className="py-2 rounded-lg focus:outline-none block w-full px-0 text-gray-800 pl-2 text-lg  bg-gray-50" placeholder="Write an article..."
                        onChange={onChange}
                        required />
                </div>
                <style>
                    {`#editor::-webkit-scrollbar {
                        width: 15px;
                        }`
                    }
                </style>
            </div>
        </div>
    </div>
}
export default TextBox