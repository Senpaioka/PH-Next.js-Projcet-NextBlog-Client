"use client";

import Link from "next/link";
import {getArticles} from '../api/blog-manager';
import { useState, useEffect } from "react";
import {useLoader} from '../hooks/useLoader';

function HomePage() {

  const {showLoader, hideLoader} = useLoader();
  const [latestBlog, setLatestBlog] = useState([]);


  useEffect(() => {
    async function fetchLatestBlog(){
      try {
        showLoader();
        const data = await getArticles();
        hideLoader();
        // Only take the first 3
        const topThree = data.slice(0, 3);
        setLatestBlog(topThree);
      }catch(error){
        console.log(error.message);
      }
    }
    fetchLatestBlog();
  },[])

  return (

    <div className="w-full">

      {/*  Hero Section */}
      <section className="relative py-44 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 w-10/12 mx-auto text-center">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Welcome to <span className="text-primary bg-gray-400">NextBlog</span>
          </h1>

          <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-200">
            Explore tutorials, insights, and deep-dives written by developers for developers.
          </p>

          <Link href="/articles">
            <button className="btn btn-primary mt-6 px-8">Browse Articles</button>
          </Link>
        </div>
      </section>


      {/* 2️⃣ Trending Categories */}
      <section className="w-10/12 mx-auto py-16">
        <h2 className="text-3xl font-bold mb-6">Trending Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "Programming",
            "AI & ML",
            "Web Development",
            "Cybersecurity",
            "Technology",
            "Productivity",
          ].map((cat) => (
            <div key={cat} className="p-5 bg-base-200 rounded-lg text-center hover:bg-primary hover:text-white cursor-pointer transition">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* 3️⃣ Latest Articles Preview */}
      <section className="bg-base-100 py-16">
        <div className="w-10/12 mx-auto">
          <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            { latestBlog.map((blog) => (
              <div key={blog._id} className="card bg-base-200 shadow hover:shadow-xl transition">
                <figure>
                  <img src={blog.imageUrl} alt={blog.title} className="h-48 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="text-gray-600">{blog.shortDesc}</p>
                  <Link href={`/blog/${blog._id}`} className="text-primary font-semibold">
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Why Choose Us */}
      <section className="w-10/12 mx-auto py-16">
        <h2 className="text-3xl font-bold mb-6">Why Choose NextBlog?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "High Quality Content", desc: "Written by real developers with real-world experience." },
            { title: "Always Updated", desc: "We publish fresh content every week." },
            { title: "Community Driven", desc: "Users can publish, bookmark, and join the community." },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-base-200 rounded-xl border border-primary">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ Featured Authors */}
      <section className="bg-base-100 py-16">
        <div className="w-10/12 mx-auto">
          <h2 className="text-3xl font-bold mb-6">Top Authors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
            { displayName: "John Doe", topic: "Writes about tech and programming.", imgUrl: "https://i.ibb.co.com/prb9HMbM/face6.jpg"},
            { displayName: "Sakura", topic: "Writes about AI and career uplifting.", imgUrl: "https://i.ibb.co.com/HDSL2pZ6/face7.jpg"},
            { displayName: "Alex Smith", topic: "Writes about Web Development and CyberSecurity.", imgUrl: "https://i.ibb.co.com/23GY5qB5/face5.jpg"},
            ].map((info, i) => (
              <div key={i} className="card p-6 bg-base-200 shadow text-center">
                <div className="avatar mx-auto mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={info.imgUrl} alt={`Author: ${info.displayName}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{info.displayName}</h3>
                <p className="text-gray-600">{info.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Newsletter Signup */}
      <section className="w-10/12 mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get the latest articles delivered straight to your inbox.</p>

        <div className="flex justify-center gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-72"
          />
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </section>

      {/* 7️⃣ Testimonials */}
      <section className="bg-base-200 py-16">
        <div className="w-10/12 mx-auto">
          <h2 className="text-3xl font-bold mb-8">What Readers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "This blog helped me start web development!",
              "Clean tutorials and helpful community.",
              "My go-to place for dev content!",
            ].map((text, i) => (
              <div key={i} className="p-6 bg-base-100 rounded-xl shadow">
                <p className="text-gray-700">“{text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8️⃣ Footer CTA */}
      <section className="py-16 text-center bg-primary text-white">
        <h2 className="text-4xl font-bold mb-4">Start Your Developer Journey</h2>
        <p className="text-lg mb-6">Publish articles, learn new skills, and grow your presence.</p>

        <Link href="/blog">
          <button className="btn btn-white text-primary">Write Your First Blog</button>
        </Link>
      </section>

    </div>
  );
}

export default HomePage;
