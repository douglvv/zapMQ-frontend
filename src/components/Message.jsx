/* eslint-disable react/prop-types */
import * as timeago from 'timeago.js'
import { format } from "timeago.js";
import pt_BR from 'timeago.js/lib/lang/pt_BR'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// configurações do timeago
timeago.register('pt_BR', pt_BR)
const options = {
    locale: 'pt_BR',
    strings: {
        prefixAgo: 'há',
        prefixFromNow: 'em',
        suffixAgo: null,
        suffixFromNow: null,
        seconds: 'menos de um minuto',
        minute: 'cerca de um minuto',
        minutes: '%d minutos',
        hour: 'cerca de uma hora',
        hours: 'cerca de %d horas',
        day: 'um dia',
        days: '%d dias',
        month: 'cerca de um mês',
        months: '%d meses',
        year: 'cerca de um ano',
        years: '%d anos',
    },
};

export default function Message({ message }) {
    return (
        <>
            <li className={classNames("justify-start flex")}>
                <div>
                    <div>
                        <p className="block text-white font-bold ">{message.sender}</p>
                    </div>
                    <div
                        className={classNames("text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 relative max-w-xl px-4 py-2 rounded-lg shadow")}
                    >
                        <span className="block font-normal ">{message.message}</span>
                    </div>
                    <span className="block text-sm text-gray-700 dark:text-gray-400">
                    {format(message.timestamp, 'pt_BR', options)}
                    </span>
                </div>
            </li>
        </>
    );
}