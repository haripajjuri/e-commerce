import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    let page:number = Math.max(Number(searchParams.get("page")) || 1 , 1);
    let limit:number = Math.max(Number(searchParams.get("limit")) || 10, 1);

    try{
        const total_products_count = await prisma.products.count();

        const total_pages = Math.ceil(total_products_count/limit);

        const products = await prisma.products.findMany({
            skip:(page-1)*limit,
            take:limit
        });        

        return NextResponse.json({
            ok :true,
            products,
            pagination:{
                page,
                limit,
                total_pages,
                total_products_count,
                hasNextPage: page < total_pages,
                hasPreviousPage: page > 1 
            }
        })
    }catch(err){
        const error = (err as Error).message
        return NextResponse.json({ok:false, error}, {status:500})
    }
}