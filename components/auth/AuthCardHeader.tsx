// import React from "react";

// type AuthCardHeaderProps = {
//   icon?: React.ReactNode;
//   title: string;
//   subtitle: string;
//   meta?: React.ReactNode;
// };

// /**
//  * The icon/title/subtitle block at the top of every auth card. Defaults
//  * to no icon — pass <AppLogo /> for login/signup/forgot-password states,
//  * or a status circle (success/warning) for confirmation-style states
//  * (e.g. "Check your email", "Account paused").
//  */
// function AuthCardHeader({ icon, title, subtitle, meta }: AuthCardHeaderProps) {
//   return (
//     <div className="px-9 pb-3 pt-9 text-center">
//       {icon && <div className="mb-4 flex justify-center">{icon}</div>}
//       <h1 className="text-[23px] font-extrabold tracking-tight text-foreground">
//         {title}
//       </h1>
//       <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
//         {subtitle}
//       </p>
//       {meta}
//     </div>
//   );
// }

// export default AuthCardHeader;




import React from "react";

type AuthCardHeaderProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
};

/**
 * The icon/title/subtitle block at the top of every auth card. Defaults
 * to no icon — pass <AppLogo /> for login/signup/forgot-password states,
 * or <AuthStatusIcon /> for confirmation-style states (e.g. "Check your
 * email", "Account paused"). subtitle is optional: omit it when the
 * page's message is dynamic (e.g. includes the user's email) and lives
 * in the body instead, to avoid the two rendering duplicate/conflicting
 * text.
 */
function AuthCardHeader({ icon, title, subtitle, meta }: AuthCardHeaderProps) {
  return (
    <div className="px-9 pb-3 pt-9 text-center">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h1 className="text-[23px] font-extrabold tracking-tight text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
      {meta}
    </div>
  );
}

export default AuthCardHeader;