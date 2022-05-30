let blog = [{
    id: '1',
    text:'정오현',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
},
{
    id: '2',
    text:'정오현',
    createdAt: Date.now().toString(),
    name: 'dhgus',
    username: 'dhgus',
}
];


export async function getAll () {
    return blog;
};

export async function getAllUsername() {
    return blog.filter((blog) => blog.username === username);
};

export async function getBlogId() {
    return blog.find((blogs) => blogs.id === id);
};

export async function create(text, name, username) {
    const blogs = {
        id: Date.now().toString(),
        text,
        createAt: new Date(),
        name,
        username,
    };
    blog = [blogs, ...blog];
    return blogs;
};

export async function update(id, text){
    const blogs = blog.find((b) => b.id === id);
    if(blogs){
        blogs.text = text;
    }
    return blogs;
};

export async function remove(id) {
    blog = blog.filter(b => b.id !== id);
};

