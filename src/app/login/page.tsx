"use client";
// system imports
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { ImFacebook, ImTwitter, ImGoogle } from "react-icons/im";
import { useRouter } from "next/navigation";
import Link from "next/link";

// custom imports
import { Input, Button } from "@/components";
import { LoginFormValues } from "@/interfaces";
import { ThemeSwitch } from "@/components";
import { useAuth, useTheme } from "@/hooks";
import { emailSchema, passwordSchema } from "@/constants";
import { toastify } from "@/utils/swal";
import Layout from "@/components/Layout/Layout";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { SignIn, SignInWithGoogle, loading } = useAuth();
  const { theme } = useTheme();

  const onSuccess = () => {
    toastify({
      message: "Logged in successfully!",
      toast_type: "success",
      toast_theme: theme === "dark" ? "dark" : "light",
    });
    router.push("/dashboard");
  };
  const handleLogin: SubmitHandler<LoginFormValues> = (creds) => {
    debugger;
    SignIn(creds, onSuccess);
  };

  return (
    <Layout>
      <ThemeSwitch />
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <h2 className="text-center flex justify-center py-2 font-semibold text-primary text-5xl">
          <FaUserCircle />
        </h2>
        <div className="px-5 py-4">
          <Input
            name="email"
            type="text"
            label="Email"
            reg={register}
            registerOptions={emailSchema}
            error={errors.email && errors.email.message}
            icon={<MdEmail />}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            reg={register}
            registerOptions={passwordSchema}
            error={errors.password && errors.password.message}
            icon={<MdPassword />}
          />
          <Button
            type="submit"
            text="Sign In"
            classes="w-full mt-8 uppercase"
            loading={loading}
            icon={<RiLoginCircleFill />}
          />
        </div>
      </form>
      <div className="px-5 dark:text-light text-dark text-[.8rem]">
        Don&apos;t have an account{" "}
        <Link
          className="text-primary font-semibold dark:bg-darkbg bg-lightgray px-2 rounded ml-1"
          href="/signup"
        >
          Register here
        </Link>
      </div>
      <div className="mt-5 text-dark dark:text-light mx-5">
        <p className="text-xs w-full h-[1px] relative bg-dark dark:bg-light">
          <span className="absolute left-1/2 -translate-x-1/2 top-1/2 p-1 bg-lightgray rounded dark:bg-dark -translate-y-1/2">
            OR
          </span>
        </p>
        <div className="flex justify-center mt-7">
          <div className="login-button">
            <button
              className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
              onClick={() => SignInWithGoogle(onSuccess)}
            >
              <span className="">
                <ImGoogle />
              </span>
            </button>
          </div>
          <div className="login-button mx-4">
            <button
              className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
              // onClick={signInWithGoogle}
            >
              <span className="">
                <ImFacebook />
              </span>
            </button>
          </div>
          <div className="login-button">
            <button
              className="login-provider-button text-primary transition-all shadow-sm shadow-light dark:shadow-dark duration-150 hover:bg-primary hover:text-lightgray text-2xl flex border-primary hover:border-2 hover:border-lightgray border-2 p-2 rounded-full"
              // onClick={signInWithGoogle}
            >
              <span className="">
                <ImTwitter />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
