import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-4 bg-[#171719] text-white">
      <h1 className="text-center text-4xl font-medium">Who is watching?</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <Link href={"/"} prefetch>
          <img
            className="h-40 w-40 rounded-md"
            src="https://github.com/burakorkmez/mern-netflix-clone/blob/master/frontend/public/avatar3.png?raw=true"
            alt="profile"
          />
        </Link>
        <p>{session.user?.name}</p>
      </div>
    </div>
  );
};

export default page;
