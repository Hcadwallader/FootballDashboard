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

// export const filterStats = () => {
// 	let filteredStats = [];

// 	let currentStats = {};
// 	currentStats['id'] = 'Group A';
// 	currentStats['data'] = [];

// 	for (const g of Stats) {
// 		currentStats.data.push({
// 			x: g.left_foot_passes,
// 			y: g.right_foot_passes,
// 		});
// 	}
// 	filteredStats.push(currentStats);
// 	return filteredStats;
// };

export const testData = () => {
	return TestData;
};

export const getCountries = () => {
	let countryList = [];
	Teams.map((t) => {
		return countryList.push(t.team_name);
	});
	return countryList;
};
export const filterCountriesByWinPercentage = (
	winPercentageRequired,
	playersByTeam
) => {
	let filteredTeams = [];
	for (let team in playersByTeam) {
		if (playersByTeam[team].winPercentage > winPercentageRequired) {
			filteredTeams.push(playersByTeam[team]);
		}
	}
	console.log(filteredTeams);

	let radarData = [];

	radarData.push(filterDataByAttribute('pressures', filteredTeams));
	radarData.push(filterDataByAttribute('tackles', filteredTeams));
	radarData.push(filterDataByAttribute('interceptions', filteredTeams));
	radarData.push(filterDataByAttribute('shots', filteredTeams));
	radarData.push(filterDataByAttribute('passes', filteredTeams));

	// radarData.push(currentItem);
	return radarData;
};

const filterDataByAttribute = (attribute, teams) => {
	let maxValue = -1;
	let currentItem = {};
	currentItem['attribute'] = attribute;
	for (let t in teams) {
		let totalPerTeam = filterTeamByAttribute(teams[t], attribute);
		currentItem[teams[t].name] = totalPerTeam;
		if (totalPerTeam > maxValue) {
			maxValue = totalPerTeam;
		}
	}

	for (let t in teams) {
		currentItem[teams[t].name] = Math.round(
			(currentItem[teams[t].name] / maxValue) * 100
		);
	}
	return currentItem;
};

const filterTeamByAttribute = (team, attribute) => {
	let attributeCount = 0;
	let playerCount = team.players.length;
	for (let player in team.players) {
		attributeCount += team.players[player][attribute];
	}
	return parseFloat((attributeCount / playerCount).toFixed(2));
};

export const filterStats = (playersByTeam) => {
	let filteredStats = [];
	for (let p in playersByTeam) {
		let currentStats = {};
		currentStats['id'] = playersByTeam[p].name;
		currentStats['data'] = [];
		for (let player in playersByTeam[p].players) {
			//console.log(playersByTeam[p].players);
			// if (playersByTeam[p].winPercentage > 0) {
			// 	currentStats.data.push({
			// 		x: playersByTeam[p].players[player].leftFootPasses,
			// 		y: playersByTeam[p].players[player].rightFootPasses,
			// 	});
			// }
			let currentPlayer = playersByTeam[p].players[player];
			currentStats.data.push({
				x: (currentPlayer.leftFootPasses / currentPlayer.passes) * 100,
				y: (currentPlayer.rightFootPasses / currentPlayer.passes) * 100,
			});
		}
		//console.log(playersByTeam[p]);
		filteredStats.push(currentStats);
	}
	console.log(filteredStats);
	return filteredStats;
};

export const mapTeams = () => {
	let playersByTeam = [];
	let players,
		stats = null;
	Teams.map((t) => {
		let mappedMatches = [];
		let currentTeam = {};
		players = filterPlayersByCountry(t.team_name);
		stats = filterStatsByCountry(t.team_id);
		let matches = filterMatchesByCountry(t.team_id);

		matches.map((m) => {
			let mappedMatch = processMatchData(m, t.team_id);
			mappedMatches.push(mappedMatch);
			return mappedMatches;
		});
		let winPercentage = calculateWinPercentage(mappedMatches);
		let mappedPlayer = handledPlayersMapping(players, stats);
		currentTeam = mapCountry(t, mappedPlayer, mappedMatches, winPercentage);
		playersByTeam.push(currentTeam);
		return playersByTeam;
	});
	return playersByTeam;
};

const filterPlayersByCountry = (currentCountry) => {
	return Players.filter((p) => p.country_name === currentCountry);
};

const filterStatsByCountry = (countryId) => {
	return Stats.filter((s) => s.team_id === countryId);
};

const filterMatchesByCountry = (countryId) => {
	return Matches.filter(
		(m) =>
			m.match_home_team_id === countryId ||
			m.match_away_team_id === countryId
	);
};

const processMatchData = (match, countryId) => {
	let isHomeTeam = match.match_home_team_id === countryId;

	let result = checkScore(match.match_home_score, match.match_away_score);
	if (result === null) {
		result = checkScore(
			match.match_home_penalty_score,
			match.match_away_penalty_score
		);
	}
	let matchResult = {
		isHomeTeam: isHomeTeam,
		result: (isHomeTeam && result) || (!isHomeTeam && !result) ? 'W' : 'L',
	};

	return matchResult;
};

const calculateWinPercentage = (mappedMatches) => {
	let matchCount = mappedMatches.length;
	let noOfWins = mappedMatches.filter((m) => m.result === 'W').length;
	return (noOfWins / matchCount) * 100;
};

const checkScore = (homeScore, awayScore) => {
	let result = null;
	if (homeScore !== awayScore) {
		return homeScore > awayScore;
	}
	return result;
};

const handledPlayersMapping = (players, stats) => {
	let mappedPlayers = [];
	for (let s in stats) {
		let matchingPlayer = filterPlayersByPlayerId(
			players,
			stats[s].player_id
		);
		let currentPlayer = mapPlayer(stats[s], matchingPlayer[0]);
		mappedPlayers.push(currentPlayer);
	}
	return mappedPlayers;
};

const filterPlayersByPlayerId = (players, statvalue) => {
	return players.filter((p) => p.player_id === statvalue);
};

const mapPlayer = (stat, player) => {
	return {
		name: player.player_known_name
			? player.player_known_name
			: player.player_name,
		id: player.player_id,
		matchId: stat.match_id,
		minutesPlayed: stat.minutes_played,
		teamPossessionPercentage: stat.team_possession_percentage,
		expectedGoals: stat.xg,
		shots: stat.shots,
		goals: stat.goals,
		tackles: stat.tackles,
		interceptions: stat.interceptions,
		pressures: stat.pressures,
		passes: stat.passes,
		completedPasses: stat.completed_passes,
		leftFootPasses: stat.left_foot_passes,
		rightFootPasses: stat.right_foot_passes,
		shotsFaced: stat.player_shots_faced,
	};
};
const mapCountry = (team, players, matches, winPercentage) => {
	let currentTeam = {};
	currentTeam['name'] = team.team_name;
	currentTeam['id'] = team.team_id;
	currentTeam['colour'] = team.team_first_color;
	currentTeam['players'] = players;
	currentTeam['matches'] = matches;
	currentTeam['winPercentage'] = winPercentage;
	return currentTeam;
};
