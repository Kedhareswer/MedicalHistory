import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ProfileBox from "./ProfileBox";
import { useSelector } from "react-redux";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);
	const linkRefs = useRef([]);
	linkRefs.current = [];

	const user = useSelector((store) => store.currUser.user); 

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const addToLinkRefs = (el) => {
		if (el && !linkRefs.current.includes(el)) {
			linkRefs.current.push(el);
		}
	};

	useGSAP(() => {
		if (isOpen) {
			gsap.to(menuRef.current, {
				y: 0,
				duration: 0.5,
				ease: "power3.inOut",
			});
			gsap.fromTo(
				linkRefs.current,
				{ opacity: 0, y: -20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					delay: 0.2,
					ease: "power3.out",
				},
			);
		} else {
			gsap.to(menuRef.current, {
				y: "-100%",
				duration: 0.5,
				ease: "power3.inOut",
			});
		}
	}, [isOpen]);

	return (
		<nav className="bg-orange-500 p-4 py-4 font-main">
			<div className="container relative z-50 mx-auto flex justify-between items-center">
				<div className="text-white text-2xl font-bold">
					<Link
						to="/"
						className="flex justify-center gap-5 items-center"
					>
						<img
							src="/logo-trans.png"
							alt="logo"
							className="w-16 h-16"
						/>
						<span className="text-4xl">Satvik</span>
					</Link>
				</div>

				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-white focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={
									isOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16m-7 6h7"
								}
							></path>
						</svg>
					</button>
				</div>

				<div className="hidden md:flex items-center space-x-8 text-xl text-white">
					<Link
						to="/"
						className="transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					>
						Home
					</Link>
					<Link
						to="/chatbot"
						className="transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					>
						Chatbot
					</Link>
					<Link
						to="/news"
						className="transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					>
						News
					</Link>
					<ProfileBox />
				</div>
			</div>

			<div
				ref={menuRef}
				className={`absolute inset-0 z-40 transition-all duration-1000 bg-orange-500 flex flex-col justify-center items-center space-y-8 text-white transform -translate-y-full md:hidden`}
			>
				<Link
					ref={addToLinkRefs}
					to="/"
					className="text-2xl transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					onClick={toggleMenu}
				>
					Home
				</Link>
				<Link
					ref={addToLinkRefs}
					to="/chatbot"
					className="text-2xl transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					onClick={toggleMenu}
				>
					Chatbot
				</Link>
				<Link
					ref={addToLinkRefs}
					to="/news"
					className="text-2xl transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
					onClick={toggleMenu}
				>
					News
				</Link>

				{!user && (
					<Link
						ref={addToLinkRefs}
						to="/signup"
						className="text-2xl transition-all duration-300 border-b-[1px] border-transparent hover:border-white"
						onClick={toggleMenu}
					>
						Login/SignUp
					</Link>
				)}

				{user && (
					<Link
						ref={addToLinkRefs}
						to="/profile"
						className="rounded-full p-4 bg-green-500 text-white text-xl"
						onClick={toggleMenu}
					>
						{user?.Name[0]}
					</Link>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
