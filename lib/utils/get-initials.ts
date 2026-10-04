interface ProfileLike {
  firstName?: string | null;
  lastName?: string | null;
}

export function getInitials(
  profile: ProfileLike | null,
  email?: string | null,
): string {
  if (profile?.firstName || profile?.lastName) {
    const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`;
    if (initials) return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}