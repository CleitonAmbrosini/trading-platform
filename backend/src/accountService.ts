import { AccountDAODatabase, type AccountDAO } from "./AccountDAO";
import { validateCpf } from "./validateCPF";

export class Account {
  accountDAO: AccountDAO;

  constructor() {
    this.accountDAO = new AccountDAODatabase();
  }

  async createAccount(userData: any) {
    this.validateData(userData);

    const accountId = crypto.randomUUID();
    const account = {
      accountId,
      name: userData.name,
      email: userData.email,
      document: userData.document,
      password: userData.password,
    };

    await this.accountDAO.saveAccount(account);
    return { accountId };
  }

  validateData(userData: any) {
    if (!(userData.name.split(" ").length >= 2)) {
      throw new Error("Invalid name.");
    }

    if (!userData.email.match(/.+@.+\..+/)) {
      throw new Error("Invalid email.");
    }

    if (!validateCpf(userData.document)) {
      throw new Error("Invalid CPF.");
    }

    if (!userData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      throw new Error(
        "The password must be at least 8 characters long and include lowercase letters, uppercase letters, and numbers.",
      );
    }
  }
}
