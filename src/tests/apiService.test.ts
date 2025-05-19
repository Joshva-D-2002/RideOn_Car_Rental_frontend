import React from 'react';
import { loginApi, getuserApi, AdmilLoginApi, getCarListApi, getCarApi, addBookingApi, carStatusUpdateApi, getUserRentalDetails } from '../api/apiService';
import { apicall } from '../helper/axioscall';

jest.mock('../helper/axioscall', () => ({
    apicall: jest.fn(),
}));

describe('API Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('loginApi should return response when successful', async () => {
        const mockResponse = { token: '12345' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const loginData = { email: 'user@example.com', password: 'password123' };
        const response = await loginApi(loginData);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('loginApi should throw error when failed', async () => {
        const mockError = new Error('Login failed');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const loginData = { email: 'user@example.com', password: 'password123' };

        await expect(loginApi(loginData)).rejects.toThrow('Login failed');
    });

    test('getuserApi should return user data when successful', async () => {
        const mockResponse = { userId: 1, name: 'John Doe' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const userId = 1;
        const response = await getuserApi(userId);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('getuserApi should throw error when failed', async () => {
        const mockError = new Error('User not found');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const userId = 1;

        await expect(getuserApi(userId)).rejects.toThrow('User not found');
    });

    test('AdmilLoginApi should return response when successful', async () => {
        const mockResponse = { token: 'adminToken123' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const loginData = { email: 'admin@example.com', password: 'adminpassword' };
        const response = await AdmilLoginApi(loginData);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('AdmilLoginApi should throw error when failed', async () => {
        const mockError = new Error('Admin login failed');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const loginData = { email: 'admin@example.com', password: 'adminpassword' };

        await expect(AdmilLoginApi(loginData)).rejects.toThrow('Admin login failed');
    });

    test('getCarListApi should return car list when successful', async () => {
        const mockResponse = [{ carId: 1, carName: 'Car1' }];
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const response = await getCarListApi();

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('getCarListApi should throw error when failed', async () => {
        const mockError = new Error('Failed to fetch cars');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        await expect(getCarListApi()).rejects.toThrow('Failed to fetch cars');
    });

    test('getCarApi should return car details when successful', async () => {
        const mockResponse = { carId: 1, carName: 'Car1' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const carId = 1;
        const response = await getCarApi(carId);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('getCarApi should throw error when failed', async () => {
        const mockError = new Error('Car not found');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const carId = 1;

        await expect(getCarApi(carId)).rejects.toThrow('Car not found');
    });

    test('addBookingApi should return success response when successful', async () => {
        const mockResponse = { bookingId: 123, status: 'confirmed' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const bookingData = {
            car_id: 1,
            user_id: 1,
            start_date: '2025-05-20',
            end_date: '2025-05-25',
            total_price: 500,
            discount_id: 1,
            status: 'pending',
        };
        const response = await addBookingApi(bookingData);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('addBookingApi should throw error when failed', async () => {
        const mockError = new Error('Booking failed');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const bookingData = {
            car_id: 1,
            user_id: 1,
            start_date: '2025-05-20',
            end_date: '2025-05-25',
            total_price: 500,
            discount_id: 1,
            status: 'pending',
        };

        await expect(addBookingApi(bookingData)).rejects.toThrow('Booking failed');
    });

    test('carStatusUpdateApi should return success response when successful', async () => {
        const mockResponse = { carId: 1, status: 'rented' };
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const carId = 1;
        const response = await carStatusUpdateApi(carId);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('carStatusUpdateApi should throw error when failed', async () => {
        const mockError = new Error('Car status update failed');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const carId = 1;

        await expect(carStatusUpdateApi(carId)).rejects.toThrow('Car status update failed');
    });

    test('getUserRentalDetails should return rental details when successful', async () => {
        const mockResponse = [{ rentalId: 1, carName: 'Car1', status: 'active' }];
        (apicall as jest.Mock).mockResolvedValue(mockResponse);

        const userId = 1;
        const response = await getUserRentalDetails(userId);

        expect(apicall).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    test('getUserRentalDetails should throw error when failed', async () => {
        const mockError = new Error('Failed to get user rental details');
        (apicall as jest.Mock).mockRejectedValue(mockError);

        const userId = 1;

        await expect(getUserRentalDetails(userId)).rejects.toThrow('Failed to get user rental details');
    });
});
