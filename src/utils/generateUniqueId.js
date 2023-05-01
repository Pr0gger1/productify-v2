export function generateUniqueId(name, length, split=false) {
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = `${name}`;
    if (split)
        id = `${name}_`;


    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * symbols.length);
        id += symbols[index];
    }
    return id;
}