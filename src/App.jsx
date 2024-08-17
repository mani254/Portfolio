import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

export const RefsContext = React.createContext();
export const MobileContext = React.createContext();

import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./Components/smoothScroll";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";

gsap.registerPlugin(ScrollTrigger);

function App() {
	const [mobile, setMobile] = useState(true);

	const cursorRef = useRef(null);
	const hoverRefs = useRef([]);

	// Event listener to check for the mobile view and resize
	useEffect(() => {
		function handleResize() {
			window.innerWidth > 600 ? setMobile(false) : setMobile(true);
		}
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	//event listener to check and handle custorm cusor follow the cursor
	useEffect(() => {
		if (mobile) return;
		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [mobile]);

	function handleMouseMove(event) {
		const x = event.pageX;
		const y = event.pageY;
		if (cursorRef.current) {
			gsap.to(cursorRef.current, {
				left: x,
				top: y,
				duration: 0.25,
				ease: "circle.in",
			});
		}

		if (!mobile && hoverRefs.current.length > 0) {
			hoverRefs.current.forEach((ref) => {
				// const rect = ref.getBoundingClientRect();
				// const isHovered = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
				// const isNear = x >= rect.left - 20 && x <= rect.right + 20 && y >= rect.top - 10 && y <= rect.bottom + 10;
				const rect = ref.getBoundingClientRect();
				const scrollX = window.scrollX || window.pageXOffset;
				const scrollY = window.scrollY || window.pageYOffset;

				// Adjust the mouse position by the scroll offset
				const adjustedX = x - scrollX;
				const adjustedY = y - scrollY;

				const isHovered = adjustedX >= rect.left && adjustedX <= rect.right && adjustedY >= rect.top && adjustedY <= rect.bottom;

				const isNear = adjustedX >= rect.left - 20 && adjustedX <= rect.right + 20 && adjustedY >= rect.top - 10 && adjustedY <= rect.bottom + 10;

				if (isNear) {
					console.log("hello");
					const centerX = rect.left + rect.width / 2;
					const centerY = rect.top + rect.height / 2;
					const deltaX = adjustedX - centerX;
					const deltaY = adjustedY - centerY;
					const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
					const maxDistance = 7;

					const moveX = (deltaX / distance) * Math.min(distance, maxDistance);
					const moveY = (deltaY / distance) * Math.min(distance, maxDistance);

					gsap.to(ref, {
						x: moveX,
						y: moveY,
						duration: 0.2,
						ease: "power1.in",
					});
				} else {
					gsap.to(ref, {
						x: 0,
						y: 0,
						duration: 0.2,
					});
				}

				if (isHovered) {
					console.log("hello");
					const clipX = adjustedX - rect.left;
					const clipY = adjustedY - rect.top;
					if (ref.textContent) {
						ref.setAttribute("data-content", ref.textContent);
					}
					ref.style.setProperty("--clip-x", `${clipX + 6}px`);
					ref.style.setProperty("--clip-y", `${clipY + 4}px`);
					ref.classList.add("highlight");
				} else {
					ref.classList.remove("highlight");
				}
			});
		}
	}

	//event listener to handle the scale of the cusor
	useEffect(() => {
		if (!mobile && hoverRefs.current.length > 0) {
			hoverRefs.current.forEach((ref) => {
				if (ref) {
					ref.addEventListener("mouseenter", scaleCursor);
					ref.addEventListener("mouseleave", resetCursorScale);
				}
			});
			return () => {
				hoverRefs.current.forEach((ref) => {
					if (ref) {
						ref.removeEventListener("mouseenter", scaleCursor);
						ref.removeEventListener("mouseleave", resetCursorScale);
					}
				});
			};
		}
	}, [mobile]);

	function scaleCursor() {
		if (cursorRef.current) {
			gsap.to(cursorRef.current, {
				scale: 4.5,
				duration: 0.3,
				ease: "power4.inOut",
			});
		}
	}
	function resetCursorScale() {
		if (cursorRef.current) {
			gsap.to(cursorRef.current, {
				scale: 1,
				duration: 0.3,
				ease: "power3.inOut",
			});
		}
	}

	return (
		<SmoothScroll>
			<div className="bg-zinc-100 relative">
				{!mobile && <div className="w-3 h-3 bg-black rounded-full absolute transform-x-[-50%] transform-y-[-50%] z-50 bg-opacity-80" ref={cursorRef} style={{ position: "absolute", pointerEvents: "none" }}></div>}
				<RefsContext.Provider value={{ hoverRefs }}>
					<MobileContext.Provider value={{ mobile }}>
						<main id="main">
							<Navbar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/contact" element={<Contact />} />
							</Routes>
						</main>
					</MobileContext.Provider>
				</RefsContext.Provider>
			</div>
		</SmoothScroll>
	);
}

export default App;

// function mouseFunction(event) {
// 	const x = event.pageX;
// 	const y = event.pageY;

// 	if (cursorRef.current) {
// 		gsap.to(cursorRef.current, {
// 			left: x,
// 			top: y,
// 			duration: 0.25,
// 			ease: "circle.in",
// 		});
// 	}
// }
// useEffect(() => {
// 	if (!mobile) {
// 		window.addEventListener("mousemove", mouseFunction);
// 		return () => {
// 			window.removeEventListener("mousemove", mouseFunction);
// 		};
// 	}
// }, [mobile]);
