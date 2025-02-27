import { taskModel } from "../models/taskModel.js";


//GETTING ALL TASKS FOR SPECIFIC USER
export async function allTasks(req,res) {
    
    try {
        const tasks=await taskModel.find({user:req.body.userId})
        res.json({success:true,tasks})
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//GETTING SPECIFIC TASKS OF THE USER BY UNIQUE TASK ID GENERETED IN DATABASE
export async function specificTask(req,res) {
    const id=req.params.id;
    try {
        const task=await taskModel.findById(id);
        res.json({success:true,task})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//ADDING TASKS FOR THE USER WHO LOGGED IN
export async function addTask(req,res) {

    try {
        const {title,description,priority,dueDate,status}=req.body;

        const task=new taskModel({
            user:req.body.userId,
            title,
            description,
            priority,
            dueDate,
            status
        })
    
        await task.save();
        res.json({success:true,task});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }



}

//UPDATING TASKS FOR USER AND IT IS DONE BY SPECIFIC ID OF TASKSMODEL
export async function updateTask(req,res) {

    const {id}=req.params;
    try {
        const {title,description,priority,dueDate,status}=req.body;

        const task=taskModel.findById(id);

        if(!task){
            res.json({message:"No task found"})
        }

        const updatedTask={
            title:title||task.title,
            description:description||task.description,
            priority:priority||task.priority,
            dueDate:dueDate||task.dueDate,
            status:status||task.status,
        }

        const modifiedTask=await taskModel.findByIdAndUpdate(id,updatedTask);



    
        await modifiedTask.save();
        res.json({success:true,modifiedTask,message:"Updated Successfully"});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }



}

//DELETE TASKS BY THE TASK _ID
export async function deleteTask(req,res) {
    const id=req.params.id;
    try {
        const task=await taskModel.findByIdAndDelete(id);
        res.json({success:true,task,message:"Succesfully deleted"})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}