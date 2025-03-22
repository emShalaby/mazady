import React from "react";
import Header from "@/app/profile/Header";
import ProfileCard from "@/app/Components/ProfileCard";
import { mockProfileInfo } from "@/lib/mock-data";
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
      <main className="flex flex-col items-center  bg-[#f6f4f5] p-4  gap-6 min-h-screen  lg:px-21 lg:py-12">
        <section className="flex flex-col bg-white p-3 rounded-2xl shadow-sm gap-2 md:max-w-[407px] sm:px-5">
          <ProfileCard {...mockProfileInfo} />
        </section>
      </main>
    </div>
  );
};

export default UserHome;
