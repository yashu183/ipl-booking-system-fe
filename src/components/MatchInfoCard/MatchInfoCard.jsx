import DateFormatter from "../DateFormatter/DateFormatter";
const MatchInfoCard = ({matchDetails}) => {
    return (
        <div className="teams-container">
            <div className="team">
                <div className="team-logo">
                    <img
                        src={`data:image/png;base64,${matchDetails.homeTeam.logo}`}
                        alt="Team A Logo"
                        className="team-logo-img"
                    />
                </div>
                <div className="team-name">{matchDetails.team.homeTeamName.toUpperCase()}</div>
            </div>

            <div className="match-metadata">
                <p className="versus">vs</p>
                <div className="date">
                    <img src="/calander.svg" alt="location" width="14px" height="14px" />
                    <p>: <DateFormatter date={matchDetails.scheduledDate} /></p>

                </div>
                <div className="venue">
                    <img src="/location.svg" alt="location" width="14px" height="14px" />
                    <p>: {matchDetails.venue}</p>
                </div>
            </div>

            <div className="team">
                <div className="team-logo">
                    <img
                        src={`data:image/png;base64,${matchDetails.awayTeam.logo}`}
                        alt="Team B Logo"
                        className="team-logo-img"
                    />
                </div>
                <div className="team-name">{matchDetails.team.awayTeamName.toUpperCase()}</div>
            </div>
        </div>
    )
}

export default MatchInfoCard;