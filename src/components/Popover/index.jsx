import React from 'react';

export const Popover = ({ list, onSelectCategory, closePopover }) => {

  if (!list) return null;

  return (
    <div className="relative text-white bg-neutral-700 p-8 rounded shadow-md text-center">
      <ul>
        {list.map((cat, index) => (
          <li
            key={index}
            className="cursor-pointer p-1 hover:text-[#FFC800]"
            onClick={() => { 
              onSelectCategory(cat); 
              closePopover(); 
              }}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}