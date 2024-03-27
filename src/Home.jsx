import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URL } = import.meta.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URL,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "), // chuyen mang thanh string
    prompt: "consent",
    access_type: "offline", // luu token
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
const googleOAuthUrl = getGoogleAuthUrl();
export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("new_user");
    window.location.reload();
  };
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Login Google OAuth 2.0</h1>
      <p className='read-the-docs'>
        {isAuthenticated ? (
          <>
            <span>You are login with Google</span>
            <br />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login</Link>
        )}
        <br />
      </p>
    </>
  );
}
