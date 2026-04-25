import { BaseForm, FormFieldText, FormFieldTextarea } from "@/components/forms";
import {
  customerCategorySchema,
  CustomerCategorySchemaType,
  defaultCustomerCategory,
} from "../../schema/customer-category.schema";

interface Props {
  defaultValues?: CustomerCategorySchemaType;
  onSubmit: (values: CustomerCategorySchemaType) => Promise<void> | void;
}

export function CustomerCategoryForm({ onSubmit, defaultValues }: Props) {
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
            label="Nama Pelanggan"
            placeholder="Misal : John..."
          />

          <FormFieldTextarea
            form={form}
            name="description"
            label="Deskripsi"
            placeholder="Pelanggan yang sudah repeat order"
          />
        </>
      )}
    </BaseForm>
  );
}
