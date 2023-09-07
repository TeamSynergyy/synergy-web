import { useEffect, useState } from "react";

export default function Test() {
  const [id, setId] = useState("");
  function login() {
    const eventSource = new EventSource(
      `http://localhost:8080/subscribe/` + id,
      { withCredentials: true }
    );

    eventSource.addEventListener("sse", function (event) {
      console.log(event.data);

      const data = JSON.parse(event.data);

      (async () => {
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification("코드 봐줘", {
            body: data.content,
          });

          setTimeout(() => {
            notification.close();
          }, 10 * 1000);

          notification.addEventListener("click", () => {
            window.open(data.url, "_blank");
          });
        };

        // 브라우저 알림 허용 권한
        let granted = false;

        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          const permission = await Notification.requestPermission();
          granted = permission === "granted";
        }

        // 알림 보여주기
        if (granted) {
          showNotification();
        }
      })();
    });
  }

  return (
    <>
      <input type="text" id="id" onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={login}>
        로그인
      </button>
    </>
  );
}
