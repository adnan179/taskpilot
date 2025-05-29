import { UserPayload } from "./user"; // We'll define this next

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
