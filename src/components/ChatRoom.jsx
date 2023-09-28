import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";
import RMQ from '../services/RMQ'
import axios from "axios";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

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

      if (!receivedMessages || !receivedMessages.data) return;
      if (receivedMessages.data.length !== messages.length) {
        setMessages(receivedMessages.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    startRMQConn(); // inicia a conexao

    setInterval(() => { // loop para buscar mensagens a cada 250ms
      consumeQueue();
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // scrolla para o final quando recebe uma nova mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "instant",
    });
  }, [messages.length]);


  return (
    <div className="lg:col-span-2 lg:block h-screen max-w-5xl mx-auto">
      <div className="w-full">
        <div className="p-3 font-extrabold bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-white flex justify-between">
          <div className="flex justify-start">
            <img src="/zap.svg" alt="" width={33} height={33} />
            <p className="p-3 text-gray-400">ZapMQ</p>
          </div>
          <div>
            <p className="p-3 font-normal text-gray-400">{localStorage.getItem("username")}</p>
          </div>
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? messagesEndRef : null} // seta a ref na ultima mensagem
              >
                <Message message={message} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm />
      </div>
    </div>
  );
}