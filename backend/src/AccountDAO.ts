import pgp from "pg-promise";

export interface AccountDAO {
  saveAccount(account: any): Promise<void | Error>;
  getAccount(accountID: string): Promise<string | Error>;
}

export class AccountDAODatabase implements AccountDAO {
  async saveAccount(account: any) {
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      await connection.query(
        "insert into ccca.account (account_id, name, email, document, password, ammount_btc, ammount_usd) values ($1, $2, $3, $4, $5, $6, $7)",
        [
          account.accountId,
          account.name,
          account.email,
          account.document,
          account.password,
          0,
          0,
        ],
      );
      connection.$pool.end();
    } catch (error) {
      connection.$pool.end();
      throw new Error("Cannot create account", { cause: error });
    }
  }

  async getAccount(accountID: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      const [account] = await connection.query(
        "select * from ccca.account where account_id = $1",
        [accountID],
      );

      connection.$pool.end();
      return account;
    } catch (error) {
      connection.$pool.end();
      throw new Error("Cannot get account", { cause: error });
    }
  }
}
