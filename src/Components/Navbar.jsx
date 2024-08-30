import React, { useContext, useState, useEffect, useRef } from "react";
import { logo } from "../utils";
import gsap from "gsap";
import { RefsContext } from "../App";
import { MobileContext } from "../App";

function Navbar() {
	const [menuActive, setMenuActive] = useState(false);
	const { hoverRefs } = useContext(RefsContext);
	const { mobile } = useContext(MobileContext);

	const menuRef = useRef(null);
	const menubackgroundref = useRef(null);
	const fadeInUp1 = useRef([]);
	const fadeInUp2 = useRef([]);
	const fadeInUp3 = useRef([]);

	//use Effect to handle the intial animation of the links in the page
	useEffect(() => {
		const tl = gsap.timeline();

		if (menuActive) {
			let path = "";
			if (mobile) {
				path = "circle(100vh at 100% 0px)";
			} else {
				path = "circle(120vw at 100% 0px)";
			}
			tl.to([menuRef.current, menubackgroundref.current], { clipPath: path, duration: 0.5, ease: "power1.out" });
			tl.to(fadeInUp1.current, { y: 0, opacity: 1, duration: 0.2, stagger: 0.06, ease: "power1.out" }, "+=0.1");
			tl.to(fadeInUp2.current, { y: 0, opacity: 1, duration: 0.2, stagger: 0.06, ease: "power1.out" }, ">");
			tl.to(fadeInUp3.current, { y: 0, opacity: 1, duration: 0.2, stagger: 0.06, ease: "power1.out" }, 0.5);
		} else {
			tl.to(fadeInUp3.current, { y: 30, opacity: 0, duration: 0.2, ease: "power1.out" });
			tl.to(fadeInUp2.current, { y: 30, opacity: 0, duration: 0.2, ease: "power1.out" });
			tl.to(fadeInUp1.current, { y: 30, opacity: 0, duration: 0.2, ease: "power1.out" });
			tl.to(
				[menuRef.current, menubackgroundref.current],
				{
					clipPath: "circle(10px at 100% 0px)",
					duration: 0.5,
					ease: "power1.out",
				},
				">"
			);
		}

		return () => {
			tl.kill();
		};
	}, [menuActive]);

	//use effect  to disable the scroll when menu is opened
	// useEffect(() => {
	// 	const menuElement = document.getElementById("root");

	// 	if (menuElement) {
	// 		if (menuActive) {
	// 			menuElement.classList.add("scroll-none");
	// 		} else {
	// 			menuElement.classList.remove("scroll-none");
	// 		}
	// 	}

	// 	return () => {
	// 		if (menuElement) {
	// 			menuElement.classList.remove("scroll-none");
	// 		}
	// 	};
	// }, [menuActive]);

	const handleHoverRefs = (el) => {
		if (el && !hoverRefs.current.includes(el)) {
			hoverRefs.current.push(el);
		}
	};

	return (
		<React.Fragment>
			<div className={`menu bg-zinc-100 w-full h-screen overflow-hidden inset-0 fixed z-10 ${menuActive && "active"}`} ref={menubackgroundref}></div>
			<div className="flex items-center justify-between container py-3 fixed z-[51] left-1/2 top-0 -translate-x-1/2">
				<div className="relative z-[51]">
					<img src={logo} className="w-11 h-11" alt="mani dev logo" />
				</div>
				<ul className="hidden md:flex gap-10">
					<li className="text-sm ">Home</li>
					<li className="text-sm ">Services</li>
					<li className="text-sm ">Blogs</li>
					<li className="text-sm ">Projects</li>
				</ul>
				<div className="flex gap-5 md:gap-10 items-center">
					<button className="px-5 py-2 bg-dark text-white rounded-full text-sm ">Contact</button>
					<button className={` group hamburger w-9 h-8 flex justify-evenly flex-col items-end relative z-[51] ${menuActive && "active"} `} onClick={() => setMenuActive(!menuActive)}>
						<span className="w-full h-1 rounded bg-dark block absolute transition-all duration-200 -translate-y-[5px]"></span>
						<span className="h-1 rounded bg-dark block w-[75%] absolute transition-all duration-200 translate-y-[5px]"></span>
					</button>
				</div>

				{/* <div className={`menu bg-zinc-100 w-full h-screen overflow-hidden inset-0 fixed z-10 ${menuActive && "active"}`} ref={menubackgroundref}></div> */}
				<div className={`menu w-full h-screen inset-0 flex items-center justify-center big-menu fixed z-50`} ref={menuRef}>
					<div className="flex gap-10 sm:gap-20">
						<div className="flex flex-col justify-between">
							<div className="text-xs font-semibold" ref={(el) => (fadeInUp1.current[0] = el)}>
								Mail
							</div>
							<p className="text-xs pb-5 cursor-pointer" ref={(el) => (fadeInUp1.current[1] = el)}>
								info@devmani.in{" "}
							</p>
							<div className="text-xs font-semibold" ref={(el) => (fadeInUp2.current[0] = el)}>
								Contact
							</div>
							<div ref={(el) => (fadeInUp2.current[1] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Github
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[2] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Linkedin
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[3] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Instagram
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[4] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Youtube
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[5] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Whatsapp
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[6] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Telegram
								</p>
							</div>
							<div ref={(el) => (fadeInUp2.current[7] = el)}>
								<p className="text-xs  has-c-over" ref={handleHoverRefs}>
									Twitter
								</p>
							</div>
						</div>
						<ul className="space-y-6">
							<li className="text-sm" ref={(el) => (fadeInUp3.current[0] = el)}>
								<h2 ref={handleHoverRefs} className="has-c-over">
									Home
								</h2>
							</li>
							<li className="text-sm" ref={(el) => (fadeInUp3.current[1] = el)}>
								<h2 ref={handleHoverRefs} className="has-c-over">
									Services
								</h2>
							</li>
							<li className="text-sm " ref={(el) => (fadeInUp3.current[2] = el)}>
								<h2 ref={handleHoverRefs} className="has-c-over">
									Projects
								</h2>
							</li>
							<li className="text-sm" ref={(el) => (fadeInUp3.current[3] = el)}>
								<h2 ref={handleHoverRefs} className="has-c-over">
									Blogs
								</h2>
							</li>
							<li className="text-sm" ref={(el) => (fadeInUp3.current[4] = el)}>
								<h2 ref={handleHoverRefs} className="has-c-over">
									Contact
								</h2>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Navbar;
