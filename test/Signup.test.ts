import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Should create a user account", async function () {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abc123456",
  };

  const response = await axios.post("http://localhost:3000/signup", userData);

  expect(response.data).toBeTruthy();
});

test("Should not create a user account with invalid name", async function () {
  const userData = {
    name: "John",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abc123456",
  };

  const response = await axios.post("http://localhost:3000/signup", userData);

  expect(response.status).toBe(422);
  expect(response.data).toEqual("Invalid name.");
});

test("Should not create a user account with invalid email", async function () {
  const userData = {
    name: "John Doe",
    email: "john.doeemail.com.br",
    document: "665.531.800-91",
    password: "abc123456",
  };

  const response = await axios.post("http://localhost:3000/signup", userData);

  expect(response.status).toBe(422);
  expect(response.data).toEqual("Invalid email.");
});

test("Should not create a user account with invalid document", async function () {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-90",
    password: "abc123456",
  };

  const response = await axios.post("http://localhost:3000/signup", userData);

  expect(response.status).toBe(422);
  expect(response.data).toEqual("Invalid CPF.");
});

test("Should not create a user account with invalid password", async function () {
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com.br",
    document: "665.531.800-91",
    password: "abc123",
  };

  const response = await axios.post("http://localhost:3000/signup", userData);

  expect(response.status).toBe(422);
  expect(response.data).toEqual(
    "The password must be at least 8 characters long and include lowercase letters, uppercase letters, and numbers.",
  );
});
