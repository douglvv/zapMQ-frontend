/* eslint-disable react/prop-types */
import * as timeago from 'timeago.js'
import { format } from "timeago.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// configurações do timeago
const customLocaleFunc = (number, index, totalSec) => {
    if (index === 1 && totalSec < 60) {
        return ['há menos de um minuto', 'em menos de um minuto'];
    }

    return [
        ['agora mesmo', 'em breve'],
        ['%s segundos atrás', 'em %s segundos'],
        ['1 minuto atrás', 'em 1 minuto'],
        ['%s minutos atrás', 'em %s minutos'],
        ['1 hora atrás', 'em 1 hora'],
        ['%s horas atrás', 'em %s horas'],
        ['1 dia atrás', 'em 1 dia'],
        ['%s dias atrás', 'em %s dias'],
        ['1 semana atrás', 'em 1 semana'],
        ['%s semanas atrás', 'em %s semanas'],
        ['1 mês atrás', 'em 1 mês'],
        ['%s meses atrás', 'em %s meses'],
        ['1 ano atrás', 'em 1 ano'],
        ['%s anos atrás', 'em %s anos'],
    ][index];
};
timeago.register('pt_BR', customLocaleFunc)
const options = {
    locale: 'pt_BR',
    strings: {
        prefixAgo: 'há',
        prefixFromNow: 'em',        
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