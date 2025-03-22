"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { List, ListRowProps } from "react-virtualized";

const TabSection = ({
  products,
  reviews,
  articles,
}: {
  products: Product[];
  reviews: Product[];
  articles: Product[];
}) => {
  const [activeTab, setActiveTab] = useState("Products");
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const renderContent = () => {
    const data =
      activeTab === "Products"
        ? products
        : activeTab === "Articles"
          ? articles
          : reviews;
    const rowHeight = 140;
    const fixedHeight = 1000;

    return (
      <div className="flex flex-col gap-4 bg-white ">
        <div className="flex items-center gap-4 px-2">
          <h1 className="font-extrabold text-[32px] text-[#333333]">
            {activeTab}
          </h1>
          <p className="text-gray-400 text-sm">( {data.length} )</p>
        </div>
        <div ref={containerRef} className="w-full">
          {data.length > 0 && (
            <List
              width={containerWidth - 20}
              height={fixedHeight}
              rowCount={data.length}
              rowHeight={rowHeight}
              rowRenderer={({ index, key, style }: ListRowProps) => {
                const item = data[index];
                return (
                  <div
                    key={key}
                    style={{
                      ...style,
                      paddingBottom: "10px",
                    }}
                  >
                    <ProductCard
                      title={item.title}
                      startingPrice={item.startingPrice}
                      startingDate={item.startingDate}
                      imageUrl={"/image.png"}
                      isLiveAuction={item.isLiveAuction}
                    />
                  </div>
                );
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:max-w-[840px] lg:max-w-[1000px] bg-white p-2 md:p-6 rounded-2xl shadow-sm gap-2 sm:px-5 md:col-span-1 flex-1 md:min-w-[407px] h-full">
      <div className="flex justify-between flex-1">
        <nav className="flex gap-2 bg-white">
          <button
            className={`flex-1 py-1 md:px-7 rounded-[14px] ${
              activeTab === "Products"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Products")}
          >
            Products
          </button>
          <button
            className={`flex-1 py-1 px-2 rounded-[14px] ${
              activeTab === "Articles"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Articles")}
          >
            Articles
          </button>
          <button
            className={`flex-1 py-1 px-2 rounded-[14px] ${
              activeTab === "Reviews"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Reviews")}
          >
            Reviews
          </button>
        </nav>
        <button className=" bottom-6 right-6 custom-gradient text-white rounded-xl text-sm py-2 px-3 md:flex items-center gap-2  hover:bg-[#d81b60] transition-colors hidden ">
          <Image
            src="/add-circle2.svg"
            alt="add-circle"
            width={18}
            height={18}
          />
          Add Review
        </button>
      </div>
      {renderContent()}

      <button
        className="fixed bottom-6 right-6 custom-gradient text-white rounded-xl text-sm py-2 px-3 flex items-center gap-2 shadow-lg hover:bg-[#d81b60] transition-colors z-50 md:hidden"
        onClick={() => setActiveTab("Reviews")}
      >
        <Image src="/add-circle2.svg" alt="add-circle" width={18} height={18} />
        <span>Add Review</span>
      </button>
    </div>
  );
};

export default TabSection;
