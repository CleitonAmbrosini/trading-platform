import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Should deposit ammount in BTC", async () => {
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
});

test("Should deposit ammount in USD", async () => {
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
});

test("Should not deposit if account does not exist", async () => {
  const depositData = {
    accountId: crypto.randomUUID(),
    asset: "USD",
    value: 2.55,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );

  expect(depositAmmount.data.message).toEqual("Account not found.");
});

test.only("Should not deposit if value is less than or equal  0", async () => {
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
    value: 0,
  };

  const depositAmmount = await axios.post(
    "http://localhost:3000/deposit",
    depositData,
  );

  expect(depositAmmount.data.message).toEqual(
    "The value must be greater than 0.",
  );
});
