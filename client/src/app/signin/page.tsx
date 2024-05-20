"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../../server/utils/url";
import { store } from "../../redux/store";
import { loadUser } from "../../redux/actions/userAction";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/auth/signin`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      if (res.status === 200) {
        const data = res.data;
        store.dispatch(loadUser());
        toast.success("Login Successfull");
        redirect("/");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-centers w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 gap-3 bg-teal-400 h-[300px] md:h-screen ">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
        <p className="text-center p-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          nisi ipsam fugit nobis aliquam esse enim ipsum, ratione assumenda.
        </p>
        <Link href="/signup">
          <button className="px-3 py-2 border-2 border-white  rounded-md font-semibold">
            SignUp
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 p-5 bg-slate-100 h-screen">
        <h2 className="text-3xl md:text-4xl mb-8 font-bold text-teal-400">
          Login Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-sm mx-auto "
        >
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
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}
