import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function ConflictChallenges() {
  return (
    <div>
      <p className="pageHeading">Conflict Challenge</p>

      <ChallengeByStatus status={"CONFLICT"} />
    </div>
  );
}

export default ConflictChallenges;
