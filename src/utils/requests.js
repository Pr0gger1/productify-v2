
export const sendRequestWithDelay = async (callback, ms) => {
    await new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                callback();
                resolve('success');
            }, ms)
        }
        catch (error) {
            reject(error)
        }
    })
}