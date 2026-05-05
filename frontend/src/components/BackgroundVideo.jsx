import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackgroundVideo = () => {
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        const fetchActiveVideo = async () => {
            try {
                const res = await axios.get('http://localhost/Aquarium/backend/api/background_videos.php?active_only=true');
                if (res.data.status === 'success' && res.data.video) {
                    setVideoSrc(`http://localhost/Aquarium/backend/uploads/videos/${res.data.video.video_path}`);
                }
            } catch (err) {
                console.error("Failed to load background video.");
            }
        };
        fetchActiveVideo();
    }, []);

    return (
        <div className="bg-video-container">
            {videoSrc ? (
                <video className="bg-video" autoPlay loop muted playsInline>
                    <source src={videoSrc} type="video/mp4" />
                </video>
            ) : (
                <div className="bg-video" style={{ background: 'linear-gradient(to right, #000428, #004e92)' }}></div>
            )}
            <div className="video-overlay"></div>
        </div>
    );
};

export default BackgroundVideo;
