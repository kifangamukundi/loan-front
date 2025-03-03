import { notFound } from "next/navigation";
import Link from "next/link";
import { searchPosts } from "@/ssr-functions";
import { BLOG_NAME } from "@/helpers";

import { LimitSelector, PageSelector, SearchBar, SortSelector } from "kifanga-ui-query";

export const metadata = {
  title: `${BLOG_NAME}`,
  description: 'Explore our blog dedicated to improving the lives and working conditions of African migrants. We share data-driven insights, personal stories, and actionable resources to foster community support and drive positive change. Join us in making a difference!',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    siteName: `${BLOG_NAME}`,
    url: '/blog',
    locale: 'en_US',
    type: 'website',
  }
};

const Blog = async ({ searchParams }) => {
  const { filters = {}, sortOrder = '', page = 1, limit = 10, search = '' } = searchParams;

  let data;

  try {
    data = await searchPosts({ filters, sortOrder, page, limit, search });
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
        <section className="flex flex-col lg:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="w-full lg:w-2/3 p-6 space-y-4">
                <Link href={`/join`}>
                    <h2 className="text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        Empower African Migrants in the Middle East—Join the Movement Today!
                    </h2>
                </Link>
                <p className="text-gray-600">
                    Your participation can make a real difference in the lives of African migrants. Discover how you can help.
                </p>
                <p className="text-gray-500 text-sm">
                    Make an impact by joining the cause and supporting our mission. Let’s work together for a brighter future.
                </p>
                <div className="mt-4">
                    <Link href="/join" className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Get Involved Now
                    </Link>
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center items-center">
                <Link href="/join">
                    <img
                        src="https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_1280.jpg"
                        alt="Empower Migrants"
                        className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    />
                </Link>
            </div>
        </section>

       
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
                                    {item.categories.slice(0, 3).map((category) => (
                                        <Link href={`/blog/category/${category.slug}`} key={category.id}>
                                            <span className="bg-green-100 text-green-800 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 text-md font-bold py-1 px-2 rounded-full">
                                                {category.name}
                                            </span>
                                        </Link>
                                    ))}
                                    {item.tags.slice(0, 3).map((tag) => (
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
                {/* <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore More Resources</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/blog/1" className="text-blue-600 hover:underline">
                                    The Impact of Migrant Support: A Deep Dive
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/2" className="text-blue-600 hover:underline">
                                    How We Can All Make a Difference in the Lives of Migrants
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/3" className="text-blue-600 hover:underline">
                                    Understanding the Challenges Faced by Migrants in the Middle East
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside> */}

                {/* <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay Updated</h2>
                        <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and initiatives.</p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </aside> */}


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

                {/* <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Impact in Numbers</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">Over 1 million migrants helped in the past year.</p>
                            <p className="text-gray-600">98% of our participants report improved living conditions.</p>
                            <p className="text-gray-600">Join thousands who are already making a difference.</p>
                        </div>
                    </div>
                </aside> */}

                {/* <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Important Updates</h2>
                        <p className="text-gray-600 mb-4">Our next initiative will be launched soon. Stay tuned for more details!</p>
                        <div className="space-y-4">
                            <Link href="/updates" className="text-blue-600 hover:underline">
                                Read More Updates
                            </Link>
                        </div>
                    </div>
                </aside> */}

                {/* <aside className="w-full lg:w-1/4 lg:mt-0 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">Join our upcoming webinar on empowering African migrants.</p>
                            <Link href="/webinar" className="text-blue-600 hover:underline">
                                Register for Webinar
                            </Link>
                        </div>
                    </div>
                </aside> */}


            </div>
      
        </section>

      </main>
    </div>
  );
};

export default Blog;