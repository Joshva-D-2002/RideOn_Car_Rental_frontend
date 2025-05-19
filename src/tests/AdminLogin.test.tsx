import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import AdminLogin from "../pages/AdminLogin";
import { BrowserRouter } from "react-router-dom";
import { AdmilLoginApi } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

jest.mock("../api/apiservice", () => ({
    AdmilLoginApi: jest.fn(),
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

describe("AdminLogin Component", () => {
    let navigateMock: jest.Mock;

    beforeEach(() => {
        navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        (AdmilLoginApi as jest.Mock).mockClear();
        (toast.error as jest.Mock).mockClear();

        Storage.prototype.setItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the admin login form", () => {
        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        expect(screen.getByText("Admin Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("back")).toBeInTheDocument();
    });

    test("updates form fields when user types", () => {
        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "adminpass" } });

        expect(emailInput).toHaveValue("admin@example.com");
        expect(passwordInput).toHaveValue("adminpass");
    });

    test("handles successful admin login", async () => {
        (AdmilLoginApi as jest.Mock).mockResolvedValueOnce({
            userId: 101,
            token: "admin_token"
        });

        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "admin@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "adminpass" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(AdmilLoginApi).toHaveBeenCalledWith({
                email: "admin@example.com",
                password: "adminpass"
            });
            expect(localStorage.setItem).toHaveBeenCalledWith("authToken", "admin_token");
            expect(localStorage.setItem).toHaveBeenCalledWith("userId", 101);
            expect(navigateMock).toHaveBeenCalledWith("/admin/dashboard");
        });
    });

    test("handles admin login error", async () => {
        const errorMessage = "Invalid admin credentials";
        (AdmilLoginApi as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    error: errorMessage
                }
            }
        });

        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "wrong@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpass" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(errorMessage);
        });
    });
    test("shows fallback error message when error response is missing", async () => {
        (AdmilLoginApi as jest.Mock).mockRejectedValueOnce({});
        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong");
        });
    });


    test("navigates back when 'back' button is clicked", () => {
        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("back"));
        expect(navigateMock).toHaveBeenCalledWith("/");
    });
});
