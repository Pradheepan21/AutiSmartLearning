import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export function Game() {
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
    <div className="bg-purple-100 min-h-screen flex flex-col">
  
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-blue-800">Math Game Challenge!</h1>
        <p className="text-lg text-blue-600 mt-2">Solve fun math problems and boost your brain power!</p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-6 shadow-lg rounded-lg w-1/2 text-center">
          <h2 className="text-lg font-bold text-gray-800">What is 2 + 2?</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button className="bg-purple-600 text-white py-2 px-4 rounded">3</button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded">4</button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded">5</button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded">6</button>
          </div>
          <div className="flex justify-between text-gray-600 mt-4">
            <p>⏳ Time Left: 30 seconds</p>
            <p>⭐ Score: 0</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-200 p-8 text-center rounded-lg w-3/4 mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Need a Break?</h2>
        <p className="text-lg text-gray-700 mt-2">Feeling cranky or tired? Take a break with one of our fun videos!</p>
        <button onClick={playRandomVideo} className="mt-4 px-6 py-3 bg-white border border-gray-600 text-gray-800 font-bold rounded-lg">Play Video</button>
      </div>

    </div>
  );
}
