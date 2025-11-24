"use client";

import { useState } from "react";

function BlogFilter({ categories = [], onSearch, onSort }) {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onSort && onSort(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch && onSearch(e.target.value);
    };

  return (

    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 mb-6">
        {/* Sort by Category */}
        <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="font-semibold">Sort by Category:</label>
            <select
            className="select select-bordered w-full md:w-60"
            value={selectedCategory}
            onChange={handleCategoryChange}
            >
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
                </option>
            ))}
            </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="font-semibold">Search:</label>
            <input
            type="text"
            className="input input-bordered w-full md:w-60"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </div>
    </div>
  );
}

export default BlogFilter;

