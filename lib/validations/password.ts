import { z } from "zod";
import { passwordRequirements } from "./passwordRequirements";

export const passwordSchema = passwordRequirements.reduce(
  (schema, requirement) =>
    schema.refine((password) => requirement.test(password), {
      message: `Password must include ${requirement.label.toLowerCase()}`,
    }),
  z.string().min(1, "Password is required"),
);