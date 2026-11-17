import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},type:{type:String,enum:['room','lab','equipment','facility'],default:'facility'},building:String,capacity:Number,available:{type:Boolean,default:true},notes:String},{timestamps:true});
export default mongoose.model('Resource',schema);
