/* eslint-disable multiline-ternary */
import styles from './Review.module.css'
import NotFind from './NotFind'
import { type ReviewType, type ReviewsInfoType } from './Review.types'
import { type ReactElement } from 'react'

// Review
const Review = ({ apiData }: ReviewType): ReactElement => {
  return (
    <section className={styles.review}>
      {apiData.results[0] !== undefined ? (
        apiData.results.map((result) => {
          const { author, content, createdAt, id } = result
          return (
            <ReviewsInfo
              author={author}
              content={content}
              createdAt={createdAt}
              key={id}
            />
          )
        })
      ) : (
        <NotFind />
      )}
    </section>
  )
}

// ReviewsInfo
const ReviewsInfo = ({
  author,
  createdAt,
  content
}: ReviewsInfoType): ReactElement => {
  return (
    <section className={styles.review_info}>
      <div className={styles.review_author}>
        {author.length > 0 && <p className={styles.author}>{author}</p>}
        <p className={styles.created_date}>{createdAt}</p>
      </div>
      <div className={styles.review_content_con}>
        <p className={styles.content}>{content}</p>
      </div>
    </section>
  )
}

export default Review
