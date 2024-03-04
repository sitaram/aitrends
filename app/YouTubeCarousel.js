import React, { useState, useEffect, Suspense } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './YouTubeCarousel.module.css';
import YouTube from 'react-youtube';

const YouTubeCarousel = ({ query }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState('');

  const handleSwipe = (event) => {
    event.stopPropagation();
  };

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
    // If the clicked video is already active, do nothing
    if (activeVideoId === videoId) return;

    // Set the active video ID, which triggers the player to load
    setActiveVideoId(videoId);
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider onTouchStart={handleSwipe} onSwipe={handleSwipe} {...settings}>
        {videos.map((video) => (
          <div key={video.id.videoId} className={styles.slide}>
            {activeVideoId === video.id.videoId ? (
              <Suspense fallback={<div>Loading...</div>}>
                <YouTube className={styles.player} key={video.id.videoId} videoId={video.id.videoId} opts={opts} />
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
      </Slider>
    </div>
  );
};

export default YouTubeCarousel;
