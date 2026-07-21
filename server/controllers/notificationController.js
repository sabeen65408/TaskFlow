const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

module.exports = {
  getNotifications,
};