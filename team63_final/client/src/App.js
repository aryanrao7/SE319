import { useState } from 'react';
import aryanImage from './images/aryan.jpg';
import nishiImage from './images/nishi.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Todos from './Todos';


function App() {



	const [aboutViewActive, setAboutViewActive] = useState(false);

	const toggleAboutView = () => {
		setAboutViewActive(!aboutViewActive);
	}

	const renderAboutView = () => (
		<div className="about-view">
			<h1>About TaskPro</h1>
			<h3>SE/ComS319 Construction of User Interfaces, Spring 2023</h3>
			<h3>Dr. Abraham N. Aldaco Gastelum</h3>
			<h3>This app was created by Aryan Rao and Nishi Kant</h3>
			<h3>Aryan Rao:aryanrao@iastate.edu</h3>
			<h3>Nishi Kant:nkant@iastate.edu</h3>
			<img src={aryanImage} alt="Aryan" className='about-image' />
			<img src={nishiImage} alt="Nishi" className='about-image' />
			<div className='button' onClick={toggleAboutView}>Close About</div>
		</div>
	);

	return (
		<div className="App">
			<h1>TaskPro</h1>
			<Router>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/todos" element={<Todos />} />
					<Route path="/login" element={<Login />} />
					
					<Route path="/" element={<Login />}>
					</Route>
				</Routes>
			</Router>

			

			<div className="button" onClick={toggleAboutView}>About</div>

			{aboutViewActive ? renderAboutView() : null}
		</div>
	);
}

export default App;