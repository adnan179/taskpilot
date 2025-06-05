import { ZodSchema } from "zod";

export const zodValidator =
  <T>(schema: ZodSchema<T>) =>
  (values: unknown): Record<string, string[]> => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    const fieldErrors: Record<string, string[]> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0];
      if (typeof field === "string") {
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
      }
    });
    return fieldErrors;
  };
