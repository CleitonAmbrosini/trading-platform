import cors from "cors";
import express, { type Request, type Response } from "express";
import pgp from "pg-promise";
import { validateCpf } from "./validateCPF";

const isValidName = (userName: string) => {
  return userName.split(" ").length >= 2;
};

const isValidEmail = (userEmail: string) => {
  return userEmail.match(/.+@.+\..+/);
};

const isValidPassword = (userPassword: string) => {
  return userPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
};

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  const connection = pgp()("postgres://postgres:123456@localhost:5435/app");

  app.post("/signup", async (req: Request, res: Response) => {
    const userData = req.body;

    if (!isValidName(userData.name)) {
      return res.status(422).json({ message: "Invalid name." });
    }

    if (!isValidEmail(userData.email)) {
      return res.status(422).json({ message: "Invalid email." });
    }

    if (!validateCpf(userData.document)) {
      return res.status(422).json({ message: "Invalid CPF." });
    }

    if (!isValidPassword(userData.password)) {
      return res.status(422).json({
        message:
          "The password must be at least 8 characters long and include lowercase letters, uppercase letters, and numbers.",
      });
    }

    const accountId = crypto.randomUUID();
    const account = {
      accountId,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      password: req.body.password,
    };
    await connection.query(
      "insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)",
      [
        account.accountId,
        account.name,
        account.email,
        account.document,
        account.password,
      ],
    );
    res.json({ accountId });
  });

  app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const [account] = await connection.query(
      "select * from ccca.account where account_id = $1",
      [req.params.accountId],
    );
    if (!account) {
      res.status(204).json({ message: "Account not found." });
    }
    res.json({ account });
  });

  app.listen(3000, () => {
    console.log("App linsten port 3000");
  });
}

main();
