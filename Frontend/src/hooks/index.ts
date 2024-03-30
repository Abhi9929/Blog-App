/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { Blog, BlogResponse, SingleBlog } from "../types/blog.type";
import { ID } from "../types/other.type";
import { User } from "../types/auth.types";



export const useGetUser = () => {
    const [userDetails, setUserDetails] = useState<User>();;
    
    useEffect(() => {        
        async function getUserDetails() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") ?? '')}`
                    }
                })
                const data = (await response).data;
                
                setUserDetails(data);
            } catch (error) {
                console.log("error occurs: ", error);
            }
        }
        getUserDetails()
    }, [])

    return { userDetails };
}

export const useBlog = (id?: ID): BlogResponse => {
    const [loading1, setLoading] = useState<boolean>(true);
    const [singleBlog, setSingleBlog] = useState<SingleBlog | null>(null);;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        async function getBlog() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
                const data = (await response).data;

                if (isMounted) {
                    setLoading(false);
                    setSingleBlog(data);
                }
            } catch (error) {
                console.log("error occurs: ", error);
            }
        }
        getBlog();

        return () => {
            isMounted = false;
        }
    }, [id])


    return { loading1, singleBlog }
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)

                const data = (await response).data;
                setloading(false)
                setBlogs(data)
            } catch (error) {
                console.log(error);
            }
        }

        getBlogs();
    }, [])

    return {loading, blogs}
}