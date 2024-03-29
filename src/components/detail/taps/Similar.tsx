/* eslint-disable @typescript-eslint/naming-convention */
import styles from './Similar.module.css'
import { type ReactElement, Suspense } from 'react'
import NotFind from './NotFind'
import { useNavigate } from 'react-router-dom'
import {
  type SimilarContentType,
  type SimilarMovieListType,
  type SimilarType
} from './Similar.types'
import Spinner from '../../spinner/Spinner'

// Similar 컴포넌트
const Similar = ({ apiData }: SimilarType): ReactElement => {
  const navigate = useNavigate()
  return (
    <section className={styles.similar}>
      {apiData.results[0] !== undefined
        ? apiData.results.map((movieList: SimilarMovieListType) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { title, release_date, adult, vote_average, vote_count } =
            movieList
          return (
            <section
              className={styles.similar_card}
              key={movieList.id}
              style={
                movieList.poster_path !== null
                  ? {
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundImage: `url(
                        https://image.tmdb.org/t/p/w200${movieList.poster_path})`
                    }
                    // 이미지가 존재하지 않을 경우 대체 이미지를 로드 한다
                  : {
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${
                        process.env.PUBLIC_URL + '/noimage.png'
                      })`
                    }
              }
              onClick={() => {
                window.scrollTo({ top: 0 })
                navigate(`/movieapp/detail/${movieList.id}`)
              }}
            >
              <Suspense fallback={<Spinner/>}>
              <SimilarContent
                title={title}
                release_date={release_date}
                adult={adult}
                vote_average={vote_average}
                vote_count={vote_count}
              />
              </Suspense>
            </section>
          )
        })
        : <NotFind /> }
    </section>
  )
}

// SimilarContent 컴포넌트
// 유사한 영화에 대한 세부 정보를 표시하는 컴포넌트
const SimilarContent = ({
  title,
  release_date,
  adult,
  vote_average,
  vote_count
}: SimilarContentType): ReactElement => {
  return (
    <section className={styles.similar_content}>
      <h2 className={styles.similar_title}>{title}</h2>
      <div className={styles.similar_date}>{release_date}</div>
      <div className={styles.similar_age}>{!adult ? 'Under 18' : '18+'}</div>
      <div className={styles.similar_grade}>
        <span>{vote_average} P</span>
        <span> ({vote_count} people)</span>
      </div>
    </section>
  )
}

export default Similar
