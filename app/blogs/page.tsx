import Image from "next/image";

type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  status: string;
  views: number;
  isPremium: boolean;
};

type ApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: Post[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

const BlogPage = async () => {
  const response = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const postData: ApiResponse = await response.json();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Latest Blogs</h1>

          <p className="mt-2 text-gray-600">
            Explore our latest articles and tutorials
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postData.data.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-52 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                {/* Status */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {post.status}
                  </span>

                  {post.isFeatured && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900">
                  {post.title}
                </h2>

                {/* Content */}
                <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                  <span>{post.views} views</span>

                  <span
                    className={
                      post.isPremium
                        ? "font-medium text-purple-600"
                        : "text-gray-500"
                    }
                  >
                    {post.isPremium ? "Premium" : "Free"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Info */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Page {postData.meta.page} of {postData.meta.totalPage}
          {" • "}
          Total Posts: {postData.meta.total}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
