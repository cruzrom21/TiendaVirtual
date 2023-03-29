const products = [];

const handleCounter = (state = products, action) => {

    switch (action.type) {
        case "INITSTATECOUNT":

            if (action.payload.products !== undefined) {
                return action.payload.products;
            } else {
                return state;
            }
            break;

        case "INCREMENT":
            const found = state.find((x) => {
                return x.identification === action.payload.identification
            });

            let increment = found === undefined ? 0 : found.count;

            state = state.filter((x) => {
                return x.identification !== action.payload.identification
            });

            let newPayload = {
                ...action.payload,
            };
            newPayload.count = (increment + 1);

            return [
                ...state,
                newPayload
            ].sort();
            break;

        case "DECREMENT":
            const found1 = state.find((x) => {
                return x.identification === action.payload.identification
            });

            let increment1 = found1 === undefined ? 0 : found1.count;

            state = state.filter((x) => {
                return x.identification !== action.payload.identification
            });

            let newPayload1 = {
                ...action.payload,
            };
            newPayload1.count = (increment1 - 1) < 1 ? 1 : (increment1 - 1);

            return [
                ...state,
                newPayload1
            ].sort();
            break;


        case "WRITE":
            state = state.filter((x) => {
                return x.identification !== action.payload.identification
            });

            let newPayload2 = {
                ...action.payload,
            };
            newPayload2.count = parseInt(action.payload.increment) < 1 ? 1 : parseInt(action.payload.increment);

            return [
                ...state,
                newPayload2
            ].sort();
            break;


        default:
            return state.sort();
            break;
    }
}

export default handleCounter;
