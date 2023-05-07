
export const generateUniqueId = (name: string, length: number, split=false) => {
    const symbols: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id: string = `${name}`;
    if (split) id = `${name}_`;

    for (let i: number = 0; i < length; i++) {
        let index: number = Math.floor(Math.random() * symbols.length);
        id += symbols[index];
    }
    return id;
}