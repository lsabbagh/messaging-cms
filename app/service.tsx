import { getServers } from "dns";
import { getserviceSate } from "./state";

const storageData: Object | any = JSON.parse(localStorage.getItem('token') || '{}');
const token = storageData?.token;


export type propsTypes = {
    username: string,
    password: string,
    title: string,
    participants: [],
    id: string,
    user: any, //object
    updatedUser: any //Object,
};


export const signIn = async ({ username, password }: propsTypes) => {
    const authType = 'cms';
    const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
        },
        body: JSON.stringify({ username, password, authType })
    })
    const data = await response.json();
    console.log('....serice login', data);
    localStorage.setItem('token', JSON.stringify(data));
    return data;
};

export const Logout = async (state: any) => {
    const admin = state?.admin;
    const userId = admin?._id;
    const token = state?.token;
    const authType = 'cms';
    console.log('....logout began', { userId, token, authType });
    const response = await fetch("http://localhost:5000/api/logout/" + userId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
        },
        body: JSON.stringify({ authType })
    });
    console.log('....logout res', response);
    if (!response.ok) {
        console.log('....error logging out',);
        throw new Error('Network response was not ok');
    };

    const data = response.json();
    console.log('....logout', data);

    localStorage.removeItem('token');

    return;
};



export const getAllUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users/list", {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        }
    });

    if (response.status === 401) {
        console.log('....401 logout getAllUsers', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    return data;
};

export const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users/list/users", {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        }
    });

    if (response.status === 401) {
        console.log('....401 logout getUsers', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    return data;
};

export const createUser = async (data: any) => {
    const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        },
        body: JSON.stringify(data)
    });

    if (response.status === 401) {
        console.log('....401 logout createUser', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };
};

export const editUser = async ({ user, updatedUser }: propsTypes) => {
    const response = await fetch("http://localhost:5000/api/users/" + user._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify(updatedUser)
    });

    if (response.status === 401) {
        console.log('....401 logout editUser', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };
    console.log("Success:", updatedUser);

    const data = await response.json();
    return data;
};

export const deleteUser = async (user: any) => {
    const response = await fetch("http://localhost:5000/api/users/" + user._id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        }
    });

    if (response.status === 401) {
        console.log('....401 logout deleteUser', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    return data;
};



export const getGroups = async () => {
    const response = await fetch("http://localhost:5000/api/conversation/groups/list", {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        }
    });

    if (response.status === 401) {
        console.log('....401 logout getGroups', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    console.log('....datagrp', data);
    return data;
};

export const createGroup = async ({ title, participants }: propsTypes) => {
    const response = await fetch("http://localhost:5000/api/conversation/groups/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify({
            title,
            participants,
        })
    });

    if (response.status === 401) {
        console.log('....401 logout createGroup', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();

    // console.log("....Success:", title, participants);
    console.log("....Success22:", data);

    return data
};

export const editGroup = async ({ id, title, participants }: propsTypes) => {
    const response = await fetch("http://localhost:5000/api/conversation/groups/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify({ title, participants })
    });

    if (response.status === 401) {
        console.log('....401 logout editGroup', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };
    console.log("Success3:", title, participants, id);

    const data = await response.json();
    console.log('....data', data);
    return data;
};

export const deleteGroup = async (group: any) => {
    const id = group._id
    console.log('....group', id);
    const response = await fetch("http://localhost:5000/api/conversation/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        },
        body: JSON.stringify({ type: "group" })
    });

    if (response.status === 401) {
        console.log('....401 logout deleteGroup', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    console.log('....res');
    const data = await response.json();
    console.log('....data', data);
    return data;
};



export const Confirm = async () => {
    const password = prompt('enter the super admin password');
    const response = await fetch("http://localhost:5000/api/users/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify({ password }),
    });

    if (response.status === 401) {
        console.log('....401 logout Confirm', {response, storageData});
        await Logout(storageData);
        localStorage.removeItem('token');
        console.log('....', "logout complete Confirm");
        throw new Error('Unauthorized: Logging out user');
    };

    const isConfirmed = await response.json();
    return isConfirmed;
};

export const getAdmins = async () => {
    const confirm = await Confirm();
    if (!confirm) return;

    const response = await fetch("http://localhost:5000/api/users/list/admins", {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        },
    });

    if (response.status === 401) {
        console.log('....401 logout getAdmins', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    console.log('....listadmin', data);
    return data;
};

export const createAdmin = async (values: any) => {
    const confirm = await Confirm();
    if (!confirm) return;

    const response = await fetch("http://localhost:5000/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify(values)
    });

        if (response.status === 401) {
            console.log('....401 logout createAdmin', response);
            await Logout(storageData);
            localStorage.removeItem('token');
            throw new Error('Unauthorized: Logging out user');
        };
};

export const editAdmin = async ({ admin, updatedAdmin }: any) => {
    const confirm = await Confirm();
    if (!confirm) return;

    const response = await fetch("http://localhost:5000/api/users/" + admin._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token,
        },
        body: JSON.stringify(updatedAdmin)
    });

    if (response.status === 401) {
        console.log('....401 logout editAdmin', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    console.log("Success:", admin);
    console.log("Success2:", updatedAdmin);
    const data = await response.json();
    return data;
};

export const deleteAdmin = async (admin: any) => {
    const confirm = await Confirm();
    if (!confirm) return;

    const response = await fetch("http://localhost:5000/api/users/" + admin._id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "authType": "cms",
            "token": token
        },
    });

    if (response.status === 401) {
        console.log('....401 logout deleteAdmin', response);
        await Logout(storageData);
        localStorage.removeItem('token');
        throw new Error('Unauthorized: Logging out user');
    };

    const data = await response.json();
    return data;
};

