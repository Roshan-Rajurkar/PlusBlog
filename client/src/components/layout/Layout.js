import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer';

const Layout = ({ Children }) => {
    return (
        <main>
            <Header />
            {Children}
            <Footer />
        </main>
    )
}

export default Layout;