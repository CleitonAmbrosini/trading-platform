import pgp from "pg-promise";

export interface DepositDAO {
  saveBTC(ammount: number, accountId: string): Promise<void | Error>;
  saveUSD(ammount: number, accountId: string): Promise<void | Error>;
  getBTC(accountId: string): Promise<number | Error>;
  getUSD(accountId: string): Promise<number | Error>;
}

export class DepositDAODatabase implements DepositDAO {
  async saveBTC(ammount: number, accountId: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      await connection.query(
        "UPDATE ccca.account SET ammount_btc = $1 WHERE account_id = $2",
        [ammount, accountId],
      );
      connection.$pool.end();
    } catch (error) {
      connection.$pool.end();
      throw new Error("Cannot deposit ammount", { cause: error });
    }
  }

  async saveUSD(ammount: number, accountId: string) {
    console.log("🚀 ~ DepositDAODatabase ~ saveUSD ~ ammount:", ammount);
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      await connection.query(
        "UPDATE ccca.account SET ammount_usd = $1 WHERE account_id = $2",
        [ammount, accountId],
      );
      connection.$pool.end();
    } catch (error) {
      connection.$pool.end();
      throw new Error("Cannot deposit ammount", { cause: error });
    }
  }

  async getBTC(accountId: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      const currentAmmount = await connection.query(
        "SELECT ammount_btc FROM ccca.account WHERE account_id = $1",
        [accountId],
      );
      connection.$pool.end();
      return currentAmmount[0].ammount_btc;
    } catch (error) {
      connection.$pool.end();
      throw new Error("Cannot get ammount", { cause: error });
    }
  }

  async getUSD(accountId: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5435/app");
    try {
      const currentAmmount = await connection.query(
        "SELECT ammount_usd FROM ccca.account WHERE account_id = $1",
        [accountId],
      );
      if (!currentAmmount.length) {
        return "Account not found.";
      }

      connection.$pool.end();
      return currentAmmount[0].ammount_usd;
    } catch (error) {
      throw new Error("Cannot get USD ammont", { cause: error });
    }
  }
}
