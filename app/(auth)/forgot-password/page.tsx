// // // // app/(auth)/forgot-password/page.tsx

// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { ForgotPasswordFormData } from "@/lib/validations/auth";
// // // import { ROUTES } from "@/lib/routes";
// // // import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

// // // const ForgotPasswordPage = () => {
// // //   const router = useRouter();
// // //   const [error, setError] = useState<string | null>(null);

// // //   const handleSubmit = async (data: ForgotPasswordFormData) => {
// // //     try {
// // //       setError(null);
// // //       // TODO: Implement your password reset logic here
// // //       console.log("Reset password for:", data.email);
      
// // //       // Redirect to a confirmation page or login after success
// // //       // router.push(ROUTES.CHECK_EMAIL); // You might want to create this route
// // //       // For now, redirect back to login
// // //       router.push(ROUTES.LOGIN);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center px-4 py-12">
// // //       <div className="w-full max-w-md space-y-8">
// // //         <ForgotPasswordForm onSubmit={handleSubmit} error={error} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ForgotPasswordPage;






// // // app/(auth)/forgot-password/page.tsx

// // "use client";

// // import AppLogo from "@/components/AppLogo";
// // import AuthCard from "@/components/auth/AuthCard";
// // import AuthCardHeader from "@/components/auth/AuthCardHeader";
// // import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
// // import { ROUTES } from "@/lib/routes";
// // // import { forgotPassword } from "@/lib/services/authService";
// // import { showError, showSuccess } from "@/lib/ui/toast";
// // import { ForgotPasswordFormData } from "@/lib/validations/auth";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";

// // function ForgotPasswordPage() {
// //   const router = useRouter();
// //   const [error, setError] = useState<string | null>(null);

// // //   const handleForgotPassword = async (data: ForgotPasswordFormData) => {
// // //     try {
// // //       const result = await forgotPassword(data.email);

// // //       if (!result.success) {
// // //         showError(result.message || "");
// // //         return;
// // //       }

// // //       // Success! Show success message and redirect to login
// // //       showSuccess("Password reset link sent to your email!");
// // //       router.push(ROUTES.LOGIN);
// // //       router.refresh();
// // //     } catch (err) {
// // //       console.error("Forgot password error:", err);
// // //       showError("An unexpected error occurred. Please try again.");
// // //     }
// // //   };


// //   const handleSubmit = async (data: ForgotPasswordFormData) => {
// //     try {
// //       setError(null);
// //       // TODO: Implement your password reset logic here
// //       console.log("Reset password for:", data.email);
      
// //       // Redirect to a confirmation page or login after success
// //       router.push(ROUTES.CHECK_EMAIL); // You might want to create this route
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <main className="flex h-full items-center justify-center p-6">
// //       <AuthCard>
// //         <AuthCardHeader
// //           icon={<AppLogo />}
// //           title="Reset your password"
// //           subtitle="Enter the email on your account and we'll send a reset link."
// //         />

// //         <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
// //           <ForgotPasswordForm onSubmit={handleSubmit} />

// //         </div>
// //       </AuthCard>
// //     </main>
// //   );
// // }

// // export default ForgotPasswordPage;






// // app/(auth)/forgot-password/page.tsx

// "use client";

// import AppLogo from "@/components/AppLogo";
// import AuthCard from "@/components/auth/AuthCard";
// import AuthCardHeader from "@/components/auth/AuthCardHeader";
// import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
// import { ROUTES } from "@/lib/routes";
// import { forgotPassword } from "@/lib/services/authService";
// import { showError } from "@/lib/ui/toast";
// import { ForgotPasswordFormData } from "@/lib/validations/auth";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// function ForgotPasswordPage() {
//   const router = useRouter();

//   const handleForgotPassword = async (data: ForgotPasswordFormData) => {
//     try {
//       const result = await forgotPassword(data.email);

//       if (!result.success) {
//         showError(result.message || "");
//         return;
//       }

//       // Success! Redirect to check email page with the email
//       router.push(`${ROUTES.CHECK_EMAIL}?email=${encodeURIComponent(data.email)}`);
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       showError("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <main className="flex h-full items-center justify-center p-6">
//       <AuthCard>
//         <AuthCardHeader
//           icon={<AppLogo />}
//           title="Reset your password"
//           subtitle="Enter the email on your account and we'll send a reset link."
//         />

//         <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
//           <ForgotPasswordForm onSubmit={handleForgotPassword} />
//           <p className="text-sm text-muted-foreground">
//             Remember your password?{" "}
//             <Link
//               href={ROUTES.LOGIN}
//               className="cursor-pointer font-bold text-primary hover:underline"
//             >
//               Log in
//             </Link>
//           </p>
//         </div>
//       </AuthCard>
//     </main>
//   );
// }

// export default ForgotPasswordPage;







// app/(auth)/forgot-password/page.tsx

"use client";

import AppLogo from "@/components/AppLogo";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { ROUTES } from "@/lib/routes";
import { forgotPassword } from "@/lib/services/authService";
import { showError } from "@/lib/ui/toast";
import { ForgotPasswordFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ForgotPasswordPage() {
  const router = useRouter();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      const result = await forgotPassword(data.email);

      if (!result.success) {
        showError(result.message || "");
        return;
      }

      // Success! Redirect to check email page with the email and the
      // moment we actually sent it — /check-email uses sentAt to know
      // how much of Supabase's 60s rate-limit window has already
      // elapsed, so its Resend button starts in the right state instead
      // of assuming no time has passed yet.
      router.push(
        `${ROUTES.CHECK_EMAIL}?email=${encodeURIComponent(data.email)}&sentAt=${Date.now()}`,
      );
    } catch (err) {
      console.error("Forgot password error:", err);
      showError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="flex h-full items-center justify-center p-6">
      <AuthCard>
        <AuthCardHeader
          icon={<AppLogo />}
          title="Reset your password"
          subtitle="Enter the email on your account and we'll send a reset link."
        />

        <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
          <ForgotPasswordForm onSubmit={handleForgotPassword} />
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="cursor-pointer font-bold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}

export default ForgotPasswordPage;