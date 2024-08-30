import React from "react";
// import Testimonials from "../Components/Testimonials";
// import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import About from "../Components/About";

function Home() {
	return (
		<div>
			<Hero />
			<About />
			<div className="min-h-screen bg-zinc-100 relative"></div>
			<div className="min-h-screen bg-zinc-100 relative"></div>
			{/* <Testimonials /> */}
			{/* <Footer /> */}
		</div>
	);
}

export default Home;
