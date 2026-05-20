export type InputFieldProps = {
  id: string;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "file"
    | "hidden";
  placeholder?: string;
  description?: string;
};
