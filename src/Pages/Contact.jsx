import React, { useState, useContext, useEffect, useRef } from "react";
import { budgets, services, emoji, github, discord, linkedin, instagram, twitter, youtube } from "../utils";
import { RefsContext } from "../App";

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
	const [showSuggestions, setShowSuggestions] = useState([]);

	const timeoutRef = useRef(null);
	const { hoverRefs } = useContext(RefsContext);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function selectCountry(countryName) {
		setFormData((prev) => ({ ...prev, country: countryName }));
	}

	const handleBlur = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setSuggestions([]);
		}, 200);
	};

	useEffect(() => {
		if (formData.country.length <= 0) {
			return setSuggestions([]);
		}
		const filteredSuggestions = countryCodes.filter((country) => country.name.toLowerCase().startsWith(formData.country.toLowerCase()));
		setSuggestions(filteredSuggestions);
	}, [formData.country]);

	return (
		<div className="container max-w-[800px] py-20">
			<h5>
				We are always Here to help <img className="inline-block w-14 h-14 ml-2" src={emoji} alt="welcome Emoji" />
			</h5>

			<div className="flex items-center justify-between mt-10">
				<h1 className="">Get in touch</h1>
				<div className="flex items-center mt-3">
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={github}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="github svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={discord}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="discord svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={linkedin}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="likedin svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={instagram}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="instagram svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={twitter}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="twitter svg icon"
						/>
					</span>
					<span className="icon">
						<img
							className="has-c-over aspect-ratio-1/1 h-6 mr-4"
							src={youtube}
							ref={(el) => {
								hoverRefs.current.push(el);
							}}
							alt="youtube svg icon"
						/>
					</span>
				</div>
			</div>

			<h5 className="mt-14">What Service You are looking for ?</h5>

			<div className="flex flex-shrink-0 flex-wrap gap-4 mt-4">
				{services.map((value, index) => {
					return (
						<div key={index} onClick={() => setFormData((prev) => ({ ...prev, service: value }))} className={`flex-list-button ${value === formData.service && "active"}`}>
							{console.log(value, formData.service)}
							<span>{value}</span>
						</div>
					);
				})}
			</div>

			<h5 className="mt-14">Your Budget (INR)</h5>

			<div className="flex flex-shrink-0 flex-wrap gap-4 mt-4">
				{budgets.map((value, index) => {
					return (
						<div key={index} onClick={() => setFormData((prev) => ({ ...prev, budget: value }))} className={`flex-list-button ${value === formData.budget && "active"}`}>
							<span>{value}</span>
						</div>
					);
				})}
			</div>

			<form className="mt-14 grid grid-cols-2 gap-5">
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
						{suggestions.length > 0 && showSuggestions && (
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

				<div className="form-input col-span-2">
					<label className="hidden" htmlFor="description">
						Project description
					</label>
					<textarea type="text" name="description" id="description" placeholder="Project Description" onChange={handleChange} value={formData.description}></textarea>
				</div>

				<button className="btn mt-4">Submit</button>
			</form>
		</div>
	);
}

export default Contact;
