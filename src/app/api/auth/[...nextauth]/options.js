import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = () => {
  providers: [
    CredentialsProvider({
      name: "Sign Up",
      credentials: {
        firstName: { label: "FirstName", type: "text" },
        lastName: { label: "LastName", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "text" },
        confirmPassword: { label: "ConfirmPassword", type: "password" },
      },
      async authorize(credentials,req){
        
      }
    }),
  ];
};
