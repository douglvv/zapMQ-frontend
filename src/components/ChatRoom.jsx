import { useEffect, useState } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";
import RMQ from '../services/RMQ'
import axios from "axios";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);

  // conecta no servidor do RMQ, cria uma fila e 
  // seta um nome aleatório para o usuario
  const startRMQConn = async () => {
    try {
      await RMQ.start();
      await RMQ.createRoom("chat")

      // gera um nome aleatorio
      const res = await axios.get('https://randomuser.me/api/?results=1');
      const data = res.data;
      const username = data.results[0].login.username;
      localStorage.setItem("username", username);

      console.log("username: ", username);
      console.log("connected to RMQ server");
    } catch (error) {
      console.log(error)
    }
  }

  // recebe as mensagens do consumer
  // caso não tenha mensagens novas apenas retorna
  const consumeQueue = async () => {
    try {
      const receivedMessages = await axios.get("http://localhost:9876/mensagens");

      if (!receivedMessages || !receivedMessages.data) {
        return;
      }
      if (receivedMessages.data.length !== messages.length) {
        setMessages(receivedMessages.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // inicia a conexao
  useEffect(() => {
    startRMQConn()
  }, [])
  
  // ouve por mensagens
  useEffect(() => {
    // busca por novas mensagens a cada 250 milisegundos
    setInterval(() => {
      consumeQueue();
      // console.log(messages)
    }, 500);
  }, [])

  return (
    <div className="lg:col-span-2 lg:block h-screen max-w-5xl mx-auto">
      <div className="w-full">
        <div className="p-3 font-extrabold font- bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-white">
          ZapMQ
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div key={index}>
                <Message message={message} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm handleFormSubmit={'#'} />
      </div>
    </div>
  );
}