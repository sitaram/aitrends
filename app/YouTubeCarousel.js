// YouTubeCarousel.js

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const YouTubeCarousel = ({ query }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setVideos(data.items || []);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Options for react-youtube
  const opts = {
    height: '190',
    width: '340',
    playerVars: {
      autoplay: 0, // Auto-play the first video
    },
  };

  return (
    <Slider {...settings}>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <YouTube videoId={video.id.videoId} opts={opts} />
        </div>
      ))}
    </Slider>
  );
};

export default YouTubeCarousel;
