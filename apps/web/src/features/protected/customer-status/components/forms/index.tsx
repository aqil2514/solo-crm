import { BaseForm, FormFieldText, FormFieldTextarea } from "@/components/forms";
import { useTranslations } from "next-intl";
import { customerStatusSchema, CustomerStatusSchemaType, defaultCustomerStatus } from "../../schema/customer-status.schema";

interface Props {
  defaultValues?: CustomerStatusSchemaType;
  onSubmit: (values: CustomerStatusSchemaType) => Promise<void> | void;
}

export function CustomerStatusForm({ onSubmit, defaultValues }: Props) {
  const t = useTranslations("customer_status.form");
  return (
    <BaseForm
      schema={customerStatusSchema}
      defaultValues={defaultValues ?? defaultCustomerStatus}
      onSubmit={onSubmit}
    >
      {(form) => (
        <>
          <FormFieldText
            form={form}
            name="name"
            label={t("name")}
            placeholder={t("namePlaceholder")}
          />

          <FormFieldTextarea
            form={form}
            name="description"
            label={t("description")}
            placeholder={t("descriptionPlaceholder")}
          />
        </>
      )}
    </BaseForm>
  );
}
