import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

interface urlParams{
    params: Promise<{slug: string}>;
}

export async function GET(req: Request , {params} : urlParams ){
    const slug = (await params).slug;
    try{
        const product = await prisma.products.findUnique({where:{
            slug
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
