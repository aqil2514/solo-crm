import { UseFormReturn, useWatch } from "react-hook-form";
import { FormFieldSelect, FormFieldText } from "@/components/forms";
import { useTranslations } from "next-intl";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";
import { LabelValue } from "@/@types/general";
import { CustomerCategoryBase } from "../../customer-category/interfaces/customer-category.interface";
import {
  CustomerSchemaInput,
  CustomerSchemaOutput,
} from "../schema/customer.schema";

interface Props {
  form: UseFormReturn<CustomerSchemaInput, unknown, CustomerSchemaOutput>;
}

export function CustomerCategorySelect({ form }: Props) {
  const t = useTranslations("customers.form");

  const category = useWatch({
    control: form.control,
    name: "category" as never,
  });

  const isNewCategory = (category as unknown as string) === "__add_new__";

  const { data, isLoading } = useFetch<CustomerCategoryBase[]>(
    ["customer-categories"],
    "customer/categories",
  );

  const options = useMemo<LabelValue<string>[]>(() => {
    if (!data) return [];
    return data.map((d) => ({
      label: d.name,
      value: d.id,
    }));
  }, [data]);

  return (
    <>
      <FormFieldSelect
        form={form}
        name={"category" as never}
        label={t("category")}
        options={options}
        isLoading={isLoading}
        addNewOption={true}
      />

      {isNewCategory && (
        <FormFieldText
          form={form}
          name={"newCategory" as never}
          label={t("newCategoryLabel")}
        />
      )}
    </>
  );
}
