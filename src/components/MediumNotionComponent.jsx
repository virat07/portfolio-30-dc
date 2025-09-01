import React, { useEffect, useState } from "react";

const MediumNotionComponent = ({ theme = "light" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bharat.gupta1407"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.items) setPosts(data.items);
        else throw new Error("No posts found");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  if (loading) {
    return (
      <div
        className={`text-center py-20 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center py-20 transition-colors duration-300 ${
          theme === "dark" ? "text-red-400" : "text-red-500"
        }`}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-center text-2xl tracking-[15px] uppercase mb-12 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Blog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <a
            key={post.guid}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2
                className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {post.title.length > 60
                  ? post.title.slice(0, 60) + "..."
                  : post.title}
              </h2>
              <p
                className={`flex-1 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {post.description.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>
              <span
                className="mt-4 font-semibold hover:underline text-teal-500"
              >
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MediumNotionComponent;
