export default function handler(req, res) {
  const { method, body } = req;

  // temporary "database"
  let users = [{ username: "admin", password: "1234" }];

  if (method === "POST" && req.url === "/signup") {
    const { username, password } = body;
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "Signup successful" });
  }

  if (method === "POST" && req.url === "/login") {
    const { username, password } = body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(404).json({ message: "Not Found" });
}
