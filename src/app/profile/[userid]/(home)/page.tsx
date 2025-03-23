import React from "react";
import Header from "@/app/profile/Header";
import ProfileCard from "@/app/Components/ProfileCard";
import { mockProducts, mockProfileInfo } from "@/lib/mock-data";
import QrAccordion from "@/app/Components/QrAccordion";
import TabSection from "@/app/Components/TabSection";

const UserHome = async ({
  params,
}: {
  params: Promise<{ userid: string }>;
}) => {
  const userId = (await params).userid;
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f4f5]">
      <header className="bg-white 2xl:justify-center w-full flex">
        <Header userId={userId} />
      </header>
      <main className="flex flex-col sm:px-0 gap-6 py-6 md:px-4 lg:py-12 xl:justify-center min-h-screen md:flex-row md:gap-6 ">
        <div className="flex flex-col gap-6 md:flex-1 md:max-w-[410px]">
          <section className="md:max-w-[407px]">
            <ProfileCard {...mockProfileInfo} />
          </section>

          <section className=" md:max-w-[407px]">
            <QrAccordion />
          </section>
        </div>

        <section className="flex flex-1 md:flex-2 xl:max-w-[1000px] min-h-[500px]">
          <TabSection products={mockProducts} articles={[]} reviews={[]} />
        </section>
      </main>
    </div>
  );
};

export default UserHome;
