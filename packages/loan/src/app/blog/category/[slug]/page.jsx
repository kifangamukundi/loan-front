import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getCategory, searchPostsByCategory } from "@/ssr-functions";
import { BLOG_NAME } from "@/helpers";

import { LimitSelector, PageSelector, SearchBar, SortSelector } from "kifanga-ui-query";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const category = await getCategory(params.slug);
    if (!category) {
        return {
          title: "Not Found",
          description: "The page you are looking for does not exist.",
        };
    }

    if (!category || !category.data || !category.data.item) notFound();


    const { title, snippet, slug } = category.data.item;

    return {
      title: title,
      description: snippet,
      alternates: {
        canonical: `/blog/category/${slug}`,
      },
      openGraph: {
        siteName: `${BLOG_NAME}`,
        url: `/blog/category/${slug}`,
        locale: 'en_US',
        type: 'website',
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
  const categories = await getCategories();

  if (!categories || !Array.isArray(categories.data) || !categories.data.item) {
    return [];
  }

  const { item } = categories.data;

  return item.map((category) => ({
    slug: category.slug,
  }));
}

const Category = async ({ searchParams, params }) => {
  const { filters = {}, sortOrder = '', page = 1, limit = 10, search = '' } = searchParams;

  const { slug } = params

  let data;

  try {
    data = await searchPostsByCategory({ slug, filters, sortOrder, page, limit, search });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return notFound();
  }

  if (!data) {
    return notFound();
  }

  const { items, totalCount, count } = data.data;

  return (
    <div className="container mx-auto px-4 md:px-8">
      <main className="space-y-12 my-6">
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Latest Posts</h2>

            <div className="mb-6 flex justify-center">
                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-md max-w-3xl w-full">
                    <SearchBar />
                    <SortSelector />
                    <LimitSelector />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
                <div className="flex-1 space-y-8">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col lg:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
                            <div className="w-full lg:w-2/3 p-4 space-y-4">
                                <Link href={`/blog/${item.slug}`}>
                                    <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">{item.title}</h3>
                                </Link>
                                <p className="text-gray-600">{item.snippet}</p>
                                <div className="flex flex-wrap mt-4 space-x-2">
                                    {item.categories.map((category) => (
                                        <Link href={`/blog/category/${category.slug}`} key={category.id}>
                                            <span className="bg-orange-100 text-orange-800 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-md font-bold py-1 px-2 rounded-full">
                                                {category.name}
                                            </span>
                                        </Link>
                                    ))}
                                    {item.tags.map((tag) => (
                                        <Link href={`/blog/tag/${tag.slug}`} key={tag.id}>
                                            <span className="bg-orange-100 text-orange-800 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-md font-bold py-1 px-2 rounded-full">
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
                                <p className="text-gray-500 text-sm">{item.author}</p>
                            </div>
                            <div className="w-full lg:w-1/3">
                                <Link href={`/blog/${item.slug}`}>
                                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-br-lg lg:rounded-br-none lg:rounded-tr-lg" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    <PageSelector totalCount={totalCount} limit={limit} /> 
                </div>

                <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect with Us</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">Follow us on social media to stay informed:</p>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com" className="text-blue-600 hover:text-blue-700">
                                    Twitter
                                </a>
                                <a href="https://facebook.com" className="text-blue-600 hover:text-blue-700">
                                    Facebook
                                </a>
                                <a href="https://instagram.com" className="text-blue-600 hover:text-blue-700">
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
      
        </section>

      </main>
    </div>
  );
};

export default Category;