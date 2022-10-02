import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Routers from "../routers/Routers";
import Navbar from "../templates/navbar/Navbar";
import Footer from "../templates/footer/Footer";
import SidePanel from "../templates/sidePanel/SidePanel";

const App = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<div>
			<Navbar setOpenDrawer={setOpenDrawer} />
			<SidePanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
			<Routers />
			<Footer />
			<ToastContainer autoClose={4000} />
		</div>
	);
};

export default App;
