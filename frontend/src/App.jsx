import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    console.log("ooi");
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, document, password }),
    });
    const output = await response.json();
    if (output.accountId) {
      setMessage("success");
      return;
    }
    if (response.status === 422) {
      setMessage(output.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <input
        className="input-name"
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className="input-email"
        type="text"
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="input-document"
        type="text"
        placeholder="document"
        value={document}
        onChange={(event) => setDocument(event.target.value)}
      />
      <input
        className="input-password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="button-signup" type="button" onClick={handleSignup}>
        signup
      </button>
      <span className="span-message">{message}</span>
    </div>
  );
}
