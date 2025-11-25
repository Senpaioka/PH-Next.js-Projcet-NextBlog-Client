import Link from "next/link";


function WideCard({blog, onDelete}) {


  return (

    <div className="card card-bordered bg-base-100 shadow-xl p-6 flex flex-col md:flex-row gap-4">
        
        {/* Blog Thumbnail */}
        <figure className="w-full md:w-1/3">
        <img
            src={blog.imageUrl}
            alt={blog.title}
            className="rounded-lg h-full object-cover"
        />
        </figure>

        {/* Blog Content */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
                {blog.shortDesc}
            </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3 flex-wrap">
            <Link href={`/blog/${blog._id}`} className="btn btn-primary">
            View
            </Link>

            <Link
            href={`/update-blog/${blog._id}`}
            className="btn btn-warning">
            Update
            </Link>

            <button
            onClick={() => onDelete(blog._id)}
            className="btn btn-error">
            Delete
            </button>
        </div>

        </div>
    </div>
  );
}

export default WideCard;