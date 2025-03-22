import React from "react";
import Header from "@/app/profile/Header";

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
    </div>
  );
};

export default UserHome;
