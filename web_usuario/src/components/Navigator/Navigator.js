// src/components/Navigator.js
import React from 'react';
import { Link } from 'react-router-dom'; // Si estás usando react-router para la navegación

const svgArrow = (
  <svg className='navigator-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M10 7L15 12L10 17" stroke="#78b42c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
  </svg>
);

const Navigator = ({ links }) => {
  return (
    <div className='navigator-container'>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <div className='navigator-link'>
            <Link to={link.path} className={link.current ? 'actual-link' : ''}>
              <p>{link.name}</p>
            </Link>
          </div>
          {index < links.length - 1 && svgArrow}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navigator;
