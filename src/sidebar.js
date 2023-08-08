import React, { useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // setSubmenuOpen(null);
  };

  const subtoggleMenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
      <div className='sidebar'>
      {/* <div className={`sidebar ${menuOpen ? 'open' : ''}`}> */}
      <div className='sidebarTitle'>
        <div className='sidebarTitleName'>대매뉴</div>
        {menuOpen ? (<GoTriangleUp onClick={() => toggleMenu()}/>) :
          (<GoTriangleDown onClick={() => toggleMenu()}/>)}
      </div>
      {menuOpen ? (
        <div>
          <div className='sidebarTitleName2'>소메뉴</div>
          <div className='sidebarTitleName2'>소메뉴</div>
        </div>):null}
        <div className='sidebarTitle'>
        <div className='sidebarTitleName'>대매뉴</div>
        {submenuOpen ? (<GoTriangleUp onClick={() => subtoggleMenu()}/>) :
          (<GoTriangleDown onClick={() => subtoggleMenu()}/>)}
      </div>
      {submenuOpen ? (
        <div>
          <div className='sidebarTitleName2'>소메뉴</div>
          <div className='sidebarTitleName2'>소메뉴</div>
        </div>):null}
    </div>
  );
};

export default Sidebar;
