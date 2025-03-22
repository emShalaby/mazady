import Image from "next/image";
import React from "react";

interface ProfileSectionProps {
  username: string;
  description: string;
  following: number;
  followers: number;
  rate: number;
}

const ProfileCard: React.FC<ProfileSectionProps> = ({
  username,
  description,
  following,
  followers,
  rate,
}) => {
  return (
    <>
      <div className="flex flex-col bg-white p-3 rounded-2xl shadow-sm gap-2 sm:px-5 md:p-6">
        <div>
          <Image
            src={"/profile-pic-big.png"}
            alt="profile-pic"
            height={80}
            width={50}
          />
        </div>
        <h1 className="text-xl font-extrabold">{username}</h1>
        <p>{description}</p>
        <div className="flex flex-1 justify-center gap-2 items-center">
          <div className="flex flex-1 bg-[#fff5e9] p-2 rounded-2xl gap-2 items-center">
            <Image
              src={"/user-tick.svg"}
              height={24}
              width={22}
              alt="user-tick-icon"
            />
            <div className="flex flex-col justify-center">
              <p>{following}</p>
              <p className="text-[#FF951D] text-xs">Following</p>
            </div>
          </div>
          <div className="flex flex-1 bg-[#fff5e9] p-2 rounded-2xl gap-1 items-center">
            <Image
              src={"/profile-2user.svg"}
              height={24}
              width={22}
              alt="user-tick-icon"
            />
            <div className="flex flex-col justify-center">
              <p>{followers}</p>
              <p className="text-[#FF951D] text-xs">Followers</p>
            </div>
          </div>
          <div className="flex flex-1 bg-[#fff5e9] p-2 rounded-2xl gap-2 items-center">
            <Image
              src={"/magic-star.svg"}
              height={24}
              width={22}
              alt="user-tick-icon"
            />
            <div className="flex flex-col justify-center">
              <div className="flex gap-1 items-center">
                <p>{rate}</p>
                <p className="text-gray-400 text-xs">(15)</p>
              </div>
              <p className="text-[#FF951D] text-xs">Rate</p>
            </div>
          </div>
        </div>
        <button className=" rounded-xl text-white custom-gradient py-2 hover:cursor-pointer">
          Follow
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
