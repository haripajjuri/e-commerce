import {prisma} from "@/lib/prisma"
import {auth} from "@/auth"
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const session = await auth();
    const body = await req.json();
    try{
        if(!session){
            return NextResponse.json({guest_cart:true, message:"unauthorized"},{status:401})
        }
        const item = await prisma.cart.update({
            where:{
                user_id_product_id:{
                    user_id:session!.user!.id!,
                    product_id:body.product_id
                }
            },
            data:{
                quantity:{
                    decrement:1
                }
            }
        })
        return NextResponse.json({item})
    }catch(err){
        const error = (err as Error).message;
        return NextResponse.json({message: error},{status:500})
    }
}