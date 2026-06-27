const { client, SERVICE_SID } = require("../Config/twilio");

/**
 * Create Conversation
 */
exports.createConversation = async (req, res) => {
  try {
    const { friendlyName } = req.body;

    const conversation = await client.conversations.v1
      .services(SERVICE_SID)
      .conversations.create({ friendlyName });

    res.status(201).json({
      success: true,
      conversationSid: conversation.sid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add Participant
 */
exports.addParticipant = async (req, res) => {
  try {
    const { conversationSid, identity } = req.body;

    const participant = await client.conversations.v1
      .services(SERVICE_SID)
      .conversations(conversationSid)
      .participants.create({ identity });

    res.json({
      success: true,
      participantSid: participant.sid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Send Message
 */
exports.sendMessage = async (req, res) => {
  try {
    const { conversationSid, author, message } = req.body;

    const msg = await client.conversations.v1
      .services(SERVICE_SID)
      .conversations(conversationSid)
      .messages.create({
        author,
        body: message,
      });

    res.json({
      success: true,
      messageSid: msg.sid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Messages
 */
exports.getMessages = async (req, res) => {
  try {
    const { conversationSid } = req.params;

    const messages = await client.conversations.v1
      .services(SERVICE_SID)
      .conversations(conversationSid)
      .messages.list({ limit: 50 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete Conversation
 */
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationSid } = req.params;

    await client.conversations.v1
      .services(SERVICE_SID)
      .conversations(conversationSid)
      .remove();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};