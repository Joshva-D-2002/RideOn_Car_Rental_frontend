import React from "react";
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from "../components/NavBar";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe("Navbar Component", () => {
    let navigateMock: jest.Mock;
    let dispatchMock: jest.Mock;

    const mockUser = { first_name: 'John', last_name: 'Doe' };

    beforeEach(() => {
        navigateMock = jest.fn();
        dispatchMock = jest.fn();
        ((useDispatch as unknown) as jest.Mock).mockReturnValue(dispatchMock);
        ((useSelector as unknown) as jest.Mock).mockReturnValue(mockUser);
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);

        global.localStorage.clear = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the navbar links and dropdown", () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText("View Available Cars")).toBeInTheDocument();
        expect(screen.getByText("Rented Cars")).toBeInTheDocument();
        expect(screen.getByText("Your Bookings")).toBeInTheDocument();
    });


});
