"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {createBlog} from '../../api/blog-manager';
import {useAuth} from '../../hooks/useAuth';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';


function CreateBlog() {
  const {user} = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function handlePublish() {
    const blogData = {
      title,
      category,
      shortDesc,
      imageUrl,
      content,
    };

    try {
      await createBlog(user, blogData);

    // Clear form fields
    setTitle("");
    setCategory("");
    setShortDesc("");
    setImageUrl("");
    setContent("");
    toast("Blog Published.");
    // router.push(`/profile/${user.uid}`)

    }catch(error) {
      console.log(error.message);
    }

  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Publish New Article</h1>

      {/* Title */}
      <label className="font-semibold">Title</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter blog title"
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
        placeholder="Write a short description..."
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
      ></textarea>

      {/* Image URL */}
      <label className="font-semibold">Image URL</label>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Paste image link..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* Live Image Preview */}
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
        <MDEditor
          value={content}
          onChange={setContent}
          height={400}
        />
      </div>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="mt-6 bg-blue-600 px-6 py-3 text-white rounded hover:bg-blue-700 cursor-pointer">
        Publish Article
      </button>
    </div>
  );
}


export default CreateBlog;