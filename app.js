const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb");
const express = require("express");

const app = express();
const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: '"userId" is required' });
  }

  try {
    const command = new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    });
    const { Item } = await docClient.send(command);

    if (Item) {
      res.json(Item);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const command = new ScanCommand({ TableName: USERS_TABLE });
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

app.put("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, age, college, batch } = req.body;
  if (!userId || !name || !email || !age || !college || !batch) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: { userId, name, email, age, college, batch },
    });
    await docClient.send(command);
    res.status(200).json({ message: "User updated successfully", userId, name, email, age, college, batch });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Could not update user" });
  }
});

app.post("/register", async (req, res) => {
  const { userId, name, email, age, college, batch } = req.body;
  if (!userId || !name || !email || !age || !college || !batch) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: { userId, name, email, age, college, batch },
    });
    await docClient.send(command);
    res.status(201).json({ message: "User created successfully", userId, name, email, age, college, batch });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: '"userId" is required' });
  }

  try {
    const command = new DeleteCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    });
    await docClient.send(command);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Could not delete user" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;

