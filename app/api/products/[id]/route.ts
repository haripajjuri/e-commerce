import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import { ObjectId } from "mongodb";

interface urlParams{
    params: Promise<{id: string}>;
}

export async function GET(req: Request , {params} : urlParams ){
    const product_id = (await params).id;
    try{
        if(!ObjectId.isValid(product_id)){
            return NextResponse.json({ok:false, message:"invalid product id"}, { status:400})
        }
        
        const product = await prisma.products.findUnique({where:{
            id:product_id
        }})

        if(!product){
            return NextResponse.json({ok:false, message:"no product exist"}, { status:400})
        }

        return NextResponse.json({ok:true, product})
        
    }catch(err){
        const error = (err as Error).message;
        return NextResponse.json({ok:false, error}, { status:500})
    }
} 