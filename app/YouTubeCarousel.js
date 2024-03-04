import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from './YouTubeCarousel.module.css';
import YouTube from 'react-youtube';

const YouTubeCarousel = ({ query }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState('');
  const slidesContainerRef = useRef(); // Add this line to create a ref for the slides container

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setVideos(data.items || []);
    };
    fetchData();
  }, [query]);

  const opts = {
    height: '169', // Half of 390 to fit the carousel size
    width: '304', // Half of 640 to fit the carousel size
    playerVars: {
      autoplay: 1,
    },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: isMobile,
    centerPadding: '12%',
    arrows: true,
    swipeToSlide: true,
  };

  const handleThumbnailClick = (videoId) => {
    if (activeVideoId === videoId) return;
    setActiveVideoId(videoId);
  };

  const handlePrevClick = () => {
    if (slidesContainerRef.current) {
      slidesContainerRef.current.scrollLeft -= 304 + 6;
    }
  };

  const handleNextClick = () => {
    if (slidesContainerRef.current) {
      slidesContainerRef.current.scrollLeft += 304 + 6;
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.carouselPrev} onClick={handlePrevClick}>
        &lt;
      </button>
      <div className={styles.slidesContainer} ref={slidesContainerRef}>
        {videos.map((video) => (
          <div key={video.id.videoId} className={styles.slide}>
            {activeVideoId === video.id.videoId ? (
              <Suspense fallback={<div>Loading...</div>}>
                <YouTube className={styles.player} videoId={video.id.videoId} opts={opts} />
              </Suspense>
            ) : (
              <div className={styles.thumbnailContainer} onClick={() => handleThumbnailClick(video.id.videoId)}>
                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className={styles.thumbnail} />
                <div className={styles.playIcon}>
                  <img src="/play-icon.svg" alt="Play" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.carouselNext} onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
};

export default YouTubeCarousel;
