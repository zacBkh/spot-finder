import LoginOrRegisterForm from "../../components/Forms/LoginOrRegisterForm";

import { useSession } from "next-auth/react";

import PATHS from "../../constants/URLs";
const { DOMAIN } = PATHS;

const Register = ({}) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return (
    <LoginOrRegisterForm
      action={"Register"}
      headerMsg={"Welcome, please register"}
      alternativeMsg={"Already have an account?"}
    />
  );
};

export default Register;

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect protected pages
  if (arrayOfProtectedPaths.includes(pathname)) {
    if (session === null) {
      return NextResponse.redirect(DOMAIN);
    }
  }

  // Prevent logged in user to access to register and sign in
  if (shouldNotBeUser.includes(pathname)) {
    if (session !== null) {
      return NextResponse.redirect(DOMAIN);
    }
  }
}
