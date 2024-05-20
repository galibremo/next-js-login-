"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../../server/utils/url";
import { log } from "console";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      setLoading(false);

      if (res.status === 200) {
        const data = res.data;
        toast.success(data.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-centers w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 gap-3 bg-teal-400 h-[300px] md:h-screen ">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
        <p className="text-center p-3">
          To keep conncected with us please login to your account Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Sapiente.
        </p>
        <Link href="/signin">
          <button className="px-3 py-2 border-2 border-white  rounded-md font-semibold">
            SignIn
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 p-5 bg-slate-100 h-screen">
        <h2 className="text-3xl md:text-4xl mb-8 font-bold text-teal-400">
          Create Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-sm mx-auto "
        >
          <label htmlFor="username">Username</label>
          <input
            className="p-2 rounded-md border "
            type="text"
            id="username"
            value={formData?.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded-md border"
            type="email"
            id="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className="p-2 rounded-md border"
            type="password"
            id="password"
            value={formData?.password}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded-md font-semibold border border-black hover:text-white hover:bg-teal-400 mt-5 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
