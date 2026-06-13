import React, { useEffect, useState } from "react";

const MediumNotionComponent = ({ theme = "light", isDrawer = false }) => {
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

  if (isDrawer) {
    return (
      <div className="w-full transition-colors duration-300">
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <a
              key={post.guid}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border p-4 flex flex-col sm:flex-row gap-4 transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark" 
                  ? "bg-slate-900/40 border-slate-800/80 hover:border-emerald-500/40 text-white" 
                  : "bg-white border-slate-200 hover:border-blue-500/40 text-slate-800"
              }`}
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full sm:w-24 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className={`text-xs font-bold mb-1 line-clamp-2 transition-colors duration-300 hover:text-emerald-400 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-[10px] leading-relaxed line-clamp-2 ${
                    theme === "dark" ? "text-gray-400" : "text-slate-500"
                  }`}>
                    {post.description.replace(/<[^>]+>/g, "")}
                  </p>
                </div>
                <span className={`text-[9px] font-bold mt-2 flex items-center gap-1 ${
                  theme === "dark" ? "text-emerald-400" : "text-blue-600"
                }`}>
                  Read Article &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
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
