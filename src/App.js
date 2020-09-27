import React, { useEffect, useState } from 'react';
import './App.css';
import {
	mapTeams,
	filterStats,
	getCountries,
	testData,
	filterCountriesByWinPercentage,
} from './services/FootballDataService';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ResponsiveRadar } from '@nivo/radar';

function App() {
	const [filteredStats, setFilteredStats] = useState({});
	const [originalStats, setOriginalStats] = useState({});
	const [playersByTeam, setPlayersByTeam] = useState({});
	const [currentTeam, setCurrentTeam] = useState('all');
	const [countryList, setCountryList] = useState({});
	const [exampleData, setExampleData] = useState({});
	const [radarData, setRadarData] = useState({});

	useEffect(() => {
		//const footballData = filterStats();
		const countryData = getCountries();
		setCountryList(countryData);
		const data = mapTeams();
		setPlayersByTeam(data);
		//	console.log(footballData);
		setExampleData(testData());
		const footballData = filterStats(data);
		setFilteredStats(footballData);
		setOriginalStats(footballData);
		let test = filterCountriesByWinPercentage(50, data);
		setRadarData(test);
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
				<div className="row">
					<div className="container column">
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
							margin={{
								top: 60,
								right: 140,
								bottom: 70,
								left: 90,
							}}
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
					<div className="container column">
						<h3>What makes a winning team?</h3>
						<p>(How did France win the world cup 2018)</p>
						<ResponsiveRadar
							data={radarData}
							keys={['France', 'Croatia', 'Belgium']}
							indexBy="attribute"
							maxValue="auto"
							margin={{
								top: 70,
								right: 80,
								bottom: 40,
								left: 80,
							}}
							curve="linearClosed"
							borderWidth={2}
							borderColor={{ from: 'color' }}
							gridLevels={5}
							gridShape="circular"
							gridLabelOffset={36}
							enableDots={true}
							dotSize={10}
							dotColor={{ theme: 'background' }}
							dotBorderWidth={2}
							dotBorderColor={{ from: 'color' }}
							enableDotLabel={true}
							dotLabel="value"
							dotLabelYOffset={-12}
							colors={{ scheme: 'nivo' }}
							fillOpacity={0.25}
							blendMode="multiply"
							animate={true}
							motionStiffness={90}
							motionDamping={15}
							isInteractive={true}
							legends={[
								{
									anchor: 'top-left',
									direction: 'column',
									translateX: -50,
									translateY: -40,
									itemWidth: 80,
									itemHeight: 20,
									itemTextColor: '#999',
									symbolSize: 12,
									symbolShape: 'circle',
									effects: [
										{
											on: 'hover',
											style: {
												itemTextColor: '#000',
											},
										},
									],
								},
							]}
						/>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
