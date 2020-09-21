import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getTeams } from './services/FootballDataService';

function App() {
	const [teams, setTeams] = useState({});

	useEffect(() => {
		const teamLookup = getTeams();
		setTeams(teamLookup);
	}, []);

	console.log(Object.values(teams));
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				{Object.values(teams).map((t, index) => (
					<p key={index}>{t.team_name}</p>
				))}
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
