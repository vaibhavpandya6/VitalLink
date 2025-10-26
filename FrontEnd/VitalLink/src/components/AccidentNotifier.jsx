import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const AccidentNotifier = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/alerts");
    setSocket(ws);

    ws.onopen = () => console.log("Connected to alert server");
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "new_accident") {
        const latest = message.data[0];
        toast(`🚨 New Accident: ${latest.title}`, {
          icon: "🚨",
          duration: 5000,
        });
      }
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("Disconnected from alert server");

    return () => ws.close();
  }, []);

  return <Toaster position="top-right" />;
};

export default AccidentNotifier;
