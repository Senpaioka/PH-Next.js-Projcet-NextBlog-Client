"use client";

import { useEffect, useState } from "react";
import {getBlogDetails} from '../../../api/blog-manager';
import {useAuth} from '../../../hooks/useAuth';
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import BookmarkButton from "../../../components/BookmarkButton";

function BlogDetailsPage() {

    const params = useParams();
    const id = params.blog_id;
    const {user} = useAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchBlog() {
        try {
        const data = await getBlogDetails(user, id);
        setBlog(data);
        setLoading(false);
        } catch (error) {
        console.error(error);
        }
    }

    if(user) fetchBlog();
    }, [user, id]);



    if (loading)
        return <p className="text-center p-10 text-xl font-semibold">Loading...</p>;

    if (!blog)
        return (
        <p className="text-center p-10 text-red-500 font-semibold">Blog not found.</p>
        );


    return (
        <div className="max-w-4xl mx-auto px-4 md:px-0 py-10">
        
        <div className="py-3">
            <BookmarkButton blogId={id}></BookmarkButton>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 leading-snug">
            {blog.title}
        </h1>

        {/* Short Description */}
        <p className="text-lg text-gray-700 mb-6">{blog.shortDesc}</p>

        {/* Category */}
        <span className="badge badge-primary px-4 py-2 mb-4">
            {blog.category}
        </span>

        {/* Author + Date */}
        <div className="flex items-center gap-3 text-gray-600 mb-6">

            <div className="avatar placeholder">
            <div className="rounded-full w-10">
                <img src={blog.userInfo.photo} alt={blog.displayName} />
            </div>
            </div>

            <div>
            <p className="font-semibold">@{blog.displayName}</p>
            <p className="text-sm">
                Posted at: {new Date(blog.created_at).toLocaleDateString()}
            </p>
            </div>
        </div>

        {/* Featured Image */}
        <img
            src={blog.imageUrl}
            alt="Blog Cover"
            className="w-full rounded-xl shadow mb-8 object-cover max-h-[400px]"/>


        {/* Main Content (Markdown) */}
        <div className="prose prose-lg max-w-none bg-base-200 p-5 md:p-8 rounded-xl">
            <ReactMarkdown>{blog.content}</ReactMarkdown>

            <p className="text-sm text-gray-500 py-8">
                Update at: {new Date(blog.updated_at).toLocaleDateString()}
            </p>
        </div>
        </div>
    );
}

export default BlogDetailsPage;