import { WithdrawDAODatabase, type WithdrawDAO } from "./WithdrawDAO";

export class Withdraw {
  withdrawDAO: WithdrawDAO;

  constructor() {
    this.withdrawDAO = new WithdrawDAODatabase();
  }

  async withdraw(withdraw: any) {
    if (withdraw.asset === "BTC") {
      const withdrawResult = await this.withdrawDAO.withdrawBTC(
        withdraw.value,
        withdraw.accountId,
      );
      return { message: withdrawResult };
    }
    if (withdraw.asset === "USD") {
      const withdrawResult = await this.withdrawDAO.withdrawUSD(
        withdraw.value,
        withdraw.accountId,
      );
      return { message: withdrawResult };
    }
  }
}
