import axios from 'axios';

export const apicall = async (url: string, method = 'GET', data: any = null) => {
    try {
        const fullUrl = import.meta.env.VITE_BACKEND_API_URL + url;
        const response = await axios({
            url: fullUrl,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken') || ''
            }
        });

        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
