import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../components/AboutUs';

describe('AboutUs Component', () => {
    test('renders About Us Component', () => {
        render(<AboutUs />);
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    });
});

