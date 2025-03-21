import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    isSuperuser: boolean;
  }


  interface Session {
    user: User;
  }
}

