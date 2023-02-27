import React, { useEffect, useState, useCallback } from "react";
import styles from "./Pagination.module.css";
// import { useSelector } from "react-redux";

interface PaginationType {
  setPage: Function;
  currentPageNum: number;
}

// type SortByDataType = {
//   sortBySearch: {
//     data: {
//       page: number;
//       total_pages: number;
//       total_results: number;
//     };
//   };
// };

const Pagination = ({ setPage, currentPageNum }: PaginationType) => {
  // const sortByDataInfo = useSelector<SortByDataType>((state) => {
  //   return state.sortBySearch.data;
  // }) as any;

  const [totalPages, setTotalPages] = useState(0);
  const [renderPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [firstPage, setFirstPage] = useState(0);
  const [renderPageNum, setRenderPageNum] = useState<number[]>([0]);

  // 페이지네이션 그릴 때 필요한 정보들
  const paginationInfo = useCallback(() => {
    setTotalPages(500);
    setPageGroup(Math.ceil(currentPageNum / renderPage));
    setLastPage(pageGroup * renderPage);
    setFirstPage(lastPage - (renderPage - 1));
  }, [
    currentPageNum,
    lastPage,
    pageGroup,
    renderPage,
  ]);

  // 페이지네이션 그리는 함수
  const paginationFunc = useCallback(() => {
    const pageNumberList = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pageNumberList.push(i);
    }
    setRenderPageNum(pageNumberList);
  }, [firstPage, lastPage]);

  // 이전 페이지 이동
  const prevPageFunc = () => {
    let copy = currentPageNum;
    if (currentPageNum > 1) copy--;
    setPage(copy);
  };

  // 다음 페이지 이동
  const nextPageFunc = () => {
    let copy = currentPageNum;
    if (currentPageNum < totalPages) copy++;
    setPage(copy);
  };

  //---------------useEffect 관리
  useEffect(() => {
    paginationInfo();
  }, [paginationInfo]);

  useEffect(() => {
    paginationFunc();
  }, [paginationFunc]);

  const pageChangeFunc = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <article className={styles.pagination}>
      <nav className={styles.pagination_nav}>
        <button onClick={()=>{
          setPage(1)
        }} className={styles.prev_btn}>
          ◀◀
        </button>
        <button onClick={prevPageFunc} className={styles.prev_btn}>
          ◀
        </button>
        <ul className={styles.pagination_ul}>
          {renderPageNum.map((pageNum: number, i: number) => {
            return (
              <li
                style={
                  pageNum === currentPageNum
                    ? { background: "tomato" }
                    : {
                        background:
                          "linear-gradient(rgba(251, 245, 245, 0.374),transparent)",
                      }
                }
                onClick={() => {
                  pageChangeFunc(pageNum);
                }}
                key={Math.random() * 10000 * i}
              >
                {pageNum}
              </li>
            );
          })}
        </ul>
        <button onClick={nextPageFunc} className={styles.next_btn}>
          ▶
        </button>
        <button onClick={()=>{
          setPage(totalPages)
        }} className={styles.prev_btn}>
          ▶▶
        </button>
      </nav>
    </article>
  );
};

export default Pagination;
