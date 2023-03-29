const cart = [];

const sendPost = async (product, endpoint) => {
    let request;

    if (product !== null) {
        request = {
            ...product,
            ip: ""
        };

        request = JSON.stringify(request)
    } else {
        request = null;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: request
    };

    const response = await fetch(endpoint, requestOptions);
    const dataResponse = await response.clone().json();
}

const handleCart = (state = cart, action) => {

    switch (action.type) {
        case "INITSTATE":
            if (action.payload.products !== undefined) {
                return action.payload.products.sort((a, b) => b["id"] - a["id"]);
            } else {
                return state;
            }
            break;

        case "ADDITEM":
            sendPost(action.payload, '../api/cart/add');

            return [
                ...state,
                action.payload
            ].sort((a, b) => b["id"] - a["id"]);

            break;

        case "DELITEM":
            sendPost(action.payload, '../api/cart/del');

            return state = state.filter((x) => {
                return x.identification !== action.payload.identification
            }).sort((a, b) => b["id"] - a["id"]);

            break;

        case "CLEARITEM":
            sendPost(action.payload, '../api/cart/clear');

            return [];

            break;

        case "UPDATECOUNT":
            sendPost(action.payload, '../api/cart/edit');

            state = state.filter((x) => {
                return x.identification !== action.payload.identification
            }); 

            return [
                ...state,
                action.payload
            ].sort((a, b) => b["id"] - a["id"]);
            break;

        default:
            return state;
            break;
    }
}

export default handleCart;
