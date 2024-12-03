import { useEffect, useState } from "react";

export default function RealTimeMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/events");

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Mensagens em Tempo Real:</h1>
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-3 bg-gray-100 border border-gray-300 rounded"
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
