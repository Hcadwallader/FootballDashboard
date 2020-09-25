import React, { useEffect, useState } from 'react';
import './App.css';
import {
	mapTeams,
	filterStats,
	getCountries,
} from './services/FootballDataService';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

function App() {
	const [filteredStats, setFilteredStats] = useState({});
	const [originalStats, setOriginalStats] = useState({});
	const [playersByTeam, setPlayersByTeam] = useState({});
	const [currentTeam, setCurrentTeam] = useState('all');
	const [countryList, setCountryList] = useState({});

	useEffect(() => {
		//const footballData = filterStats();
		const countryData = getCountries();
		setCountryList(countryData);
		const data = mapTeams();
		setPlayersByTeam(data);
		//	console.log(footballData);

		const footballData = filterStats(data);
		setFilteredStats(footballData);
		setOriginalStats(footballData);
	}, []);

	const handleFilterTeam = (e) => {
		if (e.target.value === 'all') {
			setFilteredStats(originalStats);
			setCurrentTeam(e.target.value);
			return;
		}
		let newChartData = [];
		setCurrentTeam(e.target.value);
		let newStats = originalStats.find((f) => f.id === e.target.value);
		newChartData.push(newStats);
		setFilteredStats(newChartData);
	};

	const resetGraph = (e) => {
		setCurrentTeam('all');
		setFilteredStats(originalStats);
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<select
						name="country"
						onChange={(e) => handleFilterTeam(e)}
						onBlur={(e) => handleFilterTeam(e)}
						value={currentTeam}
					>
						{' '}
						<option key="all" value="all">
							Please select a team
						</option>
						{Object.values(countryList).map((c, key) => {
							return (
								<option key={key} value={c}>
									{c}
								</option>
							);
						})}
					</select>
					<button
						className="form-spacing"
						onClick={(e) => resetGraph(e)}
					>
						Reset graph
					</button>
					<ResponsiveScatterPlot
						data={filteredStats}
						margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
						xScale={{ type: 'linear', min: 0, max: 'auto' }}
						xFormat={function (e) {
							return e + ' kg';
						}}
						yScale={{ type: 'linear', min: 0, max: 'auto' }}
						yFormat={function (e) {
							return e + ' cm';
						}}
						colors={{ scheme: 'set3' }}
						blendMode="multiply"
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient: 'bottom',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'left-footedness(%)',
							legendPosition: 'middle',
							legendOffset: 46,
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'right-footness(%)',
							legendPosition: 'middle',
							legendOffset: -60,
						}}
						legends={[
							{
								anchor: 'bottom-right',
								direction: 'column',
								justify: false,
								translateX: 130,
								translateY: 0,
								itemWidth: 100,
								itemHeight: 12,
								itemsSpacing: 5,
								itemDirection: 'left-to-right',
								symbolSize: 12,
								symbolShape: 'circle',
								effects: [
									{
										on: 'hover',
										style: {
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				</div>
			</header>
		</div>
	);
}

export default App;
