import React, { useEffect, useState } from "react";

const MediumNotionComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bharat.gupta1407"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.items) {
          setPosts(data.items);
        } else {
          throw new Error("No posts found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-full px-10  py-10 mx-auto">
      <h1 className="text-center mt-10 uppercase tracking-[20px] text-gray-500 text-2xl">
        Blog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {posts.map((post) => (
          <div
            key={post.guid}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </a>
              </h2>
              <p className="text-gray-700">
                {post.description.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediumNotionComponent;
