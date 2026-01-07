import { NextResponse } from "next/server";
import {auth} from "@/auth"
import { prisma } from "@/lib/prisma";

export async function GET(){
    const session = await auth()
    try{
        if(!session){
            return NextResponse.json({ok:false, guest_cart : true, error:"unauthorized"},{status:401})
        }
        const cart = await prisma.cart.findMany({
            where:{
                user_id:session.user?.id
            }
        })
        return NextResponse.json({ok:true, cart})
    }catch(err){
        const error = (err as Error).message;
        return NextResponse.json({ok:false, error},{status:500})
    }
}