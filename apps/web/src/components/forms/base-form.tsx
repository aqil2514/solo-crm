import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export interface BaseFormProps<TInput extends FieldValues, TOutput extends FieldValues> {
  schema: ZodType<TOutput, TInput>;
  defaultValues: DefaultValues<TInput>;
  onSubmit: (values: TOutput) => Promise<void> | void;
  children: (form: UseFormReturn<TInput, unknown, TOutput>) => ReactNode;
  submitLabel?: string;
  className?: string;
}

export function BaseForm<TInput extends FieldValues, TOutput extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel,
  className = "space-y-4",
}: BaseFormProps<TInput, TOutput>) {
  const t = useTranslations("forms");
  const form = useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;
  const defaultSubmitLabel = submitLabel ?? t("submitButton");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Validation Errors:", errors);
        }
        toast.error(t("validationError"));
      })}
      className={className}
    >
      {children(form)}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("submitting") : defaultSubmitLabel}
      </Button>
    </form>
  );
}