export const metadata = {
    title: 'Forgot Password: Password Reset Request',
    description: 'Forgot your password? No worries! Enter your email address below, and we\'ll send you instructions on how to reset your password. Our password reset process is secure and easy. If you need further assistance, please contact our support team.',
    alternates: {
        canonical: '/forgot-password',
    },
    openGraph: {
        url: '/forgot-password',
    },
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}