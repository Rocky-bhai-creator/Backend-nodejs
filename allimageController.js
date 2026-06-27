const AllMedia = require("../Models/allimageModel");

exports.createFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded"
      });
    }

    const newImage = await AllMedia.create({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    res.status(201).json({
      status: "success",
      message: "File Uploaded Successfully",
      data: newImage
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await AllMedia.find();
    res.status(200).json({
      status: "success",
      results: files.length,
      data: files
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const file = await AllMedia.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        status: "error",
        message: "File not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: file
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.updateFile = async (req, res) => {
  try {
    let updateData = {};
    if (req.file) {
      updateData.filename = req.file.filename;
      updateData.path = req.file.path;
      updateData.mimetype = req.file.mimetype;
      updateData.size = req.file.size;
    }

    const file = await AllMedia.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!file) {
      return res.status(404).json({
        status: "error",
        message: "File not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: file
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.selectiveDelete = async (req, res) => {
  try {
    const deleted = await AllMedia.deleteMany({ _id: { $in: req.query.ids } });
    res.status(200).json({
      status: "success",
      message: `${deleted.deletedCount} files deleted`
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deleted = await AllMedia.deleteMany({});
    res.status(200).json({
      status: "success",
      message: `${deleted.deletedCount} files deleted`
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const file = await AllMedia.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({
        status: "error",
        message: "File not found"
      });
    }
    res.status(200).json({
      status: "success",
      message: "File deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};