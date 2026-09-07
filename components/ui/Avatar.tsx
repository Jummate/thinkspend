interface AvatarProps {
  initials: string;
  className?: string;
}

function Avatar({ initials, className = "" }: AvatarProps) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(155deg, var(--category-bills), var(--primary-dark))",
      }}
    >
      {initials}
    </span>
  );
}

export default Avatar;