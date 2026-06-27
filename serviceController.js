const ServiceModel = require("../models/serviceModel")


exports.createService = async (req,res)=>{
    try{
        const {title,description} = req.body;
        const post = await ServiceModel.create({title,description})


        if(!title || !description){
            res?.status(400).json({
            status: "Title & Descripion required",
        });
    }

        res?.status(201).json({
            status: "Success",
            data:{
                post,
            },
        });



    }catch(err){
         res?.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};

exports.getAllServices = async (req,res)=>{
    try{
        const allData = await ServiceModel.find()

        res?.status(200).json({
            status: "Success",
            data:{
                allData,
            },
        });



    }catch(err){
         res?.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};

exports.getAllServicesById = async (req,res)=>{
    try{

        const {id} = req.params
        const allData = await ServiceModel.findById(id)

        console.log(allData,"data............>")
        

        res?.status(200).json({
            status: "Success",
            data:{
               allData, 
            },
        });



    }catch(err){
         res?.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};

exports.updateService = async (req,res)=>{
    try{
        const data = req.body;
        const {id} = req.params
        const updatedPost = await ServiceModel.findByIdAndUpdate(id,data,{
            new: true,
            runValidators: true
        });
        res?.status(200).json({
            status: "Success",
                updatedPost,
        });

    }catch(err){
         res.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};

exports.deleteService = async (req,res)=>{
    try{
        const data = req.body;
        const {id} = req.params
        const updatedPost = await ServiceModel.findByIdAndDelete(id,data,{
            new: true,
            runValidators: true
        });
        res?.status(200).json({
            status: "Success",
                updatedPost,
        });

    }catch(err){
         res.status(400).json({
            status: "Fail",
            message: err?.message,
    });
    }
};