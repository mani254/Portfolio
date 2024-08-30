import React, { useState, useRef, useEffect } from "react";
import { bannerVideo, bannerImage } from "../utils";

function Hero() {
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [videoSrc, setVideoSrc] = useState(null); // State to handle video source
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoSrc === null) {
			const img = new Image();
			img.src = bannerImage;
			img.onload = () => {
				setVideoSrc(bannerVideo);
			};
		}

		const videoElement = videoRef.current;
		if (videoElement) {
			const handleLoadedData = () => setVideoLoaded(true);
			videoElement.addEventListener("loadeddata", handleLoadedData);
			return () => {
				videoElement.removeEventListener("loadeddata", handleLoadedData);
			};
		}
	}, [videoSrc]);

	return (
		<section className="h-screen max-h-[850px] relative" style={{ background: "#F6F5FA" }}>
			<div className="video-container w-full h-full fixed pt-28 overflow-hidden flex items-center justify-center">{videoSrc ? <video src={videoSrc} autoPlay loop muted className={`w-full h-[70%] md:h-full object-cover object-center transition-opacity ${videoLoaded ? "blodk" : "hidden"}`} ref={videoRef} /> : <img src={bannerImage} alt="Banner" loading="lazy" className={`w-full h-[70%] md:h-full object-cover object-center ${videoLoaded ? "hidden" : "block"}`} />}</div>
		</section>
	);
}

export default Hero;

// import React from "react";
// import { bannerVideo, bannerImage } from "../utils";

// function Hero() {
// 	return (
// 		<section className="h-screen max-h-[850px] relative" style={{ background: "#F6F5FA" }}>
// 			<div className="video-container w-full h-full absolute pt-20 overflow-hidden flex items-center justify-center">
// 				<video src={bannerVideo} autoPlay loop muted className=" w-full h-[70%] md:h-full object-cover object-center"></video>
// 				<img src={bannerImage} className="object-cover" />
// 			</div>
// 		</section>
// 	);
// }

// export default Hero;
