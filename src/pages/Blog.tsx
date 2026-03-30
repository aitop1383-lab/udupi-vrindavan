import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://d7v.021.myftpupload.com/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blogs</h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h2
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h2>

          <div
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Blog;