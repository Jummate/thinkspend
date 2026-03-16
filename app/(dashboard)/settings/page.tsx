"use client";

import { useUser, currencyMapping } from "@/lib/hooks/useUser";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  currencySchema,
  budgetSchema,
  changePasswordSchema,
  ProfileFormData,
  CurrencyFormData,
  BudgetFormData,
  ChangePasswordFormData,
} from "@/lib/validations/settings";
import {
  updateProfile,
  updateCurrency,
  changePassword,
} from "@/lib/services/settings.service";
import { upsertBudget } from "@/lib/services/budget.service";
import { formatAmountToNumber, formatAmountToString } from "@/lib/utils/format-amount";
import { showError, showSuccess } from "@/lib/ui/toast";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { User, Wallet, Lock, DollarSign, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";

// ─── Reusable section wrapper ───────────────────────────────────────────────
function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon size={18} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6 ml-11">{description}</p>
      {children}
    </div>
  );
}

// ─── Field wrapper ───────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-muted-foreground font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Submit button ────────────────────────────────────────────────────────────
function SaveButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={clsx(
        "self-start flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-all",
        { "opacity-50 pointer-events-none": isSubmitting }
      )}
    >
      <CheckCircle2 size={15} />
      {isSubmitting ? "Saving..." : "Save Changes"}
    </button>
  );
}

