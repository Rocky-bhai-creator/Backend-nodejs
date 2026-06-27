const mongoose = require("mongoose");
const productModel = require("../Models/productModel");

exports.createProduct = async (req, res) => {
    try {

        const data = req.body;

        const post = await productModel.create(data);

        res.status(201).json({
            status: "Success",
            data: post
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const result = await productModel.aggregate([

      // convert string service_id to ObjectId
      {
        $addFields: {
          service_id: { $toObjectId: "$service_id" }
        }
      },

      // join with services collection
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "serviceDetails"
        }
      },

      {
        $unwind: {
          path: "$serviceDetails",
          preserveNullAndEmptyArrays: true
        }
      },

      // sort newest first
      {
        $sort: { createdAt: -1 }
      },

      // pagination + count in single pipeline
      {
        $facet: {

          products: [
            { $skip: skip },
            { $limit: limit },

            {
              $project: {
                productName: 1,
                productPrice: 1,
                product_details: 1,
                createdAt: 1,
                serviceDetails: {
                  _id: 1,
                  title: 1,
                }
              }
            }

          ],

          totalCount: [
            { $count: "total" }
          ]

        }
      }

    ]);

    const products = result[0].products;
    const totalProducts = result[0].totalCount[0]?.total || 0;
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      status: "Success",
      totalProducts,
      totalPages,
      currentPage: page,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      status: "Fail",
      message: error.message
    });

  };
};

exports.getProducts = async (req, res) => {
    try{
        const getAll = await productModel.find()
                res?.status(200).json({
            status: "Success",
            data:{
                getAll,
            },
        });

    }catch(err){
         res?.status(400).json({
            status: "Fail",
            message: err?.message,
        });
    }
}

exports.getAllProductsById = async (req , res)=>{
    try{
        const {id} = req.params
        const getAll = await productModel.findById(id)

        res?.status(200).json({
            status: "Success",
            data:{
                getAll,
            },
        })

    }catch(error){
        res?.status(400).json({
            status: "Fail",
            message: err?.message,
        });
    }
};

exports.updateProduct = async (req , res)=>{
    try{
        const data = req.body
        const {id} = req.params
        const updatedProduct = await productModel.findByIdAndUpdate(id, data)

        res?.status(200).json({
            status: "Success",
            data:{
                updatedProduct,
            },
        })

    }catch(error){
        res?.status(400).json({
            status: "Fail",
            message: err?.message,
        });
    }
};

exports.deleteProduct = async (req , res)=>{
    try{
        // const data = req.body
        const {id} = req.params
        const deletedProduct = await productModel.findByIdAndDelete(id)

        res?.status(200).json({
            status: "Success",
            data:{
                deletedProduct,
            },
        })

    }catch(error){
        res?.status(400).json({
            status: "Fail",
            message: err?.message,
        });
    }
};