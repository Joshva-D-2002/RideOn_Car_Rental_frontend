import { TextEncoder } from 'util';

global.importMeta = {
    env: {
        VITE_BACKEND_API_URL: 'http://localhost:3000/api',
    },
};


global.TextEncoder = TextEncoder;