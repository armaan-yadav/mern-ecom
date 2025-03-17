import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { brandName } from "@/constants/constants";
import { customToast, isValidEmail } from "@/lib/utils";
import { useCreateUserMutation } from "@/redux/user/usersApi";
import authServices from "@/services/userAuthServices";
import { User } from "@/types";
import { Label } from "@radix-ui/react-label";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GalleryVerticalEnd } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("raj@gmail.com");
  const [password, setPassword] = useState("111111");
  const [error, setError] = useState("");
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //TODO data validation via regex

    if (!isValidEmail(email)) {
      setError("Invalid Email!");
      return;
    }
    if (password.length < 5) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const res = await authServices.login({ email, password });
    if (!res.success) {
      setError(res.message!);
    }
    customToast(`Welcome back ${res.data!.displayName}`);
  };

  const signUpWithGoogle = async () => {
    const user = await authServices.signupWithGoogle();

    if (user) {
      customToast(`Welcome back ${user.displayName}`);
    } else {
      customToast("Failed to login with Google");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {brandName}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="* * * * * * "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="min-h-[16px] text-center">
                  {error && <p className="text-sm text-red-700">{error}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={signUpWithGoogle}
                >
                  Login with Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-80"
        />
      </div>
    </div>
  );
};

export default LoginPage;
