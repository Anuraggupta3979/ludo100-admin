import React from "react";
import ReportByStatus from "../../components/common/ReportByStatus";

function DepositReport() {
  return (
    <div>
      <p className="pageHeading mb-20">Deposit Report</p>

      <ReportByStatus status="DEPOSIT" />
    </div>
  );
}

export default DepositReport;
