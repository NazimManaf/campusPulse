import {Router} from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import {body,validationResult} from 'express-validator';
import User from '../models/User.js'; import {authenticate} from '../middleware/auth.js';
const r=Router();
r.post('/register',[body('name').trim().notEmpty(),body('email').isEmail(),body('password').isLength({min:8})],async(req,res)=>{const errors=validationResult(req);if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
 const {name,email,password}=req.body; const user=await User.create({name,email,passwordHash:await bcrypt.hash(password,12)});res.status(201).json({user:{id:user.id,name:user.name,email:user.email,role:user.role}});});
r.post('/login',async(req,res)=>{const user=await User.findOne({email:req.body.email}).select('+passwordHash');if(!user||!await bcrypt.compare(req.body.password||'',user.passwordHash))return res.status(401).json({message:'Email or password is incorrect'});
 const token=jwt.sign({sub:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'8h'});res.json({token,user:{id:user.id,name:user.name,email:user.email,role:user.role}});});
r.get('/me',authenticate,(req,res)=>res.json({user:{id:req.user.id,name:req.user.name,email:req.user.email,role:req.user.role}}));
export default r;
