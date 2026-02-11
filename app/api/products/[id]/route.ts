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
            return NextResponse.json(
                {message:"invalid product id"},
                { status:404}
            )
        }
        
        const product = await prisma.products.findUnique({where:{
            id:product_id
        }})

        if(!product){
            return NextResponse.json(
                {message:"no product exist"}, 
                { status:404}
            )
        }

        return NextResponse.json({product})
        
    }catch(err){
        const error = (err as Error).message;
        return NextResponse.json({message: error}, { status:500})
    }
} 