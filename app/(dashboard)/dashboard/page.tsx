"use client";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setAuthError(null);

    let { error } = await supabase.auth.signOut();
    if (error) {
      // setAuthError(error.message);
      toast.error(error.message, {
        style: {
          background: "#fff",
          color: "#f12f2f",
          border: "none",
        },
      });
      return;
    }

    router.push(ROUTES.LOGIN);
    router.refresh();
  };

  return (
    <div>
      {authError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{authError}</p>
        </div>
      )}
      <div className="p-4">
        <p>This is coming from the dashboard itself</p>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
      
    </div>
  );
};

export default Dashboard;
