import React from "react";
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    test('renders Footer Coponent ', () => {
        render(<Footer />);
        expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
    });
});
