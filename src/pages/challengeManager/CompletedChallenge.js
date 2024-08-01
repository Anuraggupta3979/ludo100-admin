import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function CompletedChallenge() {
  return (
    <div>
      <p className="pageHeading">Completed Challenge</p>

      <ChallengeByStatus status={"COMPLETED"} />
    </div>
  );
}

export default CompletedChallenge;
