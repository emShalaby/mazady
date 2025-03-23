"use client";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface BurgerMenuProps {
  userId: string;
}

const BurgerMenu = ({ userId }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative md:hidden">
      <button
        className="md:hidden hover:cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Image src="/menu.svg" alt="menu-icon" width={24} height={24} />
      </button>

      <Menu
        isOpen={isOpen}
        onStateChange={handleStateChange}
        width="280px"
        className="bg-white text-black left-0 h-screen"
      >
        <Link
          href={`/profile/${userId}`}
          onClick={closeMenu}
          className="block py-2 px-4 hover:bg-gray-700"
        >
          Home
        </Link>
        <Link
          href={`/profile/${userId}/blog`}
          onClick={closeMenu}
          className="block py-2 px-4 hover:bg-gray-700"
        >
          Blog
        </Link>
        <Link
          href={`/profile/${userId}/gifts`}
          onClick={closeMenu}
          className="block py-2 px-4 hover:bg-gray-700"
        >
          Gifts
        </Link>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
