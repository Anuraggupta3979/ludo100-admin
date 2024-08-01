import React from "react";
import ChallengeByStatus from "../../components/common/ChallengeByStatus";

function CancelledChallange() {
  return (
    <div>
      <p className="pageHeading">Cancelled Challenge</p>

      <ChallengeByStatus status={"CANCELLED"} />
    </div>
  );
}

export default CancelledChallange;
