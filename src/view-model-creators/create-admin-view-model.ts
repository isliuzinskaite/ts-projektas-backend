import { AdminDocument } from '../models/admin-model';

export type AdminViewModel = {
  id: string,
  email: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

const createAdminViewModel = (admin: AdminDocument): AdminViewModel => ({
  id: admin._id.toString(),
  email: admin.email,
  name: admin.name,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

export default createAdminViewModel;
