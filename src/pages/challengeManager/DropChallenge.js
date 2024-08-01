import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function DropChallenge() {
  return (
    <div>
      <p className="pageHeading">Drop Challenge</p>

      <ChallengeByStatus status="DROP" />
    </div>
  );
}

export default DropChallenge;
