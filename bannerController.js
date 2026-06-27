const banner = require("../Models/bannerModel");

// Create Banner
const createBanner = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.path : null;

    const newBanner = new banner({
      title,
      image,
      // Add other fields if schema requires
    });

    const savedBanner = await newBanner.save();
    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: savedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await banner.find();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Banner by ID
const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const bannerData = await banner.findById(id);
    if (!bannerData) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    res.status(200).json({
      success: true,
      data: bannerData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Banner
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedBanner = await banner.findByIdAndUpdate(
      id,
      { title, ...(image && { image }) },
      { new: true, runValidators: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Optional: delete file from filesystem
    // if (deletedBanner.image) fs.unlinkSync(deletedBanner.image);

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};

