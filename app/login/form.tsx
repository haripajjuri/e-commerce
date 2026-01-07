"use client"
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import { loginSchema } from "@/lib/zod";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function Login(){


    type loginFormData = z.infer<typeof loginSchema>

    const {
        register,
        handleSubmit,
        formState : {
            errors,
            isSubmitting
        }
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<loginFormData> = async(data) =>{
        const loadingToast = toast.loading("please wait")
        const res = await signIn("credentials", {...data, redirect:false});
        if(res.error){
            toast.dismiss(loadingToast)
            toast.error(res.code as string)
        }else{
            toast.dismiss(loadingToast)
            toast.success("login sucessful")
            redirect("/")
        }
    }

    return(
         <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>

            <input {...register("email")} name="email" placeholder="example@email.com" className="border p-2 rounded-sm" />
            <p className="w-full h-4 text-[12px] px-1 text-red-500">{errors.email?.message}</p>

            <input {...register("password")} type="password" name="password" placeholder="*********" className="border p-2 rounded-sm"/>
            <p className="w-full h-4 text-[12px] px-1 text-red-500">{errors.password?.message}</p>

            <button type="submit" className="border px-2 py-1 rounded-sm">Login</button>
            
        </form>
    )
}