import { useEffect, useState } from "react";

export default function RealTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Conecta ao backend via SSE
    const eventSource = new EventSource("http://localhost:4000/events");

    // Atualiza o estado com a mensagem mais recente
    eventSource.onmessage = (event) => {
      setCurrentTime(event.data); // Cada mensagem do backend é o horário atualizado
    };

    // Limpa a conexão quando o componente é desmontado
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Relógio em Tempo Real</h1>
      <div className="text-5xl font-mono bg-white p-4 rounded-lg shadow">
        {currentTime || "Aguardando..."}
      </div>
    </div>
  );
}
