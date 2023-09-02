interface ImportMetaEnv {
	readonly MODE: string;
	readonly BASE_URL: string;
	readonly SSR: boolean;
	readonly PROD: boolean;
	readonly DEV: boolean;
	readonly VITE_API_KEY_FIREBASE: string;
	readonly VITE_AUTH_DOMAIN_FIREBASE: string;
	readonly VITE_DATABASE_URL_FIREBASE: string;
	readonly VITE_PROJECT_ID_FIREBASE: string;
	readonly VITE_STORAGE_BUCKET_FIREBASE: string;
	readonly VITE_MESSAGING_SENDER_ID_FIREBASE: string;
	readonly VITE_APP_ID_FIREBASE: string;
	readonly VITE_MEASUREMENT_ID_FIREBASE: string;
	readonly VITE_VAPID_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
