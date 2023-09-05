import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

export default function useAuth() {
  const [auth, setAuth, removeAuth] = useLocalStorage({
    key: "token",
  });
  useEffect(() => {
    console.log("useAuth is running");
  }, []);

  return { auth, setAuth, removeAuth };
}
