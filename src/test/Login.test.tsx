import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { loginApi, getuserApi } from "../api/apiservice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { toast } from 'react-hot-toast';

jest.mock("../api/apiservice", () => ({
    loginApi: jest.fn(),
    getuserApi: jest.fn(),
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

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

describe("Login Component", () => {
    let navigateMock: jest.Mock;
    let dispatchMock: jest.Mock;

    beforeEach(() => {
        navigateMock = jest.fn();
        dispatchMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        ((useDispatch as unknown) as jest.Mock).mockReturnValue(dispatchMock);
        (loginApi as jest.Mock).mockClear();
        (getuserApi as jest.Mock).mockClear();
        (toast.error as jest.Mock).mockClear();


        Storage.prototype.setItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the login form", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText("Welcome back")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("RideOn! Car Rental")).toBeInTheDocument();
        expect(screen.getByText("Login as an admin")).toBeInTheDocument();
    });

    test("updates form fields when user types", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("password123");
    });


    test("handles successful login", async () => {
        const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
        (loginApi as jest.Mock).mockResolvedValueOnce({
            userId: 1,
            token: "mock_token"
        });
        (getuserApi as jest.Mock).mockResolvedValueOnce([mockUser]);

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(loginApi).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123"
            });
            expect(getuserApi).toHaveBeenCalledWith(1);
            expect(localStorage.setItem).toHaveBeenCalledWith("authToken", "mock_token");
            expect(localStorage.setItem).toHaveBeenCalledWith("userId", 1);
            expect(dispatchMock).toHaveBeenCalledWith(loginSuccess({
                user: mockUser,
                token: "mock_token",
                isAuthenticated: true
            }));
            expect(navigateMock).toHaveBeenCalledWith("/dashboard");
        });
    });

    test("handles login error", async () => {
        const errorMessage = "Invalid credentials";
        (loginApi as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    error: errorMessage
                }
            }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(errorMessage);
        });
    });

    test("navigates to admin login when button clicked", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Login as an admin"));
        expect(navigateMock).toHaveBeenCalledWith("/admin/login");
    });
});