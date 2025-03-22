import React from "react";
import Header from "@/app/profile/Header";
import ProfileCard from "@/app/Components/ProfileCard";
import { mockProducts, mockProfileInfo } from "@/lib/mock-data";
import QRAccordion from "@/app/Components/QrAccordion";
import TabSection from "@/app/Components/TabSection";

const UserHome = async ({
  params,
}: {
  params: Promise<{ userid: string }>;
}) => {
  const userId = (await params).userid;
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header userId={userId} />
      </header>
      <main className="flex flex-col bg-[#f6f4f5] p-4 gap-6 min-h-screen md:px-21 lg:py-12 md:flex-row md:gap-6">
        <div className="flex flex-col gap-6 ">
          <section className="md:max-w-[407px]">
            <ProfileCard {...mockProfileInfo} />
          </section>

          <section className=" md:max-w-[407px]">
            <QRAccordion />
          </section>
        </div>

        <section className="flex flex-1">
          <TabSection products={mockProducts} articles={[]} reviews={[]} />
        </section>
      </main>
    </div>
  );
};

export default UserHome;
