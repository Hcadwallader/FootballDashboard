import { Matches } from './Data/MatchData';
import { Players } from './Data/PlayerData';
import { Stats } from './Data/StatsData';
import { Teams } from './Data/TeamData';

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
