import React from 'react'
import Header from '../header/Header'

const Layout = ({ Children }) => {
    return (
        <main>
            <Header />
            {Children}
        </main>
    )
}

export default Layout;