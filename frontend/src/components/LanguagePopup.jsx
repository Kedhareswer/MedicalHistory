import { useState } from "react";

const LanguagePopup = ({ setLang }) => {
	const [isVisible, setIsVisible] = useState(true);
	const handleOptionsClick = (lang) => {
		setLang(lang);
		setIsVisible(false);
	};
	return (
		<div
			className={`fixed  z-50 top-0 left-0 bg-opacity-50 w-screen h-screen bg-black flex justify-center items-center ${
				isVisible ? "flex" : "hidden"
			}`}
		>
			<div
				className={`w-96   flex flex-col gap-4 p-10 bg-slate-100 drop-shadow-xl  rounded-md ${
					isVisible ? "flex" : "hidden"
				}`}
			>
				<div
					onClick={() => {
						handleOptionsClick("english");
					}}
					className="p-4 rounded-md bg-white cursor-pointer"
				>
					English
				</div>
				<div
					onClick={() => handleOptionsClick("hindi")}
					className="p-4 rounded-md bg-white cursor-pointer"
				>
					Hindi
				</div>
				<div
					onClick={() => handleOptionsClick("farsi")}
					className="p-4 rounded-md bg-white cursor-pointer"
				>
					Farsi
				</div>
			</div>
		</div>
	);
};

export default LanguagePopup;
