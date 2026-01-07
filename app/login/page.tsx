import { signIn } from "@/auth";
import Login from "./form";


export default function SignIn(){
    return(
        <div className="flex flex-col h-screen justify-center items-center gap-3">
            
           < Login />
            <p>Or</p>
            <form action={async () => {
                "use server"
                await signIn("google",{ redirectTo: "/" });
            }}>
            <button type="submit" className="border rounded-sm px-2 py-1">Login with google</button>
        </form>
        </div>
    )
}