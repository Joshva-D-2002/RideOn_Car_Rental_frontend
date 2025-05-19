import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Booked from "../pages/Booked";
import { getUserRentalDetails } from "../api/apiService";
import { toast } from "react-hot-toast";

jest.mock("../api/apiservice", () => ({
    getUserRentalDetails: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
    },
    Toaster: () => <div>Toaster</div>,
}));

jest.mock("../components/NavBar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("Booked Component", () => {
    const mockBookings = [
        {
            id: 1,
            brand: "Toyota",
            model: "Corolla",
            year: 2020,
            color: "Red",
            image: "car1.jpg",
            status: "active",
            type: "Sedan",
            registration_number: "ABC123",
            start_date: "2023-06-01",
            end_date: "2023-06-07",
            total_price: 350
        },
        {
            id: 2,
            brand: "Honda",
            model: "Civic",
            year: 2021,
            color: "Blue",
            image: "car2.jpg",
            status: "cancelled",
            type: "Sedan",
            registration_number: "XYZ456",
            start_date: "2023-06-10",
            end_date: "2023-06-15",
            total_price: 300
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'userId') return '123';
            return null;
        });
    });

    test("renders loading state initially", async () => {
        (getUserRentalDetails as jest.Mock).mockReturnValue(new Promise(() => { }));
        render(<Booked />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });


    test("shows 'no booking details' if list is empty", async () => {
        (getUserRentalDetails as jest.Mock).mockResolvedValueOnce([]);
        render(<Booked />);

        await waitFor(() => {
            expect(screen.getByText(/No booking Details found/i)).toBeInTheDocument();
        });
    });

    test("shows error toast on fetch failure with error message", async () => {
        const errorMessage = "Failed to fetch bookings";
        (getUserRentalDetails as jest.Mock).mockRejectedValueOnce({
            response: {
                data: { error: errorMessage }
            }
        });

        render(<Booked />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(errorMessage);
        });
    });

    test("shows fallback error message when API error lacks response", async () => {
        (getUserRentalDetails as jest.Mock).mockRejectedValueOnce({});
        render(<Booked />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong");
        });
    });

    test("calls handleCancel when cancel button is clicked", async () => {
        (getUserRentalDetails as jest.Mock).mockResolvedValueOnce(mockBookings);
        render(<Booked />);

        await waitFor(() => {
            const cancelButtons = screen.getAllByText(/Cancel/i);
            expect(cancelButtons.length).toBeGreaterThan(0);
            fireEvent.click(cancelButtons[0]);
        });

    });

    test("displays correct status text for bookings", async () => {
        (getUserRentalDetails as jest.Mock).mockResolvedValueOnce(mockBookings);
        render(<Booked />);

        await waitFor(() => {
            expect(screen.getByText(/active/i)).toBeInTheDocument();
        });
    });
});
