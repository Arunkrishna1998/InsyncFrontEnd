import React from 'react'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'

const Layout = ({ title, content, children }) => {
  return (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={content} />
        </Helmet>
        <Navbar/>
        <div className='container mx-auto w-full'>
            {children}
        </div>
    </>
  )
}
export default Layout