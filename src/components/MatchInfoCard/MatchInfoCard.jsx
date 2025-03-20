import DateFormatter from "../DateFormatter/DateFormatter";
const MatchInfoCard = ({matchDetails}) => {
    return (
        <div className="teams-container">
            <div className="team">
                <div className="team-logo">
                    <img
                        src="/rcb.png"
                        alt="Team A Logo"
                        className="team-logo-img"
                    />
                </div>
                <div className="team-name">{matchDetails.homeTeamName}</div>
            </div>

            <div className="match-metadata">
                <p class="versus">vs</p>
                <div class="date">
                    <img src="/calander.svg" alt="location" width="14px" height="14px" />
                    <p>: <DateFormatter date={matchDetails.scheduledDate} /></p>

                </div>
                <div class="venue">
                    <img src="/location.svg" alt="location" width="14px" height="14px" />
                    <p>: {matchDetails.venue}</p>
                </div>
            </div>

            <div className="team">
                <div className="team-logo">
                    <img
                        src="/csk.png"
                        alt="Team B Logo"
                        className="team-logo-img"
                    />
                </div>
                <div className="team-name">{matchDetails.awayTeamName}</div>
            </div>
        </div>
    )
}

export default MatchInfoCard;