import { useCallback, useEffect, useState } from "react";

import { apiUrl } from "../../constants";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const response = await fetch(apiUrl);
    const json = await response.json();
    // console.log(json);
    setPosts([json]);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (posts.length > 0)
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  return <p>No posts to show</p>;
}
