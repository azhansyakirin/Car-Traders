import React from 'react';

export const Popover = ({list, onSelectCategory}) => {

    if(!list) return null;

    return (
        <div className="relative text-black bg-white p-8 rounded shadow-md text-center">
          <ul>
            {list.map((cat, index) => (
              <li
                key={index}
                className="cursor-pointer p-1 hover:text-blue-400"
                onClick={()=>onSelectCategory(cat)}>
                {cat}
              </li>
            ))}
          </ul>
        </div>
    )
}