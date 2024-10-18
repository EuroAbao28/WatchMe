const messageModel = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { message, senderID } = req.body;

    if (!message || !senderID)
      return res.status(400).json({ message: "All fields are required." });

    const response = await messageModel.create({
      message,
      senderID,
    });

    res.status(201).json({ message: "Mesage sent successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    const response = await messageModel
      .find()
      .populate("senderID", "-password")
      .sort({ createdAt: -1 })
      .limit(10);

    // Sort the messages from oldest to newest
    const sortedResponse = response.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    res.status(200).json(sortedResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getMessage };
