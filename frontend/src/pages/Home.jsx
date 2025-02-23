import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [videoLinks, setVideoLinks] = useState([]);

  // Fetch video links from public/video.json
  useEffect(() => {
    fetch("/video.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setVideoLinks(data);
        } else {
          console.error("Error: Video data is not an array");
        }
      })
      .catch((error) => console.error("Error loading videos:", error));
  }, []);

  const playRandomVideo = () => {
    if (videoLinks.length > 0) {
      const shuffledVideos = [...videoLinks].sort(() => Math.random() - 0.5);
      const selectedVideo = shuffledVideos[0].replace("youtu.be/", "www.youtube.com/embed/").replace("/shorts/", "/embed/");
      navigate(`/play-video?videoUrl=${encodeURIComponent(selectedVideo)}`);
    } else {
      console.error("No videos available to play");
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      
      
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-blue-800">Welcome to AutiSmart Learning!</h1>
        <p className="text-lg text-blue-600 mt-2">Fun Math Games. Smart Mood Support. Personalized Progress for Your Little Genius.</p>
        
        <button onClick={() => navigate('/game')} className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg">Start Learning Now</button>
      </div>
      
      <div className="flex justify-center mt-6 space-x-6">
        <div className="bg-white p-6 shadow-lg rounded-lg w-1/4 text-center">
          <h2 className="text-lg font-bold text-blue-700">Fun Math Games</h2>
          <p className="text-gray-600">Learn Maths in a fun Way!</p>
          <button onClick={() => navigate('/game')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Play Now</button>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg w-1/4 text-center">
          <h2 className="text-lg font-bold text-blue-700">Mood-Based Learning</h2>
          <p className="text-gray-600">Feeling cranky? We'll cheer you up!</p>
          <button onClick={playRandomVideo} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">Play Video</button>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg w-1/4 text-center">
          <h2 className="text-lg font-bold text-blue-700">Progress Tracking</h2>
          <p className="text-gray-600">Monthly reports to celebrate your success!</p>
          <button onClick={() => navigate('/profile')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Progress</button>
        </div>
      </div>
      
      <div className="mt-12 bg-gradient-to-b from-blue-100 to-white p-12 text-center">
        <h2 className="text-2xl font-bold text-black">We Care About How You Feel!</h2>
        <p className="text-lg text-gray-800 italic mt-2">If you're sad, we'll play something happy to help you smile!</p>
        <img src="/images/happy-child.png" alt="Happy Child" className="mt-6 mx-auto w-48" />
      </div>
      
    </div>
  );
}
