import {prisma} from "@/lib/prisma"
import {auth} from "@/auth"
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const session = await auth();
    const body = await req.json();

    try{

        if(!session){
            return NextResponse.json({ok:false, guest_cart:true, error:"unauthorized"},{status:401})
        }

        const item = await prisma.cart.upsert({
            where:{
                user_id_product_id:{
                    user_id:session!.user!.id!,
                    product_id:body.product_id
                }
            },
            update:{
                quantity:{
                    increment:1
                }
            },
            create:{
                user_id:session!.user!.id!,
                product_id: body.product_id,
                image:"",
                price:body.price
            }
        })
        return NextResponse.json({ok:true, item})

    }catch(err){
        const error = (err as Error).message;
        return NextResponse.json({ok:false, error},{status:500})
    }
}