

const scrapeFootball = async () => {
    const url = "https://www.theguardian.com/football/tables";

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const standings = {};

    // Iterate over each league container
    $(".football-table__container").each((index, elem) => {
        const leagueName = $(elem).find('div div table caption a').text().trim();
        const leagueData = {};

        // Iterate over each team row in the table body
        $(elem).find('tbody tr').each((index, teamElem) => {
            const teamName = $(teamElem).find('.table-column--main span').text().trim();
            if (teamName) {
                // Ensure teamName is a string
                const teamNameString = String(teamName);
                
                // Extract additional statistics
                const stats = $(teamElem).find('td.table-column--importance-1, td.table-column--importance-3');
                const teamStats = {
                    "GP": parseInt($(stats[0]).text().trim()),  // Games Played
                    "W": parseInt($(stats[1]).text().trim()),   // Wins
                    "D": parseInt($(stats[2]).text().trim()),   // Draws
                    "F": parseInt($(stats[3]).text().trim()),   // Goals For
                    "A": parseInt($(stats[4]).text().trim()),   // Goals Against
                    "GD": parseInt($(stats[5]).text().trim()),  // Goal Difference
                    "Pts": parseInt($(teamElem).find('td:nth-child(10) b').text().trim())  // Points
                };
                
                leagueData[teamNameString] = teamStats;  // Store team name and stats in league data
            }
        });

        if (Object.keys(leagueData).length > 0) {
            standings[leagueName] = leagueData;  // Add league data to standings
        }
    });

    console.log(standings);
}

scrapeFootball();