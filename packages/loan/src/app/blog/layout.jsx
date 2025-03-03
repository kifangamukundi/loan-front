import { BLOG_NAME } from "@/helpers";

export const revalidate = 10;

export const metadata = {
    title: {
        template: `%s | ${BLOG_NAME}`,
    },
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}