import React from 'react';

export const Cards = ({ children, img }) => {

    return (
        <div className="relative flex-col min-h-[300px] max-w-[400px] cursor-pointer">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-10 p-4">
                {children}
            </div>
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-opacity duration-300" />
            {img && <img src={img} className="object-cover w-[400px] h-[100%]" />}
        </div>
    )
}