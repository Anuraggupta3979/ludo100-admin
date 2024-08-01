import React from "react";
import ReportByStatus from "../../components/common/ReportByStatus";

function WithdrawalReport() {
  return (
    <div>
      <p className="pageHeading mb-20">Withdrawal Report</p>

      <ReportByStatus status="WITHDRAW" />
    </div>
  );
}

export default WithdrawalReport;
