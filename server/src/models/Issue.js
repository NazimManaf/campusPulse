import mongoose from 'mongoose';
const issueSchema = new mongoose.Schema({
  title:{type:String,required:true,trim:true,maxlength:120},
  description:{type:String,required:true,maxlength:1500},
  category:{type:String,enum:['Network','Classroom','Electrical','Water','Cleanliness','Safety','Other'],default:'Other'},
  location:{building:{type:String,required:true},room:{type:String,default:''},qrCode:{type:String,default:''}},
  priority:{type:String,enum:['low','medium','high','critical'],default:'medium'},
  status:{type:String,enum:['open','acknowledged','in_progress','resolved','rejected'],default:'open'},
  affectedCount:{type:Number,min:1,default:1},
  reportedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
  updates:[{message:String,by:{type:mongoose.Schema.Types.ObjectId,ref:'User'},at:{type:Date,default:Date.now}}]
},{timestamps:true});
issueSchema.index({status:1,priority:1,createdAt:-1});
issueSchema.index({'location.building':1,category:1});
export default mongoose.model('Issue',issueSchema);
