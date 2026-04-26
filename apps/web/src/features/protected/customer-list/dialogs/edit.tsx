import { useResourceAction } from "@/hooks/use-resources-action";
import { CustomerBase } from "../interfaces/customer.interface";
import { useCustomerData } from "../provider/customer.provider";
import { BaseEditDialog } from "@/components/molecules/base-edit-dialog";
import { CustomerForm } from "../forms";
import { useMemo } from "react";
import { CustomerSchemaInput } from "../schema/customer.schema";

export function CustomerListEditDialog() {
  const { refetch } = useCustomerData();
  const { isOpen, handleClose, isLoadingData, performAction, data } =
    useResourceAction<CustomerBase>({
      dialogType: "edit",
      endpoint: "/customer/list",
      refetchList: refetch,
      idParamKey: "customerId",
      resourceKey: "customer-list",
      translations: {
        pending: "Mengedit customer edit...",
        success: "Data customer berhasil diedit",
      },
    });

  const formValues = useMemo<CustomerSchemaInput | undefined>(() => {
    if (!data) return undefined;

    return {
      address: data.address,
      category: String(data.category.id),
      email: data.email,
      name: data.name,
      notes: data.notes,
      phone: data.phone_number,
      status: String(data.status.id),
      tags: data.tags ?? [],
    };
  }, [data]);

  return (
    <BaseEditDialog
      open={isOpen}
      onOpenChange={handleClose}
      title={"Edit Pelanggan"}
      description={"Edit pelanggan dulu cuyd"}
      isLoadingData={isLoadingData}
      renderForm={() => (
        <CustomerForm onSubmit={performAction} defaultValues={formValues} />
      )}
    />
  );
}
