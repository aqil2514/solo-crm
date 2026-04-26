import { UseFormReturn, useWatch } from "react-hook-form";
import { FormFieldSelect, FormFieldText } from "@/components/forms";
import { useTranslations } from "next-intl";
import { useFetch } from "@/hooks/use-fetch";
import { useMemo } from "react";
import { LabelValue } from "@/@types/general";
import {
  CustomerSchemaInput,
  CustomerSchemaOutput,
} from "../schema/customer.schema";
import { CustomerStatusBase } from "../../customer-status/interfaces/customer-status.interface";

interface Props {
  form: UseFormReturn<CustomerSchemaInput, unknown, CustomerSchemaOutput>;
}

export function CustomerStatusSelect({ form }: Props) {
  const t = useTranslations("customers.form");

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  const isNewStatus = status === "__add_new__";

  const { data, isLoading } = useFetch<CustomerStatusBase[]>(
    ["customer-status"],
    "customer/status",
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
        name={"status"}
        label={t("status")}
        options={options}
        isLoading={isLoading}
        addNewOption={true}
      />

      {isNewStatus && (
        <FormFieldText
          form={form}
          name={"newStatus"}
          label={t("newStatusLabel")}
        />
      )}
    </>
  );
}
