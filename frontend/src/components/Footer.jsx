import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-12">
			<div className="max-w-screen-xl mx-auto px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/" className="hover:text-gray-400">
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/features"
									className="hover:text-gray-400"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									to="/how-it-works"
									className="hover:text-gray-400"
								>
									How It Works
								</Link>
							</li>
							<li>
								<Link
									to="/for-doctors"
									className="hover:text-gray-400"
								>
									For Doctors
								</Link>
							</li>
							<li>
								<Link
									to="/security"
									className="hover:text-gray-400"
								>
									Security
								</Link>
							</li>
							<li>
								<Link
									to="/contact-us"
									className="hover:text-gray-400"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="/faqs"
									className="hover:text-gray-400"
								>
									FAQs
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Information */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Contact Information
						</h3>
						<p className="mb-2">
							Email:{" "}
							<a
								href="mailto:contact@[appname].com"
								className="hover:text-gray-400"
							>
								contact@[appname].com
							</a>
						</p>
						<p>
							Phone:{" "}
							<a
								href="tel:+1-XXX-XXX-XXXX"
								className="hover:text-gray-400"
							>
								+1-XXX-XXX-XXXX
							</a>
						</p>
					</div>

					{/* Social Media Icons */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Follow Us
						</h3>
						<div className="flex space-x-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-400"
							>
								<FaFacebook size={24} />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-400"
							>
								<FaTwitter size={24} />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-400"
							>
								<FaLinkedin size={24} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-400"
							>
								<FaInstagram size={24} />
							</a>
						</div>
					</div>
				</div>

				{/* Legal Information */}
				<div className="mt-8 border-t border-gray-700 pt-6 text-center">
					<ul className="flex justify-center space-x-6">
						<li>
							<Link
								to="/privacy-policy"
								className="hover:text-gray-400"
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								to="/terms-of-service"
								className="hover:text-gray-400"
							>
								Terms of Service
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
