import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div className="border-2 min-h-full w-full border-green-500">
      this is the main section
      {/* {session ? (<div className="flex flex-col items-center gap-2">
      <Image src={session.user?.image as string} alt="profile" width={30} height={30}/>
      <div>Hello {session.user?.name}</div>
      <div>{session.user?.email}</div>
      <div>your id is:{session.user?.id}</div>
      <form action={async()=> {
        "use server"
        await signOut()
      }}
      ><button type="submit">Signout</button></form>
      </div>) : (<div className="flex flex-col gap-2 items-center">
        <p>You are not logged in!</p>
        <a href="/login" className="">Login Here</a>
      </div>)} */}
    </div>
  );
}
