import React, { useContext, useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { logo } from "../utils";
import { github, discord, linkedin, instagram, twitter, youtube } from "../utils";
import gsap from "gsap";
import { RefsContext } from "../App";

import { footer1, footer2 } from "../utils";
function Footer() {
	const { hoverRefs } = useContext(RefsContext);
	const contentRef = useRef(null);
	const imageRef1 = useRef(null);
	const imageRef2 = useRef(null);

	//use Effect for the gsap aniamtion
	useEffect(() => {
		const contentElement = contentRef.current;
		const overflowWidth = contentElement.scrollWidth - contentElement.clientWidth + 250;

		gsap.to(contentRef.current, {
			x: -overflowWidth,
			scrollTrigger: {
				trigger: contentRef.current,
				start: "top bottom",
				end: "center center",
				scrub: 1,
				// markers: true,
			},
		});
		gsap.fromTo(
			imageRef1.current,
			{ y: "-13%" },
			{
				y: "-104%",
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 90%",
					end: "top 40%",
					scrub: 1,
					// markers: true,
				},
			}
		);
		gsap.fromTo(
			imageRef2.current,
			{ x: -250, opacity: 0.3 },
			{
				x: "0",
				opacity: 1,
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 90%",
					end: "top 40%",
					scrub: 0.1,
					markers: 1,
				},
			}
		);
	}, []);

	const handleHoverRefs = (el) => {
		if (el && !hoverRefs.current.includes(el)) {
			hoverRefs.current.push(el);
		}
	};

	return (
		<section className="footer  pb-20 relative pt-28">
			<h1 className="relative text-8xl whitespace-nowrap left-[200px] mb-20" ref={contentRef}>
				Start Your Digital Journey Today
			</h1>
			<div className=" w-40 h-52 absolute right-[10%]  top-32 rounded-lg overflow-hidden shadow-lg" ref={imageRef1}>
				<img className="object-cover" src={footer1} alt={"digital journey webdesign"} />
			</div>
			<div className=" bg-violet-500 w-60 h-40 absolute left-[13%] rounded-lg overflow-hidden shadow-lg" ref={imageRef2}>
				<img className="object-cover" src={footer2} alt={"digital journey webdesign"} />
			</div>
			<div className="container max-w-md">
				<div className="flex w-full justify-between">
					<p className="flex items-center text-lg font-semibold">
						Services{" "}
						<span className="icon ml-2">
							<FaArrowRightLong />
						</span>
					</p>
					<p className="flex items-center text-lg font-semibold">
						Projects{" "}
						<span className="icon ml-2">
							<FaArrowRightLong />
						</span>
					</p>
					<p className="flex items-center text-lg font-semibold">
						Contact{" "}
						<span className="icon ml-2">
							<FaArrowRightLong />
						</span>
					</p>
				</div>
				<div className="relative">
					<p className="text-sm mt-4 relative z-2">Crafting digital experiences that merge creativity with technology. As a passionate web developer, I transform ideas into innovative, user-friendly websites that make an impact. Let's collaborate and bring your vision to life.</p>
					<img className="w-52 h-52 opacity-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" src={logo} alt="dev mani logo"></img>
					<div className="flex items-center justify-center mt-8">
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4" src={github} ref={handleHoverRefs} alt="github svg icon" />
						</span>
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4" src={discord} ref={handleHoverRefs} alt="discord svg icon" />
						</span>
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4" src={linkedin} ref={handleHoverRefs} alt="likedin svg icon" />
						</span>
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4" src={instagram} ref={handleHoverRefs} alt="instagram svg icon" />
						</span>
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4" src={twitter} ref={handleHoverRefs} alt="twitter svg icon" />
						</span>
						<span className="icon">
							<img className=" bounce-image has-c-over aspect-ratio-1/1 h-6" src={youtube} ref={handleHoverRefs} alt="youtube svg icon" />
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
