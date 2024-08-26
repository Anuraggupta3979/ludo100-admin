import React from "react";
import { Pagination, Row, Col } from "antd";
function CustomPaginationWithPageSize({ currentPage, setCurrentPage, total }) {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L1 6L6 11"
              stroke="#1B2444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L1 11"
              stroke="#1B2444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      );
    }
    return originalElement;
  };

  return (
    <div className="customPagination customPaginationWithPageSize">
      <Row justify={"end"} align={"middle"}>
        <Col>
          <Pagination
            itemRender={itemRender}
            simple
            total={total}
            current={currentPage?.page}
            showTotal={(total, range) => (
              <span className="subDesc pageNumbers">
                {range[0]}-{range[1]} of {total}
              </span>
            )}
            onChange={(page, size) => {
              if (size === currentPage?.limit)
                setCurrentPage({
                  page: page,
                  limit: size,
                });
              else {
                setCurrentPage({
                  page: 1,
                  limit: size,
                });
              }
            }}
            showTitle={false}
            defaultPageSize={currentPage?.limit || 20}
            pageSize={currentPage?.limit || 20}
            defaultCurrent={1}
            hideOnSinglePage
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CustomPaginationWithPageSize;
