export interface CustomerBase {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  notes: string;
  tags: string[];
  category: { name: string };
  status: { name: string };
}
