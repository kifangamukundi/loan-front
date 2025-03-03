export const metadata = {
    title: 'Dashboard',
    description: 'Welcome to the site dashboard where you can manage various items.',
    alternates: {
        canonical: '/dashboard',
    },
    robots:
     {
        index: false,
        follow: false,
        nocache: true,
    },
    openGraph: {
        url: '/dashboard',
    },
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}