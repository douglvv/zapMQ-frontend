import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import RMQ from "../services/RMQ";


export default function ChatForm() {
  const [message, setMessage] = useState("");


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const date = Date.now;
    const msg = {
      message: message,
      timestamp: date.toString(),
      sender: localStorage.getItem("username")
    }

    await RMQ.sendMessage("chat", msg)
    console.log('mensagem enviada: ', msg)

    setMessage("");
  };

  return (
    <div >
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <button >
            <EmojiHappyIcon
              className="h-7 w-7 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
            />
          </button>

          <input
            type="text"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-[90deg]"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}