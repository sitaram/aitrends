import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Image from 'next/image';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from './YouTubeCarousel.module.css';
const YouTube = lazy(() => import('react-youtube'));

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

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    videos.length > 0 && (
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
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className={styles.thumbnail}
                    width={304}
                    height={169}
                  />
                  <div className={styles.videoTitle}>{decodeHTMLEntities(video.snippet.title)}</div>
                  <div className={styles.playIcon}>
                    <Image src="/play-icon.svg" alt="Play" width={100} height={68} />
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
    )
  );
};

export default YouTubeCarousel;
