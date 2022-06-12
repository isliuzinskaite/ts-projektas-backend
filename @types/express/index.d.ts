// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5
import { AdminDocument } from '../models/admin-model';

declare global {
  namespace Express {
    interface Request {
      tokenData?: {
        email: string,
      },
      authAdminDoc?: AdminDocument
    }
  }
}
