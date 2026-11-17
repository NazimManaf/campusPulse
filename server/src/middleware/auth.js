import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function authenticate(req,res,next){
  try{const token=req.headers.authorization?.split(' ')[1]; if(!token)return res.status(401).json({message:'Authentication required'});
    const payload=jwt.verify(token,process.env.JWT_SECRET); const user=await User.findById(payload.sub);
    if(!user)return res.status(401).json({message:'Account no longer exists'}); req.user=user; next();
  }catch{return res.status(401).json({message:'Invalid or expired token'});}
}
export const allowRoles=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'Insufficient permissions'});
