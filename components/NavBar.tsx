import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import DownArrow from '../assets/icons/downArrow.png';

function NavBar() {
  return (
    <nav className="w-screen bg-primary-300 fixed top-0	h-navbar flex flex-row">
      <div>
        <Link className="text-xs text-white mr-3" href="/experimenting">
          Experiment Home
        </Link>
        <Link className="text-xs text-white" href="/create-todo">
          Create Todo List
        </Link>
      </div>
      <div className="flex items-center ml-auto mr-5 gap-1">
        <a
          href="https://goo.gl/maps/KDy1EUg1akjSQjFA6"
          target="_blank"
          rel="noreferrer"
        >
          <SlLocationPin className="text-white" size="16" />
        </a>
        <span className="text-xs text-white font-medium cursor-pointer">
          Bello Monte
        </span>
        <Image
          src={DownArrow}
          alt="Arrow down"
          className="w-3 h-3 cursor-pointer"
        />
      </div>
      <div className="flex items-center h-full gap-3 mr-12">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="text-white cursor-pointer" size="16" />
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF className="text-white cursor-pointer" size="16" />
        </a>

        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter className="text-white cursor-pointer" size="16" />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
