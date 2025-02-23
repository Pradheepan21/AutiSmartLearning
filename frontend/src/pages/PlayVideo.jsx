import { useLocation, useNavigate } from 'react-router-dom';

export function PlayVideo() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl');

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Now Playing</h1>
        {videoUrl ? (
          <iframe
            width="900"
            height="450"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-white">No video available.</p>
        )}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg"
        >
          Back
        </button>
      </div>
      
    </div>
  );
}
