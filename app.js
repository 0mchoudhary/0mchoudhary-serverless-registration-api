const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
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
      res.status(404).json({
        error: "User not found",
        message: `No user found with userId: ${userId}. Please check the ID and try again.`,
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      error: "Could not retrieve user",
      message: "An internal error occurred while retrieving the user. Please try again later.",
    });
  }
});

app.post("/register", async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: '"userId" must be a non-empty string' });
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: '"name" must be a non-empty string' });
  }

  try {
    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: { userId, name },
    });
    await docClient.send(command);
    res.status(201).json({ message: "User created successfully", userId, name });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Could not create user",
      message: "An internal error occurred while creating the user. Please try again later.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;

