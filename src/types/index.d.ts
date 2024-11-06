export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  avatar: File | null;
}
