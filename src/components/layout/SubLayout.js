import React from "react";
function SubLayout({ page, children }) {
  return (
    <div>
      {children} {page}dd
    </div>
  );
}

export default SubLayout;
