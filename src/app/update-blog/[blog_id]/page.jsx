"use client";

import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import {fetchExistingBlogData, updateExistingBlog} from '../../../api/blog-manager';
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

function UpdateBlog() {
  const { user } =  useAuth();
  const params = useParams();
  const id = params.blog_id;

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  // Fetch blog by ID 
  useEffect(() => {
    async function fetchBlog() {
      if (!user) return; 

      try {
        const data = await fetchExistingBlogData(user, id);

        if (!data) {
          toast.error("Blog not found");
          setLoading(false);
          return;
        }

        // Only set state if data exists
        setTitle(data.title || "");
        setCategory(data.category || "");
        setShortDesc(data.shortDesc || "");
        setImageUrl(data.imageUrl || "");
        setContent(data.content || "");

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog");
        setLoading(false);
      }
    }

    fetchBlog();
  }, [user, id]);


  // update functionality
  async function handleUpdate() {
    if (
      !title.trim() ||
      !category.trim() ||
      !shortDesc.trim() ||
      !imageUrl.trim() ||
      !content.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }

    const updatedData = {
      title,
      category,
      shortDesc,
      imageUrl,
      content,
    };

    try {
        if(!user) return;
          await updateExistingBlog(user, id, updatedData);
          toast.success("Blog updated successfully!");
    } catch (error) {
          console.error(error);
          toast.error("Failed to update blog");
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Blog</h1>

      {/* Title */}
      <label className="font-semibold">Title</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Category */}
      <label className="font-semibold">Category</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">-- Select Category --</option>
        <option value="Technology">Technology</option>
        <option value="Programming">Programming</option>
        <option value="Web Development">Web Development</option>
        <option value="Mobile Development">Mobile Development</option>
        <option value="AI & Machine Learning">AI & Machine Learning</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Cloud Computing">Cloud Computing</option>
        <option value="DevOps">DevOps</option>
        <option value="Data Science">Data Science</option>
        <option value="Design & UI/UX">Design & UI/UX</option>
        <option value="Productivity">Productivity</option>
        <option value="Career & Job Tips">Career & Job Tips</option>
        <option value="Education">Education</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Personal Growth">Personal Growth</option>
      </select>

      {/* Short Description */}
      <label className="font-semibold">Short Description</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="3"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
      ></textarea>

      {/* Image URL */}
      <label className="font-semibold">Image URL</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* Image Preview */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-64 object-cover rounded mb-4 border"
        />
      )}

      {/* Markdown Editor */}
      <label className="font-semibold">Main Article</label>
      <div data-color-mode="light" className="border rounded mb-4">
        <MDEditor value={content} onChange={setContent} height={400} />
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        className="mt-6 bg-green-600 px-6 py-3 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        Update Article
      </button>
    </div>
  );
}

export default UpdateBlog;
