import { SITE_NAME } from "@/helpers"

export const metadata = {
    title: 'Join the Movement: Empower African Migrants',
    description: 'Together, we can create lasting change for African migrants in the Middle East. By collecting and analyzing vital data, we strive to enhance their lives and working conditions. Your involvement can make a significant difference. Fill out the form below to join us in this important mission and help empower those who need it most. Let’s work together for a brighter future!',
    alternates: {
        canonical: '/join',
    },
    openGraph: {
        siteName: `${SITE_NAME}`,
        url: '/join',
        locale: 'en_US',
        type: 'website',
    }
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}