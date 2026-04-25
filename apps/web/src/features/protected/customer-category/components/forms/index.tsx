import { BaseForm, FormFieldText, FormFieldTextarea } from "@/components/forms";
import {
  customerCategorySchema,
  CustomerCategorySchemaType,
  defaultCustomerCategory,
} from "../../schema/customer-category.schema";
import { useTranslations } from "next-intl";

interface Props {
  defaultValues?: CustomerCategorySchemaType;
  onSubmit: (values: CustomerCategorySchemaType) => Promise<void> | void;
}

export function CustomerCategoryForm({ onSubmit, defaultValues }: Props) {
  const t = useTranslations("customer_categories.form");
  return (
    <BaseForm
      schema={customerCategorySchema}
      defaultValues={defaultValues ?? defaultCustomerCategory}
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
