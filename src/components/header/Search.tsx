import React, { useState, KeyboardEvent } from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import { useNavigate } from "react-router-dom";
import { sortBySearchData } from "../../slice/SortBySearchSlice";
import { useDispatch } from "react-redux";
import { isDisplay } from "../../slice/SortBySearchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  // 검색된 영화를 가져오는 API
  const getSearchMovieDate = async (inputVal: string) => {
    try {
      const response = await baseSet.get(
        `/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputVal}`
      );
      const copy = response.data;
      dispatch(sortBySearchData(copy));
    } catch (error) {
      console.error("검색실패:", error);
    }
  };

  // 검색창을 나타나게하거나 사라지게 하는 함수
  const inputAppearFunc = () => {
    display === "" ? setDisplay(styles.display) : setDisplay("");
  };

  // 사용자가 엔터 입력 시 실행되는 함수
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key;
    if (inputVal !== "" && keyCode === "Enter") {
      navigate("/movies");
      getSearchMovieDate(inputVal);
      dispatch(isDisplay(false))
      e.currentTarget.value = "";
    }
  };

  return (
    <article className={styles.search}>
      {/* 돋보기 이모티콘 */}
      <label
        htmlFor="search"
        className={`${styles.search_icon_outer} ${display}`}
      >
        <FontAwesomeIcon
          className={styles.search_icon}
          icon={faMagnifyingGlass}
          onClick={inputAppearFunc}
        />
      </label>

      {/* 검색창 */}
      <div className={`${styles.search_input_container}`}>
        <label htmlFor="search" className={styles.search_icon_inner}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
        </label>
        <input
          id="search"
          placeholder=""
          className={styles.search_user_input}
          type={"text"}
          onChange={(event) => {
            const copy = event.target.value;
            setInputVal(copy);
            navigate('/movies')
          }}
          onKeyDown={onKeyDown}
        ></input>
        <span className={styles.recode_btn}></span>
      </div>
    </article>
  );
};

export default Search;
