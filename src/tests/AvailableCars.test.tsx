import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvailableCars from "../pages/AvailableCars";
import { getCarListApi } from "../api/apiService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

jest.mock("../api/apiservice", () => ({
    getCarListApi: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
    },
    Toaster: () => <div>Toaster</div>,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../components/NavBar", () => () => <div>Mocked Navbar</div>);
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("AvailableCars Component", () => {
    const mockCars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Camry",
            year: 2022,
            color: "Black",
            image: "car1.jpg",
            price_per_day: "70",
            status: "available",
            type: "Sedan",
            registration_number: "CAR123",
        },
        {
            id: 2,
            brand: "BMW",
            model: "X5",
            year: 2021,
            color: "White",
            image: "car2.jpg",
            price_per_day: "120",
            status: "rented",
            type: "SUV",
            registration_number: "BMW456",
        },
    ];

    let navigateMock: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });

    test("renders loading state initially", async () => {
        (getCarListApi as jest.Mock).mockReturnValue(new Promise(() => { }));
        render(<AvailableCars />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders only available cars", async () => {
        (getCarListApi as jest.Mock).mockResolvedValueOnce(mockCars);

        render(<AvailableCars />);

        await waitFor(() => {
            expect(screen.getByText(/Toyota Camry 2022/i)).toBeInTheDocument();
            expect(screen.queryByText(/BMW X5/)).not.toBeInTheDocument();
        });
    });

    test("navigates to booking page on button click", async () => {
        (getCarListApi as jest.Mock).mockResolvedValueOnce(mockCars);

        render(<AvailableCars />);

        await waitFor(() => {
            expect(screen.getByText(/Toyota Camry 2022/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Book"));

        expect(navigateMock).toHaveBeenCalledWith("/booking/1");
    });

    test("shows error toast on fetch failure", async () => {
        const errorMessage = "Unable to fetch car list";
        (getCarListApi as jest.Mock).mockRejectedValueOnce({
            response: {
                data: { error: errorMessage },
            },
        });

        render(<AvailableCars />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(errorMessage);
        });
    });

    test("shows nothing when no available cars", async () => {
        const mockEmpty: any[] = [
            { ...mockCars[1] }, // Only rented car
        ];
        (getCarListApi as jest.Mock).mockResolvedValueOnce(mockEmpty);

        render(<AvailableCars />);

        await waitFor(() => {
            expect(screen.queryByText(/Toyota Camry/)).not.toBeInTheDocument();
            expect(screen.queryByText(/BMW X5/)).not.toBeInTheDocument();
        });
    });
    test("shows fallback error message when API error lacks response", async () => {
        (getCarListApi as jest.Mock).mockRejectedValueOnce({});

        render(<AvailableCars />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong");
        });
    });
});
