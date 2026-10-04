"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Input from "@/components/ui/Input";
import {
  profileSchema,
  ProfileFormData,
} from "@/lib/validations/settings";
import { updateProfile } from "@/lib/services/settings.service";
import { supabase } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/ui/toast";
import { SettingsSection, Field, SaveButton } from "./SettingsFormElements";

interface ProfileSectionProps {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

function ProfileSection({
  userId,
  email,
  firstName,
  lastName,
}: ProfileSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: { firstName, lastName },
  });

  const onProfileSave = async (data: ProfileFormData) => {
    try {
      await updateProfile(supabase, userId, data.firstName, data.lastName);
      showSuccess("Profile updated successfully");
    } catch {
      showError("Failed to update profile. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={User}
      title="Profile"
      description="Update your display name."
    >
      <form
        onSubmit={handleSubmit(onProfileSave)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First Name" error={errors.firstName?.message}>
            <Input
              id="firstName"
              placeholder="John"
              error={!!errors.firstName}
              styles="rounded-lg px-3 py-2.5 text-sm"
              {...register("firstName")}
            />
          </Field>
          <Field label="Last Name" error={errors.lastName?.message}>
            <Input
              id="lastName"
              placeholder="Doe"
              error={!!errors.lastName}
              styles="rounded-lg px-3 py-2.5 text-sm"
              {...register("lastName")}
            />
          </Field>
        </div>
        <Field label="Email">
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            styles="rounded-lg px-3 py-2.5 text-sm bg-muted text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed.
          </p>
        </Field>
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default ProfileSection;