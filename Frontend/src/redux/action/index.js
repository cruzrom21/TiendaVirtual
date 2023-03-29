// init Cart
export const initCart = (products) => {
    return {
        type: "INITSTATE",
        payload: products
    }
}

// init counter
export const initCartCounter = (products) => {
    return {
        type: "INITSTATECOUNT",
        payload: products
    }
}

// New product
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

// Delete product
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

// clear cart
export const clearItem = () => {
    return {
        type: "CLEARITEM",
        payload: null
    }
}

// increment counter
export const incrementCounter = (product) => {
    return {
        type: "INCREMENT",
        payload: product
    }
}

// decrement counter
export const decrementCounter = (product) => {
    return {
        type: "DECREMENT",
        payload: product
    }
}

// write counter
export const writeCounter = (product) => {
    return {
        type: "WRITE",
        payload: product
    }
}

// update counter
export const updateCounter = (product) => {
    return {
        type: "UPDATECOUNT",
        payload: product
    }
}




