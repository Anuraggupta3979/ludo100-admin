import React from "react";
import ReportByStatus from "../../components/common/ReportByStatus";

function BonusReport() {
  return (
    <div>
      <p className="pageHeading mb-20">Bonus Report</p>

      <ReportByStatus status="BONUS" />
    </div>
  );
}

export default BonusReport;
