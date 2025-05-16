import { apicall } from "../helper/axioscall";

export const loginApi = async (loginData: { email: string, password: string }) => {
    try {
        const response = await apicall('/login', 'POST', loginData);
        return response;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export const getuserApi = async (userId: number) => {
    try {
        const response = await apicall(`/user/list/${userId}`);
        return response;
    } catch (error) {
        console.error('Get User Api Error', error)
        throw error;
    }
}

export const AdmilLoginApi = async (loginData: { email: string, password: string }) => {
    try {
        const response = await apicall('/admin/login', 'POST', loginData);
        return response;
    }
    catch (error) {
        console.error('Admin Login Api Error ', error)
        throw error;
    }
}

export const getCarListApi = async () => {
    try {
        const response = await apicall('/car/list');
        return response;
    }
    catch (error) {
        console.error('Get Cars Api Error', error)
        throw error
    }
}

export const getCarApi = async (carId: number) => {
    try {
        const response = await apicall(`/car/list/${carId}`)
        return response;
    }
    catch (error) {
        console.error('Get Car Api Error', error)
        throw error
    }
}

export const addBookingApi = async (bookingData: {
    car_id: number, user_id: number, start_date: string, end_date: string, total_price: number
    discount_id: number, status: string
}) => {
    try {
        const response = await apicall('/rental/add', 'POST', bookingData);
        return response;
    }
    catch (error) {
        console.error('Booking Api Error', error)
        throw error
    }
}

export const carStatusUpdateApi = async (id: number) => {
    try {
        const response = await apicall(`/car/status/update/${id}`, 'PATCH', {
            status: 'rented'
        });
        return response;
    } catch (error) {
        console.error('Car Status Update Error:', error);
        throw error;
    }
};

export const getUserRentalDetails = async (userId: number) => {
    try {
        const response = await apicall(`/rental/user/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.error('Get Users Rental Api Error', error);
        throw error;
    }
};


