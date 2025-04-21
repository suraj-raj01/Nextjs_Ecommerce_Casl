'use client'
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/userinfo", {
        title,
        content,
      });
      console.log("Post created:", response.data);
      // Clear form
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1>Create Post (with Axios)</h1>
      <form onSubmit={handleSubmit} className="max-w-2/4 bg-gray-400 m-auto p-5">
        <input
          type="text"
          placeholder="your title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 mt-2 border-1"
        />
        <br />
        <textarea
          placeholder="your content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="p-2 mt-2 border-1"
        />
        <br />
        <button type="submit" className="p-2 mt-2 border-1">Submit</button>
      </form>
    </div>
  );
}
