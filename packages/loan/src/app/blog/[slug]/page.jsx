import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { CommentSection } from "kifanga-ui-comments";

import { getPost, getPosts } from "@/ssr-functions";
import { BASE_URL, BLOG_NAME } from "@/helpers";

export async function generateMetadata({ params }) {
  try {
    const post = await getPost(params.slug);
    if (!post) {
        return {
          title: "Not Found",
          description: "The page you are looking for does not exist.",
        };
    }

    if (!post || !post.data || !post.data.item) notFound();


    const { title, snippet, image, slug, created_at, author, categories, tags } = post.data.item;

    return {
      title: title,
      description: snippet,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      category: [categories.map(category => category.name)],
      openGraph: {
        siteName: `${BLOG_NAME}`,
        url: `/blog/${slug}`,
        locale: 'en_US',
        type: 'article',
        publishedTime: `${created_at}`,
        authors: [`${author}`],
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export async function generateStaticParams() {
  const posts = await getPosts();

  if (!posts || !Array.isArray(posts.data) || !posts.data.item) {
    return [];
  }

  const { item } = posts.data;

  return item.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPost = async ({ params }) => {
  const postResponse = await getPost(params.slug);

  if (!postResponse || !postResponse.data || !postResponse.data.item) notFound();

  const { item, other } = postResponse.data;

  const { title, content, image, created_at, author, id } = item;


  return (
    <div className={`container mx-auto px-4`}>
      <main className="space-y-8">
        <Suspense fallback={<p>Loading feed...</p>}>
          <div className="flex flex-col items-center mb-8">
            <header className="flex flex-col items-center py-8 border-b border-gray-200 dark:border-gray-300">
              <h1 className="prose text-4xl font-bold text-left mb-4">{title}</h1>
              <div className="flex flex-wrap justify-center text-md">
                <p className="text-gray-500 font-semibold">
                  {new Date(created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="ml-4 text-green-500 font-semibold">by {`${author}`}</p>
              </div>
            </header>
            <div className="w-full lg:w-2/3">
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div
                className="prose prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </Suspense>

        <section className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <CommentSection url={BASE_URL} postId={id} />
          </div>
        </section>
        
        <Suspense fallback={<p>Loading feed...</p>}>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Related Posts</h2>
            <div className="space-y-8">
              {other?.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto w-full">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3 p-4">
                      <Link href={`/blog/${item.slug}`}>
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                      </Link>
                      <p className="text-gray-700">{item.snippet}</p>
                      <div className="flex flex-wrap mt-4 space-x-2">
                          {item.categories.slice(0, 2).map((category) => (
                              <Link href={`/blog/category/${category.slug}`} key={category.id}>
                                  <span className="bg-green-100 text-green-800 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 text-md font-bold py-1 px-2 rounded-full">
                                      {category.name}
                                  </span>
                              </Link>
                          ))}
                          {item.tags.slice(0, 2).map((tag) => (
                              <Link href={`/blog/tag/${tag.slug}`} key={tag.id}>
                                  <span className="bg-green-100 text-green-800 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 text-md font-bold py-1 px-2 rounded-full">
                                      {tag.name}
                                  </span>
                              </Link>
                          ))}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">{`${author}`}</p>
                    </div>
                    <div className="w-full lg:w-1/3">
                      <Link href={`/blog/${item.slug}`}>
                        <img src={item.image} alt={title.title} className="w-full h-40 object-cover" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default BlogPost;