"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// icons
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";



function BookmarkButton({ blogId }) {

    const { user } = useAuth();
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        if (!user) return;

        async function fetchBookmarks() {
        const res = await fetch(`${BASE_URL}/bookmarks`, {
            headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        });
        const data = await res.json();
        setBookmarked(data.some(b => b.blogId === blogId));
        }

        fetchBookmarks();
    }, [user, blogId]);



    const toggleBookmark = async () => {
        if (!user) return

        const token = await user.getIdToken();
        const method = bookmarked ? "DELETE" : "POST";

        const res = await fetch(`${BASE_URL}/bookmark/${blogId}`,
        {
            method,
            headers: { Authorization: `Bearer ${token}` },
        }
        );

        // if (res.ok) setBookmarked(!bookmarked);

        if (res.ok) {
            setBookmarked(!bookmarked);
            toast.success(bookmarked ? "Removed from bookmarks!" : "Bookmarked!");
      } else {
            toast.error("Something went wrong.");
      }

    };

    return (
        <button
        onClick={toggleBookmark}
        className={`px-4 py-2 rounded cursor-pointer btn-ghost ${
            bookmarked ? "bg-green-400 text-black" : "bg-yellow-400 text-gray-800"
        }`}
        >
        {bookmarked ? <FaBookmark></FaBookmark> : <FaRegBookmark></FaRegBookmark>}
        </button>
    );
    }

export default BookmarkButton;
