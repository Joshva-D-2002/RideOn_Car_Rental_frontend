import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Booking from "../pages/Booking";
import { getCarApi, getuserApi } from "../api/apiService";
import toast from "react-hot-toast";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

jest.mock("../api/apiservice", () => ({
    getCarApi: jest.fn(),
    getuserApi: jest.fn(),
    addBookingApi: jest.fn(),
    carStatusUpdateApi: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        error: jest.fn(),
        success: jest.fn(),
    },
    Toaster: () => <div>Toaster</div>,
}));


jest.mock("../components/NavBar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("Booking Component", () => {
    const mockCar = {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        color: "Red",
        image: "car1.jpg",
        price_per_day: 50,
        status: "available",
        type: "Sedan",
        registration_number: "ABC123",
    };

    const mockUser = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone_number: "1234567890",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('userId', '1');
    });

    test("renders car and user details successfully", async () => {
        (getCarApi as jest.Mock).mockResolvedValueOnce(mockCar);
        (getuserApi as jest.Mock).mockResolvedValueOnce([mockUser]);

        render(
            <Router>
                <Booking />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText(/Toyota Corolla 2020/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue("John")).toBeInTheDocument();
        });
    });
    test('should update start_date and end_date when user selects a date', () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        );
        const startDateInput = screen.getByLabelText(/start date/i);
        const endDateInput = screen.getByLabelText(/end date/i);

        expect((startDateInput as HTMLInputElement).value).toBe('');
        expect((endDateInput as HTMLInputElement).value).toBe('');

        fireEvent.change(startDateInput, { target: { value: '2025-05-20' } });
        expect((startDateInput as HTMLInputElement).value).toBe('2025-05-20');

        fireEvent.change(endDateInput, { target: { value: '2025-05-25' } });
        expect((endDateInput as HTMLInputElement).value).toBe('2025-05-25');
    });
    test("shows generic error toast when API fails without specific error", async () => {
        (getCarApi as jest.Mock).mockRejectedValueOnce(new Error("Unknown error"));

        render(
            <Router>
                <Booking />
            </Router>
        );

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong");
        });
    });


});
