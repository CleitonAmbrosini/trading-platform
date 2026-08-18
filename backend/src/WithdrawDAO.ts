import pgp from "pg-promise";
import { AccountDAODatabase, type AccountDAO } from "./AccountDAO";
import type { UserAccount } from "./types";

export interface WithdrawDAO {
  withdrawBTC(value: number, accoundId: string): Promise<string | Error>;
  withdrawUSD(value: number, accoundId: string): Promise<string | Error>;
}

export class WithdrawDAODatabase implements WithdrawDAO {
  accountDAO: AccountDAO;

  constructor() {
    this.accountDAO = new AccountDAODatabase();
  }

  async withdrawBTC(value: number, accoundId: string) {
    const account = (await this.accountDAO.getAccount(
      accoundId,
    )) as UserAccount;
    if (!account) {
      return "Account not found.";
    }
    if (!(Number(account.ammount_btc) >= value)) {
      return "Insufficient funds.";
    }
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      const newBTCAmmount = Number(account.ammount_btc) - value;
      await connection.query(
        "UPDATE ccca.account SET ammount_btc = $1 WHERE account_id = $2",
        [newBTCAmmount, accoundId],
      );
      connection.$pool.end();
      return "Withdrawal successfully completed.";
    } catch (error) {
      connection.$pool.end();
      throw new Error("Withdrawal cannot be completed.", { cause: error });
    }
  }

  async withdrawUSD(value: number, accoundId: string) {
    const account = (await this.accountDAO.getAccount(
      accoundId,
    )) as UserAccount;
    if (!account) {
      return "Account not found.";
    }
    if (!(Number(account.ammount_usd) >= value)) {
      return "Insufficient funds.";
    }
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      const newUSDAmmount = Number(account.ammount_usd) - value;
      await connection.query(
        "UPDATE ccca.account SET ammount_usd = $1 WHERE account_id = $2",
        [newUSDAmmount, accoundId],
      );
      connection.$pool.end();
      return "Withdrawal successfully completed.";
    } catch (error) {
      connection.$pool.end();
      throw new Error("Withdrawal cannot be completed.", { cause: error });
    }
  }
}
