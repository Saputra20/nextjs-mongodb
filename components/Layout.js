import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return(
        <>
            <Head>
                <title>Apps</title>
            </Head>
            <Navbar />
            {children}
        </>
    )
}

export default Layout;