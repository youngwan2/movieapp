import styles from './SortByDate.module.css'
import { useEffect, useState, useCallback, type ChangeEvent, type ReactElement } from 'react'
import { baseSet } from '../../store/slice/movieSlice'
import { API_KEY } from '../../pages/HomePage'
import { useAppDispatch } from '../../app/hooks'
import { sortBySearchData, isDisplay } from '../../store/slice/sortbySearchSlice'
interface SortByDataType {
  setPage: (result: number) => void
}
const SortByData = ({ setPage }: SortByDataType): ReactElement => {
  const dispatch = useAppDispatch()

  // 연도 데이터 저장
  const [rangeVal, setRangeVal] = useState('')
  const userRangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setRangeVal(e.currentTarget.value)
  }

  // 연도별 영화 정보 가져오는 API
  const sortByYearGetMovie = useCallback(
    (year: string) => {
      baseSet
        .get(
          `/3/discover/movie?api_key=${API_KEY}&language=ko-KR&include_adult=false&include_video=false&year=${year}&with_watch_monetization_types=flatrate`
        )
        .then((response) => {
          dispatch(sortBySearchData(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    [dispatch]
  )

  useEffect(() => {
    sortByYearGetMovie(rangeVal)
  }, [rangeVal, sortByYearGetMovie])

  return (
    <div className={styles.sortByDate}>
      <div className={styles.range_input_label_con}>
        <label
          className={styles.range_input_label}
          htmlFor="sortDate_range_input"
        >
          연도별
        </label>
      </div>
      <input
        id={styles.sortByDate_range_input}
        type={'range'}
        min="2000"
        max={'2030'}
        step={'1'}
        onClick={() => {
          setPage(1)
          dispatch(isDisplay(false))
        }}
        onChange={userRangeInput}
      ></input>
      <div className={styles.sortByDate_rangeVal}>
        {rangeVal === '' ? '2000 ~ 2030' : rangeVal}
      </div>
    </div>
  )
}

export default SortByData
