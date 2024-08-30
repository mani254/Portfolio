import React, { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

import { MobileContext } from "../App";
import { profile, aboutBackground, about1, about2, about3, about4, about5 } from "../utils";

function About() {
	const aboutRef = useRef(null);
	const svgRef = useRef(null);
	const h2Ref = useRef(null);
	const imageRef = useRef(null);
	const imageTextRef = useRef(null);
	const buttonRef = useRef(null);
	const scrollingDivsRef = useRef(null);
	const movingRef = useRef(null);

	const { mobile } = useContext(MobileContext);

	useEffect(() => {
		if (!aboutRef.current || !svgRef.current) return;

		const path = svgRef.current.querySelector("path");
		gsap.fromTo(
			path,
			{ attr: { d: "M1534 1.50012C1490.5 390.5 33 382 1 1V302.5H1533L1534 1.50012Z" } },
			{
				attr: { d: "M1533 0.5C1282.5 43 359.5 34.5 0 -0.00012207V301.5H1532L15333 0.5Z" },
				scrollTrigger: {
					trigger: aboutRef.current,
					ease: "elastic.out(1, 0.1)",
					start: "top bottom",
					end: "top 50%",
					scrub: true,
					// markers: true,
				},
			}
		);
	}, []);

	useEffect(() => {
		if (!aboutRef.current || !h2Ref.current || !imageRef.current || !imageTextRef.current) return;

		const splitText = new SplitType(h2Ref.current, { types: "words" });

		const tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: aboutRef.current,
				start: "top 80%",
				end: "top 40%",
				scrub: 1.5,
				// markers: true,
				onLeave: () => tl2.play(),
			},
		});

		tl1.fromTo([imageRef.current, imageTextRef.current, h2Ref.current], { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.2 });

		const tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: aboutRef.current,
				start: "top 45%",
				end: "top 30%",
				scrub: 1.5,
				// markers: true,
			},
		});

		tl2.fromTo(splitText.words, { x: 5, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, ease: "power2.out", duration: 1 }).fromTo(buttonRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, ease: "power2.in", duration: 0.4 }, "-=0.4");

		return () => {
			tl1.kill();
			tl2.kill();
		};
	}, [aboutRef, h2Ref, imageRef, imageTextRef]);

	useEffect(() => {
		if (mobile || !aboutRef.current || !scrollingDivsRef.current) return;

		gsap.fromTo(
			scrollingDivsRef.current,
			{ y: 300 },
			{
				y: 80,
				scrollTrigger: {
					trigger: aboutRef.current,
					start: "top 60%",
					end: "top top",
					scrub: true,
				},
			}
		);

		const children = scrollingDivsRef.current.children;
		const topValues = [-290, -220, 30, 120, "62%", "60%"];
		gsap.to(children, {
			top: (index) => topValues[index] || 0,
			scrollTrigger: {
				trigger: aboutRef.current,
				start: "top 80px",
				end: "+=700",
				scrub: true,
				pin: true,
			},
		});
	}, [mobile, aboutRef, scrollingDivsRef]);

	useEffect(() => {
		if (!scrollingDivsRef.current || !aboutRef.current || !movingRef.current) return;

		console.log("hello");

		const element = aboutRef.current.querySelector(".about-bg");
		const path = aboutRef.current.querySelector("svg path");

		if (element && path) {
			gsap.fromTo(
				[element, path],
				{ backgroundColor: "#ccc", fill: "#ccc" },
				{
					backgroundColor: "#e7e7e7",
					fill: "#e7e7e7",
					scrollTrigger: {
						trigger: aboutRef.current,
						start: "55% 60%",
						end: "65% 50%",
						scrub: true,
					},
				}
			);
		}
	}, [mobile, scrollingDivsRef, aboutRef]);

	useEffect(() => {
		if (!movingRef.current) return;

		const movingElement = movingRef.current;
		const parentWidth = movingElement.parentElement.offsetWidth;
		const totalWidth = movingElement.scrollWidth + 100;

		console.log(parentWidth, totalWidth);

		const t1 = gsap.timeline();

		t1.fromTo(
			movingElement,
			{
				x: 0,
			},
			{
				x: `${parentWidth - totalWidth}`,
				ease: "none",
				scrollTrigger: {
					trigger: movingElement,
					start: "top 80%",
					bottom: "bottom 15%",
					scrub: true,
				},
			}
		);

		return () => {
			t1.kill();
		};
	}, [movingRef, mobile]);

	return (
		<React.Fragment>
			<section className="relative has-dark overflow-hidden" ref={aboutRef}>
				{/* Background SVG and color */}
				<div className="min-h-[700px] flex flex-col">
					<svg width="100%" height="100%" viewBox="0 0 1533 302" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
						<path className="fill-bright" d="M1534 1.50012C1490.5 390.5 33 382 1 1V302.5H1533L1534 1.50012Z" />
					</svg>
					<div className="about-bg bg-bright w-full h-full flex-1 -mt-1"></div>
				</div>
				<img className="absolute inset-0 pt-20 object-cover w-full h-full opacity-[6%]" src={aboutBackground} alt="about background image" />
				{/* Background images for scrolling */}
				{!mobile && (
					<div className="scrolling-divs absolute w-full h-full top-0 right-0 overflow-hidden" ref={scrollingDivsRef}>
						<div className="w-[150px] bg-gray-800 absolute left-[10%] top-[10%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about1} alt="web development and design images" />
						</div>
						<div className="w-[170px] bg-gray-800 absolute right-[5%] top-[25%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about2} alt="web development and design images" />
						</div>
						<div className="w-[140px] bg-gray-800 absolute left-[6%] top-[80%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about4} alt="web development and design images" />
						</div>
						<div className="w-[150px] bg-gray-800 absolute right-[10%] top-[100%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about3} alt="web development and design images" />
						</div>
						<div className="w-[150px] bg-gray-800 absolute left-[10%] top-[120%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about1} alt="web development and design images" />
						</div>
						<div className="w-[165px] bg-gray-800 absolute right-[7%] top-[130%] shadow-gray-800 shadow-md rounded-xl overflow-hidden">
							<img className="opacity-80" src={about4} alt="web development and design images" />
						</div>
					</div>
				)}
				{/* Content for the about section */}
				<div className="w-[100%] h-full absolute left-1/2 top-0 -translate-x-[50%] flex flex-col items-center justify-center gap-10">
					<div>
						<div className="w-20 h-20 bg-gray-800 mx-auto rounded-full overflow-hidden shadow-gray-800 shadow-lg" ref={imageRef}>
							<img src={profile} alt="dev mani profile image" />
						</div>
						<p className="text-center mt-5 text-dark font-medium" ref={imageTextRef}>
							About Me
						</p>
					</div>
					<h2 ref={h2Ref} className="split text-lg md-text-xl lg:text-2xl leading-loose max-w-2xl text-center mx-auto text-dark text-body">
						I'm Manikanta, a web developer and designer with a passion for creating clean, functional, and user-friendly websites. Along with my dedicated team, I focus on delivering custom digital solutions that meet your unique needs. We aim to help you build a strong online presence and achieve your goals with high-quality, effective designs.
					</h2>
					<button className="btn btn-1" ref={buttonRef}>
						Know More
					</button>
				</div>
			</section>
			<section className="moving bg-zinc-100 relative overflow-hidden px-12">
				<div ref={movingRef} className="flex gap-12">
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0 py-5 md:py-8 lg:py-10">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> Interactive
					</h2>
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> Responsive
					</h2>
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> Effective Design
					</h2>
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> SEO Friendly
					</h2>
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> Performance Optimized
					</h2>
					<h2 className="text-xl md:text-2xl lg:text-4xl flex items-center justify-center shrink-0">
						<span className="w-4 h-4 rounded-full bg-dark inline-block mr-5"></span> Accessible
					</h2>
				</div>
			</section>
		</React.Fragment>
	);
}

export default About;
