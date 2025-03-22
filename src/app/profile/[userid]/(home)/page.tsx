import React from "react";
import Header from "@/app/profile/Header";
import ProfileSection from "@/app/Components/ProfileSection";
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
        <ProfileSection {...mockProfileInfo} />
      </main>
    </div>
  );
};

export default UserHome;
