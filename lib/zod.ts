import {z} from "zod";

export const loginSchema = z.object({
    email: z.email({message:'please enter correct email'}),
    password : z.string().min(1,{message:"please enter password"})
})