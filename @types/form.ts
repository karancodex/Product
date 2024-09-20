import { FormApi } from "@tanstack/react-form";

export interface FormProps<T> {
  value: T;
  formApi: FormApi<T, undefined>;
}
