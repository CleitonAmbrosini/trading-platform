import cors from "cors";
import express, { type Request, type Response } from "express";
import { AccountDAODatabase } from "./AccountDAO";
import { Account } from "./accountService";
import { Deposit } from "./depositService";

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/signup", async (req: Request, res: Response) => {
    const userData = req.body;
    const newAccount = new Account();

    try {
      const result = await newAccount.createAccount(userData);
      res.json(result);
    } catch (error: any) {
      res.status(422).json({ message: error.message });
    }
  });

  app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountDatabase = new AccountDAODatabase();

    try {
      const account = accountDatabase.getAccount(
        req.params.accountId as string,
      );
      res.json({ account });
    } catch (error: any) {
      res.status(204).json({ message: "Account not found." });
    }
  });

  app.post("/deposit", async (req: Request, res: Response) => {
    const depositData = req.body;
    const newDeposit = new Deposit();

    try {
      const result = await newDeposit.deposit(depositData);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(422).json({ message: error.message });
      } else {
        res.status(422).json({ message: "An unknown error occurred." });
      }
    }
  });

  app.listen(3000, () => {
    console.log("App linsten port 3000");
  });
}

main();
