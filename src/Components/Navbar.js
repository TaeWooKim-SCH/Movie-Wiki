import React from 'react';
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
    <nav className="fixed left-0 top-0 flex h-full w-56 flex-col justify-between bg-[#141414] text-white">
      <div className="nav-top w-full">
        <div className="nav-profile flex h-48 w-full flex-col items-center justify-evenly">
          <AiOutlineUser
            size="70"
            className="rounded-full border-4 border-white"
          />
          <div className="flex w-full justify-evenly">
            <AiOutlineHeart size="40" />
            <AiOutlineBell size="40" />
          </div>
        </div>
        <div className="nav-menu my-5 flex h-60 w-full flex-col justify-between">
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
        </div>
      </div>
      <div className="nav-bottom flex h-20 w-full items-center justify-evenly">
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
      </div>
    </nav>
  );
}
