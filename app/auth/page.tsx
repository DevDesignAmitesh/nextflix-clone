"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import { register } from "../api/actions/register";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Statement from "@/components/Statement";
import WhiteButton from "@/components/WhiteButton";
import RedButton from "@/components/RedButton";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [value, setValue] = useState<string>("register");

  const loginFunction = async function () {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const registerFunction = async function () {
    try {
      await register(name, email, password);
      await loginFunction();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <main className='w-full relative h-screen bg-[url("https://www.shortlist.com/media/imager/202401/62264-posts.article_md.jpg")] bg-no-repeat bg-fixed bg-center bg-cover'>
      <img
        className="h-[50px] absolute top-5 left-5"
        src={
          "https://raw.githubusercontent.com/burakorkmez/mern-netflix-clone/refs/heads/master/frontend/public/netflix-logo.png"
        }
        alt="logo"
      />
      <div className="w-full h-screen flex justify-center items-start bg-black lg:bg-opacity-50">
        <div className="lg:w-[350px] p-10 w-full bg-black lg:bg-opacity-80 text-white mt-32 rounded-md flex flex-col justify-center items-start">
          <h1 className="font-semibold text-2xl mb-4">
            {value === "register" ? "Register" : "Log in"}
          </h1>
          {value === "register" && (
            <Input
              label="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
          )}
          <Input
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
          <Input
            label="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          {value === "register" ? (
            <RedButton onClick={registerFunction} label="Register" />
          ) : (
            <RedButton onClick={loginFunction} label="Log in" />
          )}

          <div className="flex justify-center w-full items-center gap-4 mt-6 mb-4">
            <WhiteButton
              onClick={() => signIn("google", { callbackUrl: "/profiles" })}
              children={<FcGoogle size={30} />}
            />
            <WhiteButton
              onClick={() => signIn("github", { callbackUrl: "/profiles" })}
              children={<FaGithub color="black" size={30} />}
            />
          </div>

          {value === "register" ? (
            <Statement
              label="Already have a account?"
              span="Login"
              onClick={() => {
                setValue("login");
              }}
            />
          ) : (
            <Statement
              label="Create an account?"
              span="Register"
              onClick={() => {
                setValue("register");
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
