export const metadata = {
    title: 'Reset Your Password: Secure Password Recovery',
    description: 'Reset your password securely. Enter the new password you would like to use for your account. Ensure it is a strong and memorable password. If you have any issues, please contact our support team for assistance.',
    alternates: {
        canonical: '/reset-password',
    },
    robots:
     {
        index: false,
        follow: true,
        nocache: true,
    },
    openGraph: {
        url: '/reset-password',
    },
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}