"use client";

import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });

    // Here you can also send data to an API endpoint
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions or want to get in touch? Fill out the form below.
      </p>

      {submitted && (
        <div className="mb-6 text-center p-4 bg-green-100 text-green-800 rounded">
          Thank you! Your message has been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            className="textarea textarea-bordered w-full h-32"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
