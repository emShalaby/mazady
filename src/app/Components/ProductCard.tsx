"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

interface ProductCardProps {
  title: string;
  startingPrice: string;
  startingDate: Date;
  imageUrl: string;
  isLiveAuction?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  startingPrice,
  startingDate,
  imageUrl,
  isLiveAuction = true,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const days = differenceInDays(startingDate, now);
    const hoursTotal = differenceInHours(startingDate, now);
    const hours = hoursTotal % 24;
    const minutesTotal = differenceInMinutes(startingDate, now);
    const minutes = minutesTotal % 60;

    return { days, hours, minutes };
  };

  const timeRemaining = calculateTimeRemaining();

  const handleHeartClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-row gap-4 lg:gap-9 w-full">
      <div className="relative min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px]">
        <div
          className="absolute top-2 left-2 z-10 bg-white rounded-full p-1 cursor-pointer lg:hidden"
          onClick={handleHeartClick}
        >
          <Image
            src={isLiked ? "/heart-red.svg" : "/heart.svg"}
            width={24}
            height={24}
            alt="heart-icon"
          />
        </div>
        <div
          className={`${isLiveAuction ? "bg-[#e91e63]" : "bg-[#ff951d]"} justify-center sm:text-xs md:text-sm flex absolute bottom-0 right-0 text-white text-[8px] px-2 py-1 md:py-2 z-10 rounded-tl-[33px] rounded-br-[33px]`}
        >
          {isLiveAuction ? "Live Auction" : "Hot Sale"}
        </div>
        <div className="relative w-full min-h-[80px] md:min-h-[110px] lg:min-h-[120px]">
          <Image
            src={imageUrl}
            alt={title}
            className="rounded-[33px] object-cover"
            priority
            fill
          />
        </div>
      </div>

      <div className="flex flex-col flex-wrap py-1 text-xs sm:text-sm md:text-sm lg:text-xl flex-1">
        <div>
          <h3 className="font-medium text-gray-800 line-clamp-1">{title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-gray-500">Starting Price</p>
            <p className="font-semibold text-gray-900 md:font-extrabold">
              {startingPrice}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:items-center md:flex-row md:gap-4">
          <p className="text-gray-500">Lot Starts In</p>
          <div className="flex gap-2 mt-1 text-orange-500">
            <div className="bg-[#fff8e1] px-2 py-1 rounded-[14px] flex-1 md:px-1 lg:px-5 justify-center items-center">
              <span className="font-semibold">{timeRemaining.days}</span>
              <span className="ml-1">Days</span>
            </div>
            <div className="bg-[#fff8e1] px-2 py-1 rounded-[14px] flex-1 md:px-1 lg:px-5 justify-center items-center">
              <span className="font-semibold">{timeRemaining.hours}</span>
              <span className="text-orange-500 ml-1">Hours</span>
            </div>
            <div className="bg-[#fff8e1] px-2  py-1 rounded-[14px] flex-1 md:px-1 lg:px-5 justify-center items-center">
              <span className="font-semibold">{timeRemaining.minutes}</span>
              <span className="text-orange-500 ml-1">Minutes</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative hidden lg:block min-w-[24px]"
        onClick={handleHeartClick}
      >
        <Image
          src={isLiked ? "/heart-red.svg" : "/heart.svg"}
          alt="heart-icon"
          fill
        />
      </div>
    </div>
  );
};

export default ProductCard;
