import { useEffect } from "react";
import { QuoteCard } from "./../components/QuoteCard";
import { useState } from "react";
import { Button } from "../components/Button";

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
        <Button handleOnClick={handleFetchPosts} label="Fetch posts" />
        <Button handleOnClick={handleClearPosts} label="Clear posts" />
        <Button handleOnClick={handleToggle} label="Togle" />
      </div>

      {posts && posts.length > 0 ? (
        posts.map(
          (post: {
            body: string;
            title: string;
            id: number;
            userId: number;
          }) => (
            <QuoteCard key={post.id} quote={post.body} author={post.title} />
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
