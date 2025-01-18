export const generatePubSub = () => {
    const events = {};

    return {
        subscribe: (eventName, callback) => {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        },
        publish: (eventName) => {
            events[eventName].forEach(callback => callback());
        }
    };
};