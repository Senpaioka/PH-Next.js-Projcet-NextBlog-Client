"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BlogCard from "../../components/BlogCard";
import {useLoader} from '../../hooks/useLoader';
import PrivateRoute from '../../context/PrivateRoute'; 

function BookmarksPageContent() {
  const { user } = useAuth();
  const {showLoader, hideLoader} = useLoader()
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchBookmarks() {
      showLoader();
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/saved-blog`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookmarks");

        const data = await res.json();
        setBookmarkedBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    }

    fetchBookmarks();
  }, [user]);

  if (!user) return

  if (loading) return <p className="text-center p-10 text-xl font-semibold">Loading...</p>;

  if (bookmarkedBlogs.length === 0)
    return <p className="text-center p-10 text-gray-500 font-semibold">No bookmarked blogs found.</p>;

  return (
    <div className="w-10/12 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {bookmarkedBlogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
}


export default function BookmarksPage() {
  return (
    <PrivateRoute>
      <BookmarksPageContent />
    </PrivateRoute>
  );
}
