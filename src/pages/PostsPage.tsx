import { useEffect } from "react";
import { QuoteCard } from "./../components/QuoteCard";
import { useState } from "react";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  useEffect(() => {
    console.log("Toggle button clicked!", toggle);
  }, [toggle]);

  function handleFetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }

  function handleClearPosts() {
    setPosts([]);
  }

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <main>
      <div className="flex justify-center gap-10 my-4">
        <button
          onClick={handleFetchPosts}
          className="text-gray-50 p-2 border rounded bg-gray-600"
        >
          Fetch posts
        </button>
        <button
          onClick={handleClearPosts}
          className="text-gray-50 p-2 border rounded bg-gray-600"
        >
          Clear posts
        </button>
        <button
          onClick={handleToggle}
          className="text-gray-50 p-2 border rounded bg-gray-600"
        >
          Togle
        </button>
      </div>

      {posts && posts.length > 0 ? (
        posts.map(
          (post: {
            body: string;
            title: string;
            id: number;
            userId: number;
          }) => (
            <QuoteCard
              key={post.id}
              quote={post.body}
              author={post.title}
              likedBy={0}
            />
          ),
        )
      ) : (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto">
          No posts found
        </p>
      )}
    </main>
  );
};
