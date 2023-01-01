import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { API_KEY } from "../slice/movieSlice";
import DetailTaps from "../components/DetailTaps";
import { useParams } from "react-router-dom";
import { baseSet } from "../slice/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faP } from "@fortawesome/free-solid-svg-icons";
import Player from '../components/Player'


const Detail = () => {

  const imageOnErrorHandler = (e:SyntheticEvent<HTMLImageElement>) =>{
      e.currentTarget.src = '/not_find_img.png'
  }


  const { id }:any = useParams();

  //api movie 데이터 state 저장
  const [detailInfo, setDetailInfo] = useState<any>("");

  // movie api 호출
  const idSearchGetMoviesData = useCallback(() => {
    baseSet(
      `/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => setDetailInfo(res.data))
      .catch((error) => {
        setDetailInfo(error.response.status)
      });
  }, [id]);




  useEffect(() => {
    idSearchGetMoviesData();
  }, [idSearchGetMoviesData]);


  return (
      <div>
        {detailInfo === 404?
        <h1>자료가 존재하지 않습니다.</h1>
      :<div className="detail"
          style={{
            backgroundPosition:"center",
            backgroundSize:'cover',
            backgroundImage:"url("+`https://image.tmdb.org/t/p/w500${detailInfo.backdrop_path}`+")"
          }}>
        
      <div className ="detail_preview_video">
        
        <img
          className="detail_img"
          alt="영화이미지"
          width={400}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${detailInfo.poster_path}`}
          onError={imageOnErrorHandler}
      ></img>
      </div>
          <section className="detail_contents">
              <h1 className="detail_title">{detailInfo.original_title}</h1>
              <div><FontAwesomeIcon className="calendar" icon={faCalendar}/> {detailInfo.release_date}</div>
              
              {detailInfo.genres !== undefined
                ? detailInfo.genres.map((data: any, i: number) => {
                    return (
                      <span key={i} className="detail_genres">
                        {data.name}
                      </span>
                    );
                  })
                : null}
              <div className="detail_runtime"><FontAwesomeIcon  className={"person_running"}icon={faPersonRunning}/>{detailInfo.runtime} min</div>
              <div className="detail_vote_average">
                <FontAwesomeIcon className="point" icon={faP}></FontAwesomeIcon>
                {Math.ceil(detailInfo.vote_average*10)} points
              </div>
              <div className="detail_overview">{detailInfo.overview}</div>
          </section>
      </div>}

      <Player id={id}> </Player>
      <DetailTaps id={id}/>
      </div>
  );
};

export default Detail;