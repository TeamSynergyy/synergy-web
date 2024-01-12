import { setAccessToken } from "app/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function OauthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectUrl = localStorage.getItem("redirect-url-after-auth") || "/";

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) dispatch(setAccessToken(token));

    console.log(token);
    console.log(redirectUrl);
    navigate(redirectUrl);
  }, [location.search]);

  return null;
}

export default OauthRedirect;
