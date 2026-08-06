import express, { type Request, type Response } from "express";
import { validateCpf } from "./validateCPF";
const app = express();
app.use(express.json());

const isValidName = (userName: string) => {
  return userName.split(" ").length >= 2;
};

const isValidEmail = (userEmail: string) => {
  return userEmail.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
};

const isValidPassword = (userPassword: string) => {
  return userPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
};

app.post("/signup", (req: Request, res: Response) => {
  const userData = req.body;

  if (!isValidName(userData.name)) {
    return res.status(422).send("Invalid name.");
  }

  if (!isValidEmail(userData.email)) {
    return res.status(422).send("Invalid email.");
  }

  if (!validateCpf(userData.document)) {
    return res.status(422).send("Invalid CPF.");
  }

  if (!isValidPassword(userData.password)) {
    return res
      .status(422)
      .send(
        "The password must be at least 8 characters long and include lowercase letters, uppercase letters, and numbers.",
      );
  }

  const userId = crypto.randomUUID();
  res.send(userId);
});

app.listen(3000, () => {
  console.log("App linsten port 3000");
});
