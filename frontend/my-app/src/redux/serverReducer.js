// serverReducer.js
const initialState = {
    serverName: "",
};

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SERVER_NAME":
            return {
                ...state,
                serverName: action.payload,
            };
        default:
            return state;
    }
};

export default serverReducer;
