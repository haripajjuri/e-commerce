import { notFound } from "next/navigation"

type props = {
    params : {id:string}
}

export default async function Product({params} : props){
    const {id} = (await params)
    
    const res = await fetch(`http://localhost:3000/api/products/${id}`)

    if(res.status === 404){
        notFound()
    }
    if(!res.ok){
        throw new Error('server error');
    }

    const {product} = await res.json()
    
    return(
        <div className="h-svh flex">

            <div className="border flex-1">image section</div>

            <div className="border flex-1">

            </div>
        </div>
    )
}