"use client";

import Link from "next/link";

function BlogCard({ blog }) {
  const { _id, title, category, shortDesc, imageUrl, displayName, updated_at } =
    blog;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-xl">
      <figure className="h-52 w-full overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition"
        />
      </figure>

      <div className="card-body space-y-3">
        {/* Category */}
        <div className="badge badge-primary px-4 py-3 text-white">
          {category}
        </div>

        {/* Title */}
        <h2 className="card-title line-clamp-2">{title}</h2>

        {/* Short Description */}
        <p className="text-gray-600 line-clamp-3">{shortDesc}</p>

        {/* Author + Date */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>By {displayName}</span>
          <span>{new Date(updated_at).toLocaleDateString()}</span>
        </div>

        {/* Button */}
        <div className="card-actions justify-end">
          <Link
            href={`/blog/${_id}`}
            className="btn btn-sm btn-outline btn-primary rounded-lg"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}


export default BlogCard;