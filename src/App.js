import React, { useEffect, useState } from 'react';
import './App.css';
import { testData } from './services/FootballDataService';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

function App() {
	//	const [teams, setTeams] = useState({});
	//const [stats, setStats] = useState({});
	const [filteredStats, setFilteredStats] = useState({});

	useEffect(() => {
		//const teamLookup = getTeams();
		//	const statsLookup = getStats();
		const filteredresults = testData();
		//	setTeams(teamLookup);
		//	setStats(statsLookup);
		setFilteredStats(filteredresults);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{/* {Object.values(teams).map((t, index) => (
					<p key={index}>{t.name}</p>
				))} */}
				<div className="container">
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
						blendMode="multiply"
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient: 'bottom',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'weight',
							legendPosition: 'middle',
							legendOffset: 46,
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'size',
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
