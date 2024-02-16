// serverActions.js
export const setServerName = (serverName) => {
    return {
        type: "SET_SERVER_NAME",
        payload: serverName,
    };
};
