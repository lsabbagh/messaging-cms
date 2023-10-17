import React from "react";

const [state, setState] = React.useState({});

const retrieveAdmin = () => {
    const dataString = localStorage.getItem('token');
    if (dataString) {
        const data: any = JSON.parse(dataString);
        setState(data);
    }
};

React.useEffect(() => {
    retrieveAdmin();
}, [state]);

export const getserviceSate = () => {
    setState(state);
    return state
};

export const setServiceState = (data: any) => {
    setState(data);
};

