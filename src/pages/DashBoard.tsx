import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import carImage1 from '../assets/images/car-image.png';
import '../assets/styles/dashboard.css';
function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="content-container">
                    <div className="text-container">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repellat omnis facere illo, quis, minus neque </h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, pariatur dolores eligendi reprehenderit quam, officiis libero nisi, mollitia nobis quo iure quod sed hic ad quas exercitationem magni id quia.</p>
                    </div>
                    <img src={carImage1} alt="Car Image" />
                </div>
                <br />
                <AboutUs />
                <Footer />
            </div >
        </>
    );
}

export default Dashboard;