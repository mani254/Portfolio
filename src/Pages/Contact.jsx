import React, { useState, useContext, useEffect, useRef } from "react";
import { budgets, services, emoji, github, discord, linkedin, instagram, twitter, youtube } from "../utils";
import { RefsContext } from "../App";
import gsap from "gsap";

import countryCodes from "../utils/countryCodes.json";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		phoneNo: "",
		email: "",
		description: "",
		country: "",
		service: "",
		budget: "",
	});
	const [suggestions, setSuggestions] = useState([]);

	const timeoutRef = useRef(null);
	const { hoverRefs } = useContext(RefsContext);

	useEffect(() => {
		if (formData.country.length <= 0) {
			return setSuggestions([]);
		}
		const filteredSuggestions = countryCodes.filter((country) => country.name.toLowerCase().startsWith(formData.country.toLowerCase()));
		setSuggestions(filteredSuggestions);
	}, [formData.country]);

	//effect to handle the gsap animation for the image bounce effect
	useEffect(() => {
		const handleLoad = () => {
			gsap.fromTo(".bounce-image", { y: -50 }, { y: 0, duration: 0.8, ease: "bounce.out", stagger: 0.05 });
		};
		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
			return () => {
				window.removeEventListener("load", handleLoad);
				gsap.killTweensOf(".bounce-image");
			};
		}
	}, []);

	//  effect to add the gsap animation for the flex list buttons
	useEffect(() => {
		const startAnimations = () => {
			const ctx = gsap.context(() => {
				gsap.fromTo(
					".service-button",
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.in",
						stagger: 0.1,
					}
				);
				gsap.fromTo(
					".budget-button",
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.in",
						stagger: 0.1,
					}
				);
			});
		};

		if (document.readyState === "complete") {
			startAnimations();
		} else {
			window.addEventListener("load", startAnimations);
		}

		return () => {
			window.removeEventListener("load", startAnimations);
			gsap.killTweensOf(".service-button, .budget-button");
		};
	}, []);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function selectCountry(countryName) {
		setFormData((prev) => ({ ...prev, country: countryName }));
	}

	function handleBlur() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setSuggestions([]);
		}, 200);
	}

	return (
		<div className="container max-w-[800px] py-10 sm:py-20">
			<div className="flex items-center  flex-col sm:flex-row gap-1 sm:gap-3">
				<h5 className="order-2 sm:order-1">We are always Here to help</h5>
				<img className="w-14 h-14 order-1 sm:order-2 bounce-image" src={emoji} alt="welcome Emoji" />
			</div>

			<div className="sm:flex items-center justify-between mt-10">
				<h1 className="text-center md:text-start">Get in touch</h1>
				<div className="flex items-center justify-center mt-3">
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={github}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="github svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={discord}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="discord svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={linkedin}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="likedin svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={instagram}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="instagram svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={twitter}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="twitter svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className=" bounce-image has-c-over aspect-ratio-1/1 h-6"
							src={youtube}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="youtube svg icon"
						/>
					</span>
				</div>
			</div>

			<h5 className=" mt-10 sm:mt-14">What Service You are looking for ?</h5>

			<div className="flex flex-shrink-0 flex-wrap gap-4 mt-4">
				{services.map((value, index) => {
					return (
						<div key={index} onClick={() => setFormData((prev) => ({ ...prev, service: value }))} className={`service-button flex-list-button ${value === formData.service && "active"}`}>
							{console.log(value, formData.service)}
							<span>{value}</span>
						</div>
					);
				})}
			</div>

			<h5 className=" mt-10 sm:mt-14">Your Budget (INR)</h5>

			<div className="flex flex-shrink-0 flex-wrap gap-4 mt-4">
				{budgets.map((value, index) => {
					return (
						<div key={index} onClick={() => setFormData((prev) => ({ ...prev, budget: value }))} className={`budget-button flex-list-button ${value === formData.budget && "active"}`}>
							<span>{value}</span>
						</div>
					);
				})}
			</div>

			<form className=" mt-10 sm:mt-14 grid  grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="form-input">
					<label htmlFor="name" className="hidden">
						Name
					</label>
					<input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required></input>
				</div>

				<div className="form-input">
					<label className="hidden" htmlFor="phoneNo">
						Country
					</label>
					<div className="relative">
						<input type="text" id="country" name="country" placeholder="Your Country" value={formData.country} onChange={handleChange} onBlur={handleBlur} required></input>
						{suggestions.length > 0 && (
							<ul className="absolute w-full max-h-56 bg-zinc-50 shadow-md rounded-md z-0 overflow-auto">
								{suggestions.map((country) => {
									return (
										<li className="px-3 py-2 cursor-pointer hover:bg-zinc-200" onClick={() => selectCountry(country.name)}>
											{country.name}
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>

				<div className="form-input">
					<label className="hidden" htmlFor="phoneNo">
						Phone No
					</label>
					<input type="tel" id="phoneNo" name="phoneNo" placeholder="Your Phone Number" value={formData.phoneNo} onChange={handleChange} required></input>
				</div>

				<div className="form-input">
					<label className="hidden" htmlFor="email">
						Email
					</label>
					<input type="email" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required></input>
				</div>

				<div className="form-input sm:col-span-2">
					<label className="hidden" htmlFor="description">
						Project description
					</label>
					<textarea type="text" name="description" id="description" placeholder="Project Description" onChange={handleChange} value={formData.description}></textarea>
				</div>
				<div className="sm:col-span-2">
					<button className="btn w-auto">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Contact;
