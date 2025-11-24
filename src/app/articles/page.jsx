"use client";

import { useState, useEffect } from 'react';
import { getArticles } from '../../api/blog-manager';
import BlogCard from '../../components/BlogCard';
import BlogFilter from '../../components/BlogFilter';

function Articles() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // BlogFilter handlers
  const handleSort = (value) => setSortBy(value);
  const handleSearch = (value) => setSearch(value);

  // Fetch blogs
  useEffect(() => {
    async function fetchBlogs() {
      const data = await getArticles();
      setBlogs(data);
      setCategories([...new Set(data.map(blog => blog.category))]);
      setFilteredBlogs(data); // initially show all blogs
    }
    fetchBlogs();
  }, []);

  // Filter blogs based on sort and search
  useEffect(() => {
    const filtered = blogs.filter(blog => {
      const matchCategory = sortBy ? blog.category === sortBy : true;
      const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    Promise.resolve().then(() => setFilteredBlogs(filtered));
  }, [blogs, sortBy, search]);

  return (
    <div className='w-10/12 mx-auto'>
      <BlogFilter 
        categories={categories} 
        onSort={handleSort} 
        onSearch={handleSearch} 
      />

      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-[100px]">
          {filteredBlogs.map(blog => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl font-semibold text-gray-500 my-20">
          No blogs found.
        </p>
      )}
    </div>
  );
}

export default Articles;
