import "next-auth";

declare module "next-auth" {
  interface User {
    isSuperuser: boolean;
  }

  interface Session {
    user: User; // ✅ Extends the User interface instead of redefining properties
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isSuperuser: boolean;
  }
}
