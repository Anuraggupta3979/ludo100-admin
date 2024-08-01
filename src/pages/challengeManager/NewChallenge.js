import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function NewChallenge() {
  return (
    <div>
      <p className="pageHeading">New Challenge</p>

      <ChallengeByStatus status="NEW" />
    </div>
  );
}

export default NewChallenge;
