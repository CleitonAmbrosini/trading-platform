import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Should be possible to make a BTC withdrawal", async () => {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abcASD123456",
  };

  const userAccount = await axios.post(
    "http://localhost:3000/signup",
    userData,
  );
  expect(userAccount.data.accountId).toBeTruthy();

  const accountId = userAccount.data.accountId;
  const depositData = {
    accountId,
    asset: "BTC",
    value: 2.5,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );
  expect(depositAmmount.data.message).toEqual("Deposit successful.");

  const ammountWithdrawn = await axios.post("http://localhost:3000/withdraw", {
    value: 0.5,
    accountId,
    asset: "BTC",
  });
  expect(ammountWithdrawn.data.message).toEqual(
    "Withdrawal successfully completed.",
  );
});

test("Should be possible to make a USD withdrawal", async () => {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abcASD123456",
  };

  const userAccount = await axios.post(
    "http://localhost:3000/signup",
    userData,
  );
  expect(userAccount.data.accountId).toBeTruthy();

  const accountId = userAccount.data.accountId;
  const depositData = {
    accountId,
    asset: "USD",
    value: 2.55,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );

  expect(depositAmmount.data.message).toEqual("Deposit successful.");

  const ammountWithdrawn = await axios.post("http://localhost:3000/withdraw", {
    value: 0.5,
    accountId,
    asset: "USD",
  });
  expect(ammountWithdrawn.data.message).toEqual(
    "Withdrawal successfully completed.",
  );
});

test("Should not be possible to make a withdrawal if account does not exist", async () => {
  const ammountWithdrawn = await axios.post("http://localhost:3000/withdraw", {
    value: 0.5,
    accountId: crypto.randomUUID(),
    asset: "USD",
  });
  expect(ammountWithdrawn.data.message).toEqual("Account not found.");
});

test("Should not make a BTC withdrawal if the value exceeds the balance", async () => {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abcASD123456",
  };

  const userAccount = await axios.post(
    "http://localhost:3000/signup",
    userData,
  );
  expect(userAccount.data.accountId).toBeTruthy();

  const accountId = userAccount.data.accountId;
  const depositData = {
    accountId,
    asset: "BTC",
    value: 0.1,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );
  expect(depositAmmount.data.message).toEqual("Deposit successful.");

  const ammountWithdrawn = await axios.post("http://localhost:3000/withdraw", {
    value: 0.5,
    accountId,
    asset: "BTC",
  });
  expect(ammountWithdrawn.data.message).toEqual("Insufficient funds.");
});

test("Should not make a USD withdrawal if the value exceeds the balance", async () => {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abcASD123456",
  };

  const userAccount = await axios.post(
    "http://localhost:3000/signup",
    userData,
  );
  expect(userAccount.data.accountId).toBeTruthy();

  const accountId = userAccount.data.accountId;
  const depositData = {
    accountId,
    asset: "USD",
    value: 0.1,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );
  expect(depositAmmount.data.message).toEqual("Deposit successful.");

  const ammountWithdrawn = await axios.post("http://localhost:3000/withdraw", {
    value: 0.5,
    accountId,
    asset: "USD",
  });
  expect(ammountWithdrawn.data.message).toEqual("Insufficient funds.");
});
