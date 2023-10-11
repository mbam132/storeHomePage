import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { SlLocationPin } from 'react-icons/sl';
// import DownArrow from '../assets/icons/downArrow.png';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import { IUserScope } from '../utils/types';

function NavBar() {
  const router = useRouter();
  const { loggedIn, user } = useUser();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    router.push('/login');
  };

  return (
    <nav className="w-screen bg-primary-300 fixed top-0	h-navbar flex flex-row">
      <div className="flex items-center gap-x-2.5">
        {user?.authScope === IUserScope.SUPERUSER && (
          <Link className="text-xs text-white" href="/experimenting">
            Experiment Home
          </Link>
        )}

        {loggedIn && (
          <Link className="text-xs text-white" href="/create-todo">
            Create Todo List
          </Link>
        )}

        {!loggedIn && (
          <Link className="text-xs text-white" href="/login">
            Login
          </Link>
        )}

        {!loggedIn && (
          <Link className="text-xs text-white" href="/sign-up">
            Sign up
          </Link>
        )}
      </div>
      <div className="flex items-center ml-auto mr-5 gap-1">
        {loggedIn && (
          <button
            type="button"
            className="text-xs text-white"
            onClick={handleLogOut}
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
