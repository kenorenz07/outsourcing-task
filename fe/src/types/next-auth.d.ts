import { UserType } from "@/shared/models/User.model";
import "next-auth";

/**
 * Attach fields into session.user object
 */
declare module "next-auth" {
  export interface Session {
    user: UserType & { token: string, expires_at: string  };
  }
}