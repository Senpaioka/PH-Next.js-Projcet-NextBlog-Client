"use client";

import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useLoader } from "../../hooks/useLoader";
import PrivateRoute from "../../context/PrivateRoute";
import BlogCard from "../../components/BlogCard";

function ProfilePageContent() {
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchUserBlogs() {
      showLoader();
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch your blogs");

        const data = await res.json();
        setUserBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    }

    fetchUserBlogs();
  }, [user]);


  console.log(user)


  if (!user) return

  if (loading) return <p className="text-center p-10 text-xl font-semibold">Loading...</p>;

  return (
    <div className="w-10/12 mx-auto py-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <div className="avatar">
          <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden">
            <img src={user.photoURL || "/default-avatar.png"} alt={user.displayName} />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{user.displayName || "Anonymous"}</h1>
          <p className="text-gray-500">{user.providerData[0].email}</p>
          <p className="mt-2 text-gray-800 text-xl">
            Welcome to your profile! Here you can see all your published blogs and other information.
          </p>
        </div>

      </div>

      {/* User Blogs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">My Published Blogs</h2>
        {loading && (
          <p className="text-center text-xl font-semibold py-10">Loading...</p>
        )}

        {!loading && userBlogs.length === 0 && (
          <p className="text-center text-gray-500 font-semibold py-10">
            You haven’t published any blogs yet.
          </p>
        )}

        {!loading && userBlogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfilePageContent />
    </PrivateRoute>
  );
}
