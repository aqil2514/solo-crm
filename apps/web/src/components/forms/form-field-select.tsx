import { LabelValue } from "@/@types/general";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { useTranslations } from "next-intl";
import { BasicFormFieldProps } from "./form.interface";

export interface FormFieldSelectProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> extends BasicFormFieldProps<T, TTransformedValues> {
  options: LabelValue[];
}

export function FormFieldSelect<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({
  form,
  name,
  label,
  placeholder,
  options,
  className,
}: FormFieldSelectProps<T, TTransformedValues>) {
  const t = useTranslations("forms");
  const isSubmitting = form.formState.isSubmitting;
  const defaultPlaceholder = placeholder ?? t("selectPlaceholder");

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id={field.name}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "bg-slate-50 border-slate-200 text-slate-900",
                  "focus:ring-amber-500/20 focus:border-amber-500",
                  "h-11 rounded-xl transition-all duration-200",
                  "hover:border-slate-300",
                  // Placeholder state — saat belum ada nilai yang dipilih
                  !field.value && "text-slate-400",
                  className,
                )}
              >
                <SelectValue placeholder={defaultPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
