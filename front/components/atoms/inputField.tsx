"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types/input.types";

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  description,
  error,
  ...rest
}: InputFieldProps) {
  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Input id={id} type={type} placeholder={placeholder} {...rest} />
      {error && <FieldError data-testid={`${id}-error`}>{error}</FieldError>}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
