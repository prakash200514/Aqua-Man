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

    const renderGlobalBubbles = () => {
        let bubbles = [];
        for (let i = 0; i < 20; i++) {
            const size = Math.random() * 15 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 15 + 15;
            bubbles.push(
                <div key={i} className="global-bubble" style={{
                    width: `${size}px`, height: `${size}px`,
                    left: `${left}%`, animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}></div>
            );
        }
        return bubbles;
    };

    return (
        <div className="bg-video-container animated-gradient-bg">
            {videoSrc && (
                <video className="bg-video" autoPlay loop muted playsInline>
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}
            <div className="video-overlay"></div>
            {renderGlobalBubbles()}
        </div>
    );
};

export default BackgroundVideo;
