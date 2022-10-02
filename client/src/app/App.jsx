import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Routers from "../routers/Routers";
import Navbar from "../templates/navbar/Navbar";
import Footer from "../templates/footer/Footer";

const App = () => {
	return (
		<div>
			<Navbar />
			<Routers />
			<Footer />
			<ToastContainer autoClose={4000} />
		</div>
	);
};

export default App;
