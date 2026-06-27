const express = require("express");
const router = express.Router();

const conversationController = require("../Controllers/conversationController");

// Create conversation
router.post("/create", conversationController.createConversation);

// Add participant
router.post("/participant", conversationController.addParticipant);

// Send message
router.post("/message", conversationController.sendMessage);

// Get messages
router.get("/messages/:conversationSid", conversationController.getMessages);

// Delete conversation
router.delete("/:conversationSid", conversationController.deleteConversation);

module.exports = router;