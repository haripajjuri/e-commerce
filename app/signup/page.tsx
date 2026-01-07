import { prisma } from "@/lib/prisma"
import {auth} from "@/auth"

export default async function SignUp(){

    /*
    const u = await prisma.users.update({
        where:{
            id: session?.user?.id
        },
        data:{
            cart_items:{
                push:{
                    product_id:"69295e25f21dcf30c64a9721",
                    product_name:"Classic Cotton T-Shirt",
                    image:"",
                    Price:499,
                    quantity:1
                }
            }
        }
    })
        */
    return (
        <>"hello"</>
    )
}