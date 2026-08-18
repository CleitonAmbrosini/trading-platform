import type { UUID } from "node:crypto";

export type UserAccount = {
  account_id: UUID;
  name: string;
  email: string;
  document: string;
  password: string;
  ammount_btc: string;
  ammount_usd: string;
};
