
export const sendRequestWithDelay = async (callback: () => void, ms: number) => {
    await new Promise((resolve, reject): void => {
        try {
            setTimeout((): void => {
                callback();
                resolve("success");
            }, ms)
        }
        catch (error) {
            reject(error)
        }
    })
}