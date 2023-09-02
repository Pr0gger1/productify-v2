export class Logger {
	static log(...message: any[]): void {
		if (import.meta.env.MODE === 'development') {
			console.log(...message);
		}
	}
}
