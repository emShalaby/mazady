"use client";

import { useState } from "react";
import { Product } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { List, ListRowProps } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 140,
});

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

  const renderContent = () => {
    const data =
      activeTab === "Products"
        ? products
        : activeTab === "Articles"
          ? articles
          : reviews;

    return (
      <div className="flex flex-col gap-4 bg-white h-full">
        <div className="flex items-center gap-4 px-2">
          <h1 className="font-extrabold text-[32px] text-[#333333]">
            {activeTab}
          </h1>
          <p className="text-gray-400 text-sm">( {data.length} )</p>
        </div>
        <div className="w-full flex-1">
          {data.length > 0 && (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={data.length}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={({
                    index,
                    key,
                    style,
                    parent,
                  }: ListRowProps) => {
                    const item = data[index];
                    return (
                      <CellMeasurer
                        cache={cache}
                        columnIndex={0}
                        key={key}
                        rowIndex={index}
                        parent={parent}
                      >
                        {({ measure, registerChild }) => (
                          <div
                            ref={registerChild}
                            style={{
                              ...style,
                              paddingBottom: "10px",
                            }}
                            onLoad={measure}
                          >
                            <ProductCard
                              title={item.title}
                              startingPrice={item.startingPrice}
                              startingDate={item.startingDate}
                              imageUrl={"/image.png"}
                              isLiveAuction={item.isLiveAuction}
                            />
                          </div>
                        )}
                      </CellMeasurer>
                    );
                  }}
                />
              )}
            </AutoSizer>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col  bg-white p-2 md:p-6 rounded-2xl shadow-sm gap-2 sm:px-5 flex-1 md:flex-none  w-full">
      <div className="flex justify-between">
        <nav className="flex gap-2 bg-white">
          <button
            className={`flex-1 py-1 px-4 md:px-7 rounded-[14px] hover:cursor-pointer ${
              activeTab === "Products"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Products")}
          >
            Products
          </button>
          <button
            className={`flex-1 py-1 px-4 md:px-7 rounded-[14px] hover:cursor-pointer ${
              activeTab === "Articles"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Articles")}
          >
            Articles
          </button>
          <button
            className={`flex-1 py-1 px-4 md:px-7 rounded-[14px] hover:cursor-pointer ${
              activeTab === "Reviews"
                ? "border-[1px] border-[#FF951D] bg-[#fff5e9] text-[#FF951D]"
                : ""
            }`}
            onClick={() => setActiveTab("Reviews")}
          >
            Reviews
          </button>
        </nav>
        <button className="bottom-6 right-6 custom-gradient text-white rounded-xl text-sm py-2 md:py-3 px-1 md:flex items-center gap-2 hover:bg-[#d81b60] transition-colors hidden hover:cursor-pointer">
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
        className="fixed bottom-6 right-6 custom-gradient text-white rounded-xl text-sm py-2 px-3 flex items-center gap-2 shadow-lg hover:bg-[#d81b60] transition-colors z-50 md:hidden hover:cursor-pointer"
        onClick={() => setActiveTab("Reviews")}
      >
        <Image src="/add-circle2.svg" alt="add-circle" width={18} height={18} />
        <span>Add Review</span>
      </button>
    </div>
  );
};

export default TabSection;
