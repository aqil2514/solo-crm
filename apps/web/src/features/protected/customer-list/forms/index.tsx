import { BaseForm } from "@/components/forms/base-form";
import {
  customerSchema,
  defaultValuesCustomer,
} from "../schema/customer.schema";
import {
  FormFieldSelect,
  FormFieldTags,
  FormFieldTextarea,
  FormFieldText,
  FormFieldPhone,
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
          <div className="grid grid-cols-2 gap-4">
            <FormFieldText form={form} name="name" label={t("name")} />
            <FormFieldPhone form={form} name="phone" label={t("phone")} />
          </div>
          <div className="grid grid-cols-2 gap-4">

          <FormFieldText form={form} name="email" label={t("email")} />
          <FormFieldSelect
            form={form}
            name="category"
            label={t("category")}
            options={[{
              label:"Test",
              value:"test"
            }]}
          />
          </div>
          <FormFieldTextarea form={form} name="address" label={t("address")} />
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
