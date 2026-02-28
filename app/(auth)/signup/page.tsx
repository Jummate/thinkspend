"use client";

import AppLogo from "@/components/AppLogo";
import SignUpForm from "@/components/auth/SignUpForm";
import { ROUTES } from "@/lib/routes";
import { signup } from "@/lib/services/authService";
import { RegisterFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SignUpPage() {
  // const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (data: RegisterFormData) => {
    try {
      // setAuthError(null); // Clear previous errors

      const result = await signup(data.email, data.password);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // Success! Redirect to dashboard
      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch (err) {
      console.error("Sign up error:", err);
      // setAuthError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.", {
        style: {
          background: "#fff",
          color: "#f12f2f",
          border: "none",
        },
      });
    }
  };

  return (
    <main className="flex items-center justify-center h-full p-6">
      {/* <header>
      </header> */}
      {/* <div className='flex flex-col items-center justify-center shadow-lg rounded-lg bg-red-500 w-full mx-auto max-w-lg p-4'> */}
      <div className="shadow-lg rounded-xl w-full mx-auto max-w-lg overflow-hidden">
        <section className="flex flex-col items-center justify-center text-center p-4 bg-primary">
          <AppLogo />
          <h1 className="text-white text-2xl mb-4 font-bold">Create Account</h1>
          <p className="text-sm text-white/80">Start tracking today.</p>
          <p className="text-sm text-white/80">
            Create an account to manage your expenses effortlessly.
          </p>
        </section>

        <section className="flex flex-col items-center justify-center py-10 px-5 sm:px:7 md:px-10 gap-10">
          <SignUpForm
            onSubmit={handleSignUp}
          />
          <p className="text-muted/80">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary cursor-pointer hover:underline font-bold"
            >
              Log in
            </Link>
          </p>
        </section>

        {/* <section className='p-4 text-center flex flex-col justify-center items-center gap-2'>
          <p className='text-muted-foreground mb-4'>Log in to manage your finances</p>

        </section> */}
      </div>
    </main>
  );
}

export default SignUpPage;
