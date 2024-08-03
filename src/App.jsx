import React, { useEffect, useRef, useState } from "react";
import Contact from "./Pages/Contact";
import gsap from "gsap";
import "./App.css";

export const RefsContext = React.createContext();

function App() {
	const [mobile, setMobile] = useState(true);

	const cursorRef = useRef(null);
	const hoverRefs = useRef([]);

	// Event listener to check for the mobile view and resize
	useEffect(() => {
		function handleResize() {
			window.innerWidth > 768 ? setMobile(false) : setMobile(true);
		}
		window.addEventListener("resize", handleResize);
		handleResize(); // Set initial state based on current window size

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Event listener to handle custom cursor event
	function mouseFunction(event) {
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
	}
	useEffect(() => {
		if (!mobile) {
			window.addEventListener("mousemove", mouseFunction);
			return () => {
				window.removeEventListener("mousemove", mouseFunction);
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

	return (
		<div className="bg-zinc-100 relative">
			<div className="w-3 h-3 bg-dark rounded-full absolute transform-x-[-50%] transform-y-[-50%] z-10" ref={cursorRef} style={{ position: "absolute", pointerEvents: "none" }}></div>
			<RefsContext.Provider value={{ hoverRefs }}>
				<main>
					<Contact />
				</main>
			</RefsContext.Provider>
		</div>
	);
}

export default App;
