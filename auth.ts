import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/lib/prisma"

class userNotFound extends CredentialsSignin {
    code = "USER_NOT_FOUND"
}

class noPassword extends CredentialsSignin {
    code = "NO_PASSWORD_EXIST"
}

class wrongPassword extends CredentialsSignin {
    code = "WRONG_PASSWORD"
 }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
    Credentials({
        async authorize(credentials)  {
            const user = await prisma.users.findUnique({where:{email:credentials.email! as string}})
            if(!user){
                throw new userNotFound();
            }
            if(! user.password) {
                throw new noPassword();
            }
            if(user.password != credentials.password){
                throw new wrongPassword();
            }
            return user;
        },
     })

  ],

  
  callbacks:{
    async signIn({user}) {
        const exist = await prisma.users.findUnique({where:{email:user.email!}})
        if(!exist){
            await prisma.users.create({
                data:{
                    name:user.name!,
                    email:user.email!,
                    image:user.image!
                }
            })
        }
        return true;
    },

    async jwt({token, user}){
        if(user){
            const db_user = await prisma.users.findUnique({where:{email:user.email!}})
            token.id = db_user?.id;
        }
       return token
    },

    async session({session, token}){
        session.user = {
            ...session.user,
            id: token.id as string
        }
        return session
    }

  }
})