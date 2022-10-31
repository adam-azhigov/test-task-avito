import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div className='bg-gray-200 w-4/5  h-20 mx-auto flex justify-evenly rounded-md shadow-xl'>
            <div>
                <h1 className='leading-[80px] text-3xl'>
                    Hacker News
                </h1>
            </div>
            <Link to={'/'} className='text-2xl leading-[80px]'>Главная</Link>

        </div>
    );
}

export default Header;