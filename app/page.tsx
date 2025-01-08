import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const sesssion = await getServerSession(auth);

  if (!sesssion) {
    redirect("/auth");
  }
  return (
    <div className="bg-[#171719] w-full min-h-screen text-white">
      <Navbar />
    </div>
  );
};

export default page;
