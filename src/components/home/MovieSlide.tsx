import styles from './MovieSlide.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import SlideCard from './SlideCard'
import { type ReactElement } from 'react'

// 반응형 슬라이드 라이브러리 (옵션 설정 부분)
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1
  }
}

interface MovieSlideType {
  movies: {
    page: number
    results: []
    total_pages: number
    total_results: number
  }
}

// MovieSlide
const MovieSlide = ({ movies }: MovieSlideType): ReactElement => {
  return (
    <article className={styles.movieSlide}>
      <Carousel
        responsive={responsive}
        className={styles.carousel}
        autoPlay={true}
        infinite={true}
        pauseOnHover={true}
        minimumTouchDrag={3}
      >
        {movies?.results !== undefined
          ? (
              movies.results.map((movieEl: any) => {
                return <SlideCard key={movieEl.id} movieList={movieEl} />
              })
            )
          : (
          <div />
            )}
      </Carousel>
    </article>
  )
}

export default MovieSlide
