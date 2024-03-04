import React, { useState, useEffect, lazy, Suspense } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './YouTubeCarousel.module.css';

// Lazy load the YouTube component for better performance
const YouTube = lazy(() => import('react-youtube'));

const YouTubeCarousel = ({ query }) => {
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setVideos(data.items || []);
    };

    fetchData();
  }, [query]);

  const opts = {
    height: '195', // Half of 390 to fit the carousel size
    width: '345', // Half of 640 to fit the carousel size
    playerVars: {
      autoplay: 1,
    },
  };

  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: 'ondemand',
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleThumbnailClick = (videoId) => {
    // If the clicked video is already active, do nothing
    if (activeVideoId === videoId) return;

    // Set the active video ID, which triggers the player to load
    setActiveVideoId(videoId);
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id.videoId} className={styles.slide}>
            {activeVideoId === video.id.videoId ? (
              <Suspense fallback={<div>Loading...</div>}>
                <YouTube videoId={video.id.videoId} opts={opts} />
              </Suspense>
            ) : (
              <div className={styles.thumbnailContainer} onClick={() => handleThumbnailClick(video.id.videoId)}>
                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className={styles.thumbnail} />
                <div className={styles.playIcon}></div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default YouTubeCarousel;