"use client";

import { useState, useEffect } from 'react';
import { getArticles } from '../../api/blog-manager';
import BlogCard from '../../components/BlogCard';
import BlogFilter from '../../components/BlogFilter';
import {useLoader} from '../../hooks/useLoader';

function Articles() {

  const {showLoader, hideLoader} = useLoader();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);



  // BlogFilter handlers
  const handleSort = (value) => setSortBy(value);
  const handleSearch = (value) => setSearch(value);

  // Fetch blogs
    useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        showLoader(); // show loader at start
        const data = await getArticles();
        setBlogs(data);
        setCategories([...new Set(data.map(blog => blog.category))]);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        hideLoader(); // always hide loader
        setLoading(false)
      }
    };

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


  if (loading) return <p className="text-center p-10 text-xl font-semibold">Loading...</p>

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
