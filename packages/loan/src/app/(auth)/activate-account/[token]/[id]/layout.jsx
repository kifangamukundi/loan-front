export const metadata = {
    title: 'Activate Your Account: Secure Activation Process',
    description: 'Welcome! To activate your account, please follow the instructions in the activation email we sent to your registered email address. If you haven\'t received the email, please check your spam folder or contact our support team for assistance.',
    alternates: {
        canonical: '/activate-account',
    },
    robots:
     {
        index: false,
        follow: true,
        nocache: true,
    },
    openGraph: {
        url: '/activate-account',
    },
}
  
export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}