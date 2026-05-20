'use client'

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types/inputTypes";

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  description,
}: InputFieldProps) {
  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Input id={id} type={type} placeholder={placeholder} />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
