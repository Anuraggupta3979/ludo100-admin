import React from "react";
import ReportByStatus from "../../components/common/ReportByStatus";

function PenaltyReport() {
  return (
    <div>
      <p className="pageHeading mb-20">Penalty Report</p>

      <ReportByStatus status="PENALTY" />
    </div>
  );
}

export default PenaltyReport;
