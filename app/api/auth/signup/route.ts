import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function POST(req: Request) {
    const form = await req.formData();
    const exits = await prisma.users.findUnique({where:{email:form.get("email") as string }});
    if(exits){
        return NextResponse.json({ message: "user already exists" }, { status: 409 });
    }
    try{
        await prisma.users.create({
        data:{
            name: form.get("name") as string,
            email: form.get("email") as string,
            password: form.get("password") as string
        }
        })
        return NextResponse.json({message:"User created sucesfully"}, { status:201});

    }catch(err){
        return NextResponse.json({message:"cannot register user"}, {status:500});

    }    
}
