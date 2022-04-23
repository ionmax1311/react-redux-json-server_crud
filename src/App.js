import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import DetailsUser from "./pages/DetailsUser";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/addUser' element={<AddUser />} />
					<Route path='/editUser/:id' element={<EditUser />} />
					<Route path='/detailUser/:id' element={<DetailsUser />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
