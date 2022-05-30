

let users = [
    {
        id: '1',
        username: 'dhgus',
        password: '123412',
        name: 'dhgus',
        email: 'dhgus125@gmail.com',
        url: 'https://expressjs.com/en/4x/api.html#req.body'
    },
];

export async function findUsername(username){
    return users.find((user) => user.username === username);
}

export async function findId(id) {
    return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}