const currencyOptions = [
  { value: "NGN", label: "₦ Nigerian Naira (NGN)" },
  { value: "USD", label: "$ US Dollar (USD)" },
  { value: "EUR", label: "€ Euro (EUR)" },
  { value: "GBP", label: "£ British Pound (GBP)" },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, profile } = useUser();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const { budget, refetch: refetchDashboard } = useDashboard(user?.id);

  // ── Profile form ──────────────────────────────────────────────────────────
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (profile) {
      resetProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
    }
  }, [profile, resetProfile]);

  const onProfileSave = async (data: ProfileFormData) => {
    try {
      if (!user) return;
      await updateProfile(user.id, data.firstName, data.lastName);
      showSuccess("Profile updated successfully");
    } catch {
      showError("Failed to update profile. Please try again.");
    }
  };

  // ── Currency form ─────────────────────────────────────────────────────────
  const {
    register: registerCurrency,
    handleSubmit: handleCurrencySubmit,
    reset: resetCurrency,
    formState: { errors: currencyErrors, isSubmitting: currencySubmitting },
  } = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (profile) {
      resetCurrency({ currency: profile.currency });
    }
  }, [profile, resetCurrency]);

  const onCurrencySave = async (data: CurrencyFormData) => {
    try {
      if (!user) return;
      await updateCurrency(user.id, data.currency);
      showSuccess("Currency preference updated");
    } catch {
      showError("Failed to update currency. Please try again.");
    }
  };

  // ── Budget form ───────────────────────────────────────────────────────────
  const {
    register: registerBudget,
    handleSubmit: handleBudgetSubmit,
    reset: resetBudget,
    formState: { errors: budgetErrors, isSubmitting: budgetSubmitting },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (budget) {
      resetBudget({
        amount: formatAmountToString(budget.amount),
        currency: budget.currency as BudgetFormData["currency"],
      });
    } else if (profile) {
      resetBudget({ amount: "", currency: profile.currency });
    }
  }, [budget, profile, resetBudget]);

  const onBudgetSave = async (data: BudgetFormData) => {
    try {
      if (!user) return;
      const amount = formatAmountToNumber(data.amount);
      await upsertBudget(user.id, amount, data.currency, currentMonth, currentYear);
      await refetchDashboard();
      showSuccess("Budget saved successfully");
    } catch {
      showError("Failed to save budget. Please try again.");
    }
  };

  // ── Password form ─────────────────────────────────────────────────────────
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
  });

  const onPasswordSave = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(data.newPassword);
      resetPassword();
      showSuccess("Password changed successfully");
    } catch {
      showError("Failed to change password. Please try again.");
    }
  };

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">
          Manage your profile, budget, and account preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── Profile ─────────────────────────────────────────────────────── */}
        <SettingsSection
          icon={User}
          title="Profile"
          description="Update your display name."
        >
          <form
            onSubmit={handleProfileSubmit(onProfileSave)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" error={profileErrors.firstName?.message}>
                <Input
                  id="firstName"
                  placeholder="John"
                  error={!!profileErrors.firstName}
                  styles="rounded-lg px-3 py-2.5 text-sm"
                  {...registerProfile("firstName")}
                />
              </Field>
              <Field label="Last Name" error={profileErrors.lastName?.message}>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  error={!!profileErrors.lastName}
                  styles="rounded-lg px-3 py-2.5 text-sm"
                  {...registerProfile("lastName")}
                />
              </Field>
            </div>
            <Field label="Email">
              <Input
                id="email"
                type="email"
                value={user?.email ?? ""}
                disabled
                styles="rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed.
              </p>
            </Field>
            <SaveButton isSubmitting={profileSubmitting} />
          </form>
        </SettingsSection>

        {/* ── Currency ─────────────────────────────────────────────────────── */}
        <SettingsSection
          icon={DollarSign}
          title="Currency Preference"
          description="This currency will be shown across your dashboard."
        >
          <form
            onSubmit={handleCurrencySubmit(onCurrencySave)}
            className="flex flex-col gap-4"
          >
            <Field
              label="Default Currency"
              error={currencyErrors.currency?.message}
            >
              <Select
                id="currency"
                options={currencyOptions}
                error={!!currencyErrors.currency}
                styles="bg-white py-2.5 text-sm"
                {...registerCurrency("currency")}
              />
            </Field>
            <SaveButton isSubmitting={currencySubmitting} />
          </form>
        </SettingsSection>

        {/* ── Budget ───────────────────────────────────────────────────────── */}
        <SettingsSection
          icon={Wallet}
          title="Monthly Budget"
          description={`Set your spending limit for ${monthName} ${currentYear}.`}
        >
          <form
            onSubmit={handleBudgetSubmit(onBudgetSave)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Budget Amount"
                error={budgetErrors.amount?.message}
              >
                <div
                  className={clsx(
                    "flex items-center bg-white rounded-lg border overflow-hidden transition-all",
                    budgetErrors.amount
                      ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500"
                      : "border-muted-foreground/30 focus-within:ring-1 focus-within:ring-primary"
                  )}
                >
                  <span className="px-3 text-muted-foreground text-sm font-bold border-r border-muted-foreground/30">
                    {profile ? currencyMapping[profile.currency] : ""}
                  </span>
                  <Input
                    id="budgetAmount"
                    placeholder="200,000"
                    error={!!budgetErrors.amount}
                    styles="rounded-none border-none outline-none px-3 py-2.5 text-sm"
                    {...registerBudget("amount")}
                  />
                </div>
              </Field>
              <Field
                label="Currency"
                error={budgetErrors.currency?.message}
              >
                <Select
                  id="budgetCurrency"
                  options={currencyOptions}
                  error={!!budgetErrors.currency}
                  styles="bg-white py-2.5 text-sm"
                  {...registerBudget("currency")}
                />
              </Field>
            </div>
            {budget && (
              <p className="text-xs text-muted-foreground">
                Current budget: {profile ? currencyMapping[profile.currency] : ""}
                {formatAmountToString(budget.amount)} for {monthName}
              </p>
            )}
            <SaveButton isSubmitting={budgetSubmitting} />
          </form>
        </SettingsSection>

        {/* ── Password ─────────────────────────────────────────────────────── */}
        <SettingsSection
          icon={Lock}
          title="Change Password"
          description="Choose a strong password with at least 8 characters, one uppercase letter, and one number."
        >
          <form
            onSubmit={handlePasswordSubmit(onPasswordSave)}
            className="flex flex-col gap-4"
          >
            <Field
              label="New Password"
              error={passwordErrors.newPassword?.message}
            >
              <Input
                id="newPassword"
                type="password"
                placeholder="New password"
                error={!!passwordErrors.newPassword}
                styles="rounded-lg px-3 py-2.5 text-sm"
                {...registerPassword("newPassword")}
              />
            </Field>
            <Field
              label="Confirm Password"
              error={passwordErrors.confirmPassword?.message}
            >
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                error={!!passwordErrors.confirmPassword}
                styles="rounded-lg px-3 py-2.5 text-sm"
                {...registerPassword("confirmPassword")}
              />
            </Field>
            <SaveButton isSubmitting={passwordSubmitting} />
          </form>
        </SettingsSection>
      </div>
    </div>
  );
}