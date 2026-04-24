import { BaseForm } from "@/components/forms/base-form";
import {
  customerSchema,
  defaultValuesCustomer,
} from "../schema/customer.schema";
import {
  FormFieldSelect,
  FormFieldTags,
  FormFieldTextarea,
  FormFieldText
} from "@/components/forms";
import { useTranslations } from "next-intl";

export function CustomerForm() {
  const t = useTranslations("customers.form");
  return (
    <BaseForm
      schema={customerSchema}
      onSubmit={(values) => console.log(values)}
      defaultValues={defaultValuesCustomer}
    >
      {(form) => (
        <>
          <FormFieldText form={form} name="name" label={t("name")} />
          <FormFieldText form={form} name="phone" label={t("phone")} />
          <FormFieldText form={form} name="email" label={t("email")} />
          <FormFieldTextarea form={form} name="address" label={t("address")} />
          <FormFieldSelect
            form={form}
            name="category"
            label={t("category")}
            options={[]}
          />
          <FormFieldSelect
            form={form}
            name="status"
            label={t("status")}
            options={[]}
          />
          <FormFieldTextarea
            form={form}
            name="notes"
            label={t("notes")}
            rows={4}
          />
          <FormFieldTags form={form} name="tags" label={t("tags")} />
        </>
      )}
    </BaseForm>
  );
}
