export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Example hardcoded user
  if (username === "admin" && password === "1234") {
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(400).json({ message: "Invalid credentials" });
}
