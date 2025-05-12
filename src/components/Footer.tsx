import '../assets/styles/footer.css'
import Logo from '../assets/images/Ride_on_logo.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <img src={Logo} alt="RideOn Logo" />
                        <p>RideOn - Car Rental Made Easy</p>
                    </div>
                    <div className='footer-content'>
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="#" className='nav-links'>About Us</Link></li>
                                <li><Link to="#" className='nav-links'>Cars</Link></li>
                                <li><Link to="#" className='nav-links'>Rented History</Link></li>
                                <li><Link to="#" className='nav-links'>Contact</Link></li>
                                <li><Link to="#" className='nav-links'>Terms of Service</Link></li>
                                <li><Link to="#" className='nav-links'>Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className="footer-contact">
                            <h4>Contact Us</h4>
                            <p>RideOn HQ, 123 Main Street, City</p>
                            <p>+1 234 567 890</p>
                            <p>support@rideon.com</p>
                        </div>

                        <div className="footer-social">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="https://facebook.com/RideOn" target="_blank">Facebook</a></li>
                                <li><a href="https://twitter.com/RideOn" target="_blank">Twitter</a></li>
                                <li><a href="https://instagram.com/RideOn" target="_blank">Instagram</a></li>
                                <li><a href="https://linkedin.com/RideOn" target="_blank">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 RideOn. All Rights Reserved.</p>
                </div>
            </footer>

        </>
    );
}


export default Footer;