export default function getRanking(results) {
    // Get matches from the string
    const matches = results.split('\n')
    const ranking = {}
    for (let i = 0; i < matches.length; i++) {
        // Get a match and split it to get two teams and their goals
        const [teamA, teamB] = matches[i].split(', ')
        // Get team name and goals
        const [, team1, goalsA] = teamA.match(/(.+)\s(\d+)/)
        const [, team2, goalsB] = teamB.match(/(.+)\s(\d+)/)

        // Add the team to the rank object if doesn't exist
        if (!ranking[team1]) ranking[team1] = 0
        if (!ranking[team2]) ranking[team2] = 0

        // Add 3 points to team 1
        if (goalsA > goalsB) {
            ranking[team1] += 3
            continue
        }

        // Add 3 points to team 2
        if (goalsA < goalsB) {
            ranking[team2] += 3
            continue
        }

        // Add 1 points to both teams
        if (goalsA === goalsB) {
            ranking[team1]++
            ranking[team2]++
        }
    }

    // Convert ranking object to an array of entries (key-value pairs)
    const sortedRanking = Object.entries(ranking)
        .sort((a, b) => {
            // Sort by points (descending)
            if (b[1] !== a[1]) return b[1] - a[1];
            // If points are the same, sort by team name (ascending)
            return a[0].localeCompare(b[0]);
        });

    let result = '';
    let rank = 1;

    for (let i = 0; i < sortedRanking.length; i++) {
        // Determine whether to use "pt" or "pts" based on the points
        const pointLabel = sortedRanking[i][1] === 1 ? 'pt' : 'pts';

        // If it's not the first team and the points are the same as the previous team, keep the same rank
        if (i > 0 && sortedRanking[i][1] === sortedRanking[i - 1][1]) {
            result += `${rank}. ${sortedRanking[i][0]}, ${sortedRanking[i][1]} ${pointLabel}\n`;
            continue
        }

        // Update the rank based on the current position in the array
        rank = i + 1;
        result += `${rank}. ${sortedRanking[i][0]}, ${sortedRanking[i][1]} ${pointLabel}\n`;
    }

    return result.trim()
}