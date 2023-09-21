/* eslint-disable react/prop-types */
import { format } from "timeago.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Message({ message }) {
    return (
        <>
            <li className={classNames("justify-start flex")}>
                <div>
                    <div
                        // className={classNames("text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 relative max-w-xl px-4 py-2 rounded-lg shadow")}
                    >
                        <p className="block text-white font-bold ">{message.sender}</p>
                    </div>
                    <div
                        className={classNames("text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 relative max-w-xl px-4 py-2 rounded-lg shadow")}
                    >
                        <span className="block font-normal ">{message.message}</span>
                    </div>
                    <span className="block text-sm text-gray-700 dark:text-gray-400">
                        {format(message.timestamp)}
                    </span>
                </div>
            </li>
        </>
    );
}