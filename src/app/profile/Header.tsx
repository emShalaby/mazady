import Image from "next/image";
import NavLink from "./NavLink";

interface HeaderProps {
  userId: string;
}
const Header = ({ userId }: HeaderProps) => {
  return (
    <div className="flex justify-between py-4 sm:py-4 lg:px-20 md:px-10 px-4  sm:px-8 md:py-0">
      <div className="flex gap-2 sm:gap-4">
        <button className="md:hidden hover:cursor-pointer">
          <Image src={"/menu.svg"} width={24} height={24} alt="menu-img" />
        </button>
        <div className="relative w-[101px] h-[32px] md:w-[108px] md:h-[42px] md:mt-[12px]  md:mb-[12px]">
          <Image src="/logo.png" alt="logo-image" layout="fill" />
        </div>
        <nav className="hidden md:flex md:mt-5 lg:gap-5 md:gap-4 ">
          <NavLink href={`/profile/${userId}`} label={"Home"} />

          <NavLink href={`/profile/${userId}/blog`} label={"Blog"} />

          <NavLink href={`/profile/${userId}/gifts`} label={"Gifts"} />
        </nav>
      </div>
      <div className="flex  items-center gap-4 sm:gap-8 md:gap-4 lg:gap-6">
        <button className=" flex-1 hover:cursor-pointer">
          <Image
            src={"/search-normal.svg"}
            alt="search-icon"
            width={24}
            height={24}
          />
        </button>
        <button className=" flex-1 md:border-l-1 md:border-[#FFEAD2] md:pl-4 md:min-w-[40px] md:min-h-[40px] hover:cursor-pointer ">
          <Image
            src={"/notification.svg"}
            alt="search-icon"
            width={24}
            height={24}
          />
        </button>
        <button className=" flex-1 md:border-l-1 md:border-[#FFEAD2] md:min-w-[40px] md:min-h-[40px] md:pl-4 hover:cursor-pointer">
          <Image
            src={"/profile-pic.png"}
            alt="search-icon"
            width={40}
            height={40}
          />
        </button>
        <button className="hidden md:flex  items-center text-white custom-gradient rounded-2xl text-sm hover:cursor-pointer  py-[10px] px-3 gap-1 max-w-[172px]">
          <Image
            src={"/add-circle.svg"}
            alt="add-circle-image"
            width={18}
            height={18}
          />
          <p>Add New Product</p>
        </button>
        <div className="hidden md:flex gap-4">
          <button className="hover:cursor-pointer">
            <Image src={"/globe.svg"} alt="globe-icon" width={24} height={24} />
          </button>
          <p>EN</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
