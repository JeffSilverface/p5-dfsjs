import { Field, FieldDescription, FieldLabel } from "@/components";
import { Input } from "@/components";
import { InputFieldProps } from "@/types/inputTypes";

export function InputField({
  label,
  type = "text",
  placeholder,
  description,
}: InputFieldProps) {
  return (
    <Field>
      {label && <FieldLabel htmlFor="input-field-username">{label}</FieldLabel>}
      <Input id="input-field-username" type={type} placeholder={placeholder} />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
