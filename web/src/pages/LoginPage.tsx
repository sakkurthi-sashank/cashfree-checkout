import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  useEffect(() => {}, []);

  const navigation = useNavigate();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleGoogleLogin = () => {
    signInWithGoogle().then((res) => {
      if (res?.user) {
        navigation("/tickets");
      }
    });
  };

  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative bg-gray-950 hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/arman-malik01.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="fixed left-4 bg-black p-4 rounded-lg top-4 mb-10 flex items-center justify-center">
              <img
                src="/images/infinitus2024.png"
                height={150}
                width={150}
                alt="SRM AP"
              />
            </div>
          </div>
        </div>

        <div className="flex h-screen items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[500px]">
            <div className="flex items-center bg-black w-fit p-5 rounded-lg mx-auto justify-center">
              <img
                src="/images/infinitus2024.png"
                height={300}
                width={300}
                alt="SRM AP"
              />
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-md text-muted-foreground">
                Enjoy SRM Annual Culture Fest with your friends and thousands of
                others.
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center space-y-6">
              <Button
                onClick={handleGoogleLogin}
                size={"lg"}
                variant="outline"
                className="w-full max-w-[300px] space-x-2 rounded-full border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 shadow-md"
              >
                <FcGoogle size={20} />
                <span className="text-base">Sign In with Google</span>
              </Button>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By continuing, you are indicating that you accept our Terms of
              Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
