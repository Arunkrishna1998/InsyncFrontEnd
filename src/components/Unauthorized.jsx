import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div>
        <div className='ms-12 mt-6 public text-black hover:text-[#000000]'>
            <Link to={'/'}>&#x2190;Go Home</Link>
        </div>
        <div className="rajdhani text-3xl font-bold text-center mt-10 text-[#000000] ">You are not authorized</div>
        <div className="mt-12 raleway text-lg text-[#000000] text-center font-semibold ms-12">You tried to access a page you did not have prior authorization for.</div>
        
        <div className="text-[#000000]  text-9xl font-extrabold text-center">403</div>
        <div className="container flex justify-center">
            <div className="text-[#000000]  text-xs" >
            </div>
        </div>
    </div>
  )
}

export default Unauthorized;
