"use client";

import { useEffect, useState } from "react";
import {useAuth} from '../../../hooks/useAuth';
import {getUserBlogs, deletePublishBlog} from '../../../api/blog-manager';
import WideCard from '../../../components/WideCard';
import { toast } from "react-toastify";
import {useLoader} from '../../../hooks/useLoader';



export default function MyBlogsPage() {

  const {user} = useAuth();
  const {showLoader, hideLoader} = useLoader();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's blogs
useEffect(() => {
  if (!user) return;  

  async function fetchBlogs() {
    try {
      showLoader();
      const data = await getUserBlogs(user);
      setBlogs(data || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }

  fetchBlogs();
}, [user]);



  // Handle Delete Blog
  const handleDelete = async (id) => {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await deletePublishBlog(user, id);

      if (!res.ok) {
      const errMsg = await res.json();
      console.error("Failed to delete:", errMsg.message);
      return;
    }

      // Remove deleted blog from UI
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Delete Successful");

    } catch (error) {
      console.error("Error deleting:", error);
    }
  };




  if (loading)
    return <p className="text-center py-10 text-xl font-semibold">Loading...</p>;



  return (

    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">My Published Blogs</h1>

      {
        blogs.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t published any blogs yet.
          </p>
        ) 
        : (
          <div className="space-y-6">
            {
              blogs.map(blog => <WideCard blog={blog} onDelete={handleDelete} key={blog._id}></WideCard>)
            }
          </div>
        )
      }      

    </div>
  );
}
