import React from 'react';
import tw from 'tailwind-styled-components';
import { NavLink } from 'react-router-dom';

import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineAppstore,
  AiOutlineGithub,
} from 'react-icons/ai';
import { SiNotion } from 'react-icons/si';

export default function Navbar() {
  return (
    <Nav>
      <div className="nav-top w-full">
        <Profile>
          <AiOutlineUser
            size="70"
            className="rounded-full border-4 border-white"
          />
          <div className="flex w-full justify-evenly">
            <AiOutlineHeart size="40" />
            <AiOutlineBell size="40" />
          </div>
        </Profile>
        <NavMenu>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blueWhite' : 'text-white'
            }
          >
            <div className="ml-7 flex items-center">
              <AiOutlineHome size="50" />
              <span className="mx-2 text-3xl">Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'text-blueWhite' : 'text-white'
            }
          >
            <div className="ml-7 flex items-center">
              <AiOutlineSearch size="50" />
              <span className="mx-2 text-3xl">Search</span>
            </div>
          </NavLink>
          <NavLink
            to="/category"
            className={({ isActive }) =>
              isActive ? 'text-blueWhite' : 'text-white'
            }
          >
            <div className="ml-7 flex items-center">
              <AiOutlineAppstore size="50" />
              <span className="mx-2 text-3xl">Category</span>
            </div>
          </NavLink>
        </NavMenu>
      </div>
      <NavBottom>
        <a
          href="https://boiled-november-915.notion.site/5c611de12858456da96816d36c9aa8b7"
          target="_blank"
          rel="noreferrer"
        >
          <SiNotion size="50" />
        </a>
        <a
          href="https://github.com/FE-Sprint-Study/Movie-Wiki"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineGithub size="50" />
        </a>
      </NavBottom>
    </Nav>
  );
}

const Nav = tw.nav`
  flex
  flex-col
  justify-between
  bg-[#141414]
  text-white
  w-56 
  h-full 
  fixed 
  top-0 
  left-0
  z-[5]
  border-r-2
  border-blueWhite
`;

const Profile = tw.div`
  nav-profile 
  w-full 
  h-48 flex 
  flex-col 
  justify-evenly 
  items-center
`;

const NavMenu = tw.div`
  nav-menu 
  w-full 
  h-60 my-5 
  flex 
  flex-col 
  justify-between
`;

const NavBottom = tw.div`
  nav-bottom 
  w-full 
  h-20 
  flex 
  justify-evenly 
  items-center
`;
