const Announcement = require("../models/announcement.model");
const jwt = require("jsonwebtoken");

// Create
exports.createAnnouncement = async (req, res) => {
  try {
    // bearer token in header
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { title, description} = req.body;
    const newAnnouncement = new Announcement({
      title,
      description,
      createdBy: user.id,
    });
    await newAnnouncement.save();
    res.json({ message: "Announcement created successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Read
exports.getAnnouncements = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const announcements = await Announcement.find({ createdBy: user.id });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Update
exports.updateAnnouncement = async (req, res) => {
  try{
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // user can update title or description or both
    const { title, description } = req.body;
    await Announcement.findByIdAndUpdate(req.params.id, { title, description });
    res.json({ message: "Announcement updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Delete
exports.deleteAnnouncement = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // hard delete right now
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
