import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import RentedCars from "../pages/RentedCars";
import { getCarListApi } from "../api/apiService";
import { toast } from "react-hot-toast";

jest.mock("../api/apiservice", () => ({
    getCarListApi: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
    },
    Toaster: () => <div>Toaster</div>,
}));

jest.mock("../components/NavBar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("RentedCars Component", () => {
    const mockCars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Corolla",
            year: 2020,
            color: "Red",
            image: "car1.jpg",
            price_per_day: "50",
            status: "rented",
            type: "Sedan",
            registration_number: "ABC123",
        },
        {
            id: 2,
            brand: "Honda",
            model: "Civic",
            year: 2021,
            color: "Blue",
            image: "car2.jpg",
            price_per_day: "60",
            status: "available",
            type: "Sedan",
            registration_number: "XYZ456",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        (getCarListApi as jest.Mock).mockReturnValue(new Promise(() => { }));
        render(<RentedCars />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders rented cars only", async () => {
        (getCarListApi as jest.Mock).mockResolvedValueOnce(mockCars);
        render(<RentedCars />);

        await waitFor(() => {
            expect(screen.getByText(/Toyota Corolla 2020/i)).toBeInTheDocument();
            expect(screen.queryByText(/Honda Civic/)).not.toBeInTheDocument();
        });
    });

    test("shows 'no rented cars' if list is empty", async () => {
        (getCarListApi as jest.Mock).mockResolvedValueOnce([]);
        render(<RentedCars />);

        await waitFor(() => {
            expect(screen.getByText(/no rented cars found/i)).toBeInTheDocument();
        });
    });

    test("shows error toast on fetch failure", async () => {
        const errorMessage = "Failed to fetch";
        (getCarListApi as jest.Mock).mockRejectedValueOnce({
            response: {
                data: { error: errorMessage }
            }
        });

        render(<RentedCars />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(errorMessage);
        });
    });

    test("shows fallback error message when API error lacks response", async () => {
        (getCarListApi as jest.Mock).mockRejectedValueOnce({});

        render(<RentedCars />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong");
        });
    });

});
