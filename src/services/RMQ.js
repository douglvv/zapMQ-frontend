import Api from "./api";

const RMQ = {

    // Connecta no rmq
    start: async () => {
        const res = await Api.post('/start')

        return res;
    },

    // cria uma sala
    createRoom: async (roomName) => {
        const res = await Api.post('/createQueue', { queueName: roomName })

        return res;
    },

    sendMessage: async (queueName, message) => {
        const requestBody = {
            queueName: queueName,
            message: {
                message: message.message,
                timestamp: message.timestamp,
                sender: message.sender,
            },
        };

        try {
            const res = await Api.post('/sendMessage', requestBody);
            return res;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },


}


export default RMQ;