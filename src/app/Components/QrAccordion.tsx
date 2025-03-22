"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const QRAccordion = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col bg-white p-3 rounded-2xl shadow-sm gap-2 sm:px-5 md:p-6">
      <div className="flex justify-between p-4 items-center">
        <h2 className="text-lg font-medium">QR Code</h2>
        <div className="flex gap-4 items-center ">
          <button className="text-gray-500 hover:cursor-pointer hover:text-gray-700 ">
            <Image src="/eye.svg" alt="eye-icon" width={24} height={24} />
          </button>
          <button className="text-gray-500 hover:cursor-pointer hover:text-gray-700">
            <Image
              src="/send-square.svg"
              alt="share-icon"
              width={24}
              height={24}
            />
          </button>
          <button className="text-gray-500 hover:cursor-pointer hover:text-gray-700">
            <Image
              src="/document-download.svg"
              alt="download-icon"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#fbe7ee] rounded-3xl md:hidden text-gray-500 hover:cursor-pointer hover:text-gray-700"
          >
            <Image
              src="/arrow-up.svg"
              alt="arrow-icon"
              width={24}
              height={24}
              className={clsx(
                "w-5 h-5 transition-transform ",
                !isOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-3",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex bg-orange-100 p-3 rounded-3xl gap-3 items-center">
          <Image
            src="/document-download2.svg"
            alt="document-icon"
            width={24}
            height={24}
          />
          <p className="text-gray-700 text-sm">
            Download the QR code or share it with your friends.
          </p>
        </div>

        <div className="p-4 rounded-3xl custom-gradient">
          <div className="bg-white rounded-3xl shadow-sm">
            <div className="bg-white">
              <div className="flex justify-center p-2">
                <Image
                  src="/logo.png"
                  alt="Mazaady Logo"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            <div className="flex flex-col p-6 items-center">
              <h3 className="text-lg font-medium mb-4">Hala Ahmed</h3>

              <div className="mb-4 relative">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="QR Code"
                  className="h-48 w-48"
                />
              </div>

              <p className="text-gray-600 text-sm">Follow Us On Mazaady</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QRAccordion;
