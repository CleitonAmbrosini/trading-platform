import { DepositDAODatabase, type DepositDAO } from "./DepositDAO";

export class Deposit {
  depositDAO: DepositDAO;

  constructor() {
    this.depositDAO = new DepositDAODatabase();
  }

  async deposit(depositData: any) {
    if (depositData.value <= 0) {
      return { message: "The value must be greater than 0." };
    }

    if (depositData.asset === "BTC") {
      const currentBTC = await this.depositDAO.getBTC(depositData.accountId);
      const newBTCAmmount = depositData.value + Number(currentBTC);
      await this.depositDAO.saveBTC(newBTCAmmount, depositData.accountId);
    }

    if (depositData.asset === "USD") {
      const currentUSD = await this.depositDAO.getUSD(depositData.accountId);
      const newUSDAmmount = depositData.value + Number(currentUSD);
      await this.depositDAO.saveUSD(newUSDAmmount, depositData.accountId);
    }
    return { message: "Deposit successful." };
  }
}
