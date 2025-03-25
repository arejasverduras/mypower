import "next-auth";

declare module "next-auth" {
  interface User {
    isSuperuser: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isSuperuser: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isSuperuser: boolean;
  }
}
