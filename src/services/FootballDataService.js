import { Matches } from './Data/MatchData';
import { Players } from './Data/PlayerData';
import { Stats } from './Data/StatsData';
import { Teams } from './Data/TeamData';
import { TestData } from './Data/TestData';

export const getMatches = () => {
	return Matches;
};

export const getPlayers = () => {
	return Players;
};

export const getStats = () => {
	return Stats;
};

export const getTeams = () => {
	return Teams;
};

export const filterStats = () => {
	let filteredStats = [];

	let currentStats = {};
	currentStats['id'] = 'Group A';
	currentStats['data'] = [];

	for (const g of Stats) {
		currentStats.data.push({
			x: g.left_foot_passes,
			y: g.right_foot_passes,
		});
	}
	filteredStats.push(currentStats);
	return filteredStats;
};

export const testData = () => {
	return TestData;
};
