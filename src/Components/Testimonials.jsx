import React, { useContext, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCreative } from "swiper/modules";

import { testimonialData } from "../utils";
// import { RefsContext } from "../App";

// import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";

function Testimonials() {
	// const { hoverRefs } = useContext(RefsContext);
	// const prevRef = useRef(null);
	// const nextRef = useRef(null);
	const slides = useRef([]);

	// const handleSlideChange = (swiper) => {
	// 	const tl = gsap.timeline();

	// 	const activeSlide = swiper.slides[swiper.activeIndex];
	// 	const reviewText = activeSlide.querySelector("p");
	// 	const userDiv = activeSlide.querySelector("div");

	// 	tl.fromTo(reviewText, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }).fromTo(userDiv, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }, "-=0.3");
	// };

	// const handleHoverRefs = (el) => {
	// 	if (el && !hoverRefs.current.includes(el)) {
	// 		hoverRefs.current.push(el);
	// 	}
	// };

	return (
		<section className="container testimonials">
			<div className="max-w-xl mx-auto relative">
				<svg className="block mx-auto h-10 w-10 mb-3 opacity-15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.195 46.195" xmlSpace="preserve" fill="#000000" transform="rotate(180)">
					<g id="SVGRepo_bgCarrier"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<g>
							<path className="fill-dark" d="M35.765,8.264c-5.898,0-10.555,4.782-10.555,10.68s4.844,10.68,10.742,10.68 c0.059,0,0.148-0.008,0.207-0.009c-2.332,1.857-5.261,2.976-8.467,2.976c-1.475,0-2.662,1.196-2.662,2.67s0.949,2.67,2.424,2.67 c10.469-0.001,18.741-8.518,18.741-18.987c0-0.002,0-0.004,0-0.007C46.195,13.042,41.661,8.264,35.765,8.264z"></path>{" "}
							<path className="fill-dark" d="M10.75,8.264c-5.898,0-10.563,4.782-10.563,10.68s4.84,10.68,10.739,10.68 c0.059,0,0.146-0.008,0.205-0.009c-2.332,1.857-5.262,2.976-8.468,2.976C1.188,32.591,0,33.787,0,35.261s0.964,2.67,2.439,2.67 c10.469-0.001,18.756-8.518,18.756-18.987c0-0.002,0-0.004,0-0.007C21.195,13.042,16.646,8.264,10.75,8.264z"></path>{" "}
						</g>
					</g>
				</svg>
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					pagination={{ clickable: true }}
					effect={"creative"}
					creativeEffect={{
						prev: {
							translate: ["-120%", 0, -500],
						},
						next: {
							translate: ["120%", 0, -500],
						},
					}}
					autoplay={{ delay: 3000 }}
					modules={[Pagination, Autoplay, EffectCreative]}
					loop={true}
					className="pb-12">
					{testimonialData.map((data, index) => (
						<SwiperSlide key={index} className="bg-zinc-100">
							<p className="text-center text-md sm:text-lg font-bold text-dark">{data.review}</p>
							<div className="flex gap-3 mt-8 mx-auto justify-center">
								<img src={`/images/testimonials/image-${1}.jpg`} alt="testimonial user image" className="w-12 h-12 rounded-md shadow-md" />
								<div>
									<p className="text-md sm:text-lg font-semibold text-dark">{data.name}</p>
									<p className="font-bold text-dark text-opacity-50">{data.role}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}

export default Testimonials;
