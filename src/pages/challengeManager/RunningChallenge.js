import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function RunningChallenge() {
  return (
    <div>
      <p className="pageHeading">Running Challenge</p>

      <ChallengeByStatus status="RUNNING" />
    </div>
  );
}

export default RunningChallenge;
