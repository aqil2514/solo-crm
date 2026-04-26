import { BaseForm } from "@/components/forms/base-form";
import {
  createCustomerSchema,
  CustomerSchema,
  defaultValuesCustomer,
} from "../schema/customer.schema";
import {
  FormFieldTags,
  FormFieldTextarea,
  FormFieldText,
  FormFieldPhone,
} from "@/components/forms";
import { useTranslations } from "next-intl";
import { BaseFormComponentProps } from "@/components/forms/form.interface";
import { CustomerCategorySelect } from "./customer-category";
import { CustomerStatusSelect } from "./customer-status";

export function CustomerForm({
  onSubmit,
  defaultValues,
}: BaseFormComponentProps<CustomerSchema>) {
  const t = useTranslations("customers");
  const customerSchema = createCustomerSchema(t);
  return (
    <BaseForm
      schema={customerSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues ?? defaultValuesCustomer}
    >
      {(form) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <FormFieldText form={form} name="name" label={t("form.name")} />
            <FormFieldPhone form={form} name="phone" label={t("form.phone")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormFieldText form={form} name="email" label={t("form.email")} />
            <CustomerCategorySelect form={form} />
          </div>
          <FormFieldTextarea form={form} name="address" label={t("form.address")} />
          <CustomerStatusSelect form={form} />
          <FormFieldTextarea
            form={form}
            name="notes"
            label={t("form.notes")}
            rows={4}
          />
          <FormFieldTags form={form} name="tags" label={t("form.tags")} />
        </>
      )}
    </BaseForm>
  );
}
