const doctorFeatures = [
	{
		title: "Upload and Manage Patient Records",
		description:
			"Easily upload and manage patient records, ensuring all information is up-to-date and accessible.",
	},
	{
		title: "Send Prescriptions and Test Results Instantly",
		description:
			"Send prescriptions and test results directly to patients in real-time, streamlining communication.",
	},
	{
		title: "Schedule and Manage Appointments",
		description:
			"Efficiently schedule and manage patient appointments with built-in reminders and notifications.",
	},
	{
		title: "Secure Messaging and Video Consultations",
		description:
			"Engage with patients securely through messaging and video consultations, ensuring privacy and convenience.",
	},
];

const features = [
	{
		title: "Centralized Medical History",
		description:
			"All your medical records, tests, prescriptions, and doctor’s notes in one secure place.",
	},
	{
		title: "Real-Time Updates",
		description:
			"Doctors update your records after every visit, so you always have the latest information at your fingertips.",
	},
	{
		title: "Secure Data Sharing",
		description:
			"Share your records with specialists or new healthcare providers securely and with full control.",
	},
	{
		title: "Appointment Management",
		description:
			"Easily schedule, track, and get reminders for upcoming doctor appointments.",
	},
	{
		title: "Health Analytics",
		description:
			"Track health trends and gain insights from your medical data over time.",
	},
	{
		title: "Multi-Language Support",
		description:
			"Access your health information in multiple languages for easier understanding and communication.",
	},
];

const securityPoints = [
	{
		title: "HIPAA-compliant platform",
		description:
			"Our platform meets all relevant regional data protection standards to ensure your data is handled with the utmost care.",
	},
	{
		title: "Two-Factor Authentication (2FA)",
		description:
			"Add an extra layer of security to your account with Two-Factor Authentication (2FA).",
	},
	{
		title: "Encrypted Data Storage",
		description:
			"All data is securely encrypted both at rest and in transit, ensuring your information is protected from unauthorized access.",
	},
	{
		title: "Full Control Over Access",
		description:
			"You have complete control over who can access your information, providing peace of mind and transparency.",
	},
];

const steps = [
	{
		title: "Sign Up",
		description:
			"Create your secure account and input your basic information.",
	},
	{
		title: "Connect with Your Doctor",
		description:
			"Your doctor uploads your medical records, test results, and prescriptions after each visit.",
	},
	{
		title: "Access & Share",
		description:
			"View and share your records whenever and wherever you need them.",
	},
	{
		title: "Stay Informed",
		description:
			"Receive alerts for upcoming appointments, prescription refills, and important health updates.",
	},
];

const _Home = () => {
	return (
		<>
			<main className=" ">
				<section className="flex w-full justify-center items-center h-[90vh] flex-col md:flex-row gap-4 overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500 opacity-100 rounded-b-lg p-12 text-white">
					<div className="w-full md:w-2/4 flex mt-40  md:mt-10 justify-center items-center rounded-full relative">
						<div className="w-[27rem] h-[27rem] bg-white rounded-full"></div>

						<img
							src="/heroMain.png"
							alt=""
							className=" rotate-2 rounded-full z-30 w-[30rem] right-2 -top-[2rem] h-[30rem] block absolute  "
						/>
					</div>
					<div className=" text-center md:text-justify md:mt-0 mt-36 flex md:pl-10 flex-col items-center">
						<div className="flex justify-center mb-6">
							<p className="text-6xl font-main font-bold">
								Saatvik
							</p>
						</div>
						<div className="">
							<h2 className="text-4xl font-bold mb-4">
								Saatvik: Simplifying Medical History Management
							</h2>
							<p className="text-xl font-medium mb-6">
								"Saatvik is a secure platform designed to
								streamline the management of a person's medical
								history using their Aadhar card. With easy
								access for doctors, it ensures that healthcare
								professionals can quickly retrieve and review a
								patient's treatment records, enhancing the
								continuity of care across medical facilities."
							</p>
							<p className="text-lg">
								- Hon'ble PM Narendra Modi
							</p>
						</div>
					</div>
				</section>
				<div className="container mx-auto">
					<section className="mt-12 flex  p-10 justify-center items-center  rounded-xl gap-10 bg-gray-800 text-white font-main font-bold  ">
						<p className="text-2xl md:text-4xl">
							Forget managing records—just sign in for seamless
							healthcare tracking
						</p>
						<button className="px-4 py-2 min-w-fit md:px-8 md:py-4 hover:bg-orange-600 bg-orange-500 text-white  rounded-full">
							Sign in
						</button>
					</section>

					{
						<section className="py-20 mt-12 bg-orange-500 rounded-xl">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="text-center">
									<h2 className="text-3xl font-extrabold text-white">
										Why Choose Saatvik?
									</h2>
									<p className="mt-4 text-lg text-slate-50">
										Simplify your healthcare journey with
										these essential features.
									</p>
								</div>
								<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
									{features.map((feature, index) => (
										<div
											key={index}
											className="bg-white  shadow-md rounded-lg p-6 hover:scale-105 hover:shadow-xl transition-all duration-300"
										>
											<h3 className="text-xl font-semibold text-black">
												{feature.title}
											</h3>
											<p className="mt-4 text-black">
												{feature.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					}

					{
						<section className="my-12 py-12 bg-gray-800 rounded-xl">
							<div className="max-w-screen-xl mx-auto px-6 lg:px-8">
								<div className="text-center">
									<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
										How It Works
									</h2>
								</div>
								<div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
									{steps.map((step, index) => (
										<div
											key={index}
											className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
										>
											<h3 className="text-xl font-semibold text-black">{`Step ${
												index + 1
											}: ${step.title}`}</h3>
											<p className="mt-4 text-gray-600">
												{step.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					}
					{
						<section className="py-12 bg-orange-500 rounded-xl">
							<div className="max-w-screen-xl mx-auto px-6 lg:px-8">
								<div className="text-center">
									<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
										A Seamless Experience for Doctors
									</h2>
									<p className="mt-4 text-lg text-white">
										Streamline patient care with secure
										access to medical records and
										easy-to-use communication tools.
									</p>
								</div>
								<div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
									{doctorFeatures.map((feature, index) => (
										<div
											key={index}
											className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
										>
											<h3 className="text-xl font-semibold text-black">
												{feature.title}
											</h3>
											<p className="mt-2 text-slate-900">
												{feature.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					}
					{
						<section className="py-12 mt-12 bg-gray-800 rounded-xl">
							<div className="max-w-screen-xl mx-auto px-6 lg:px-8">
								<div className="text-center">
									<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
										Your Data, Safe and Secure
									</h2>
									<p className="mt-4 text-lg text-white">
										We prioritize your privacy and security
										at every step.
									</p>
								</div>
								<div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
									{securityPoints.map((point, index) => (
										<div
											key={index}
											className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
										>
											<h3 className="text-xl font-semibold text-gray-800">
												{point.title}
											</h3>
											<p className="mt-2 text-gray-600">
												{point.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</section>
					}

					{
						<section className="py-12 mb-12 bg-gray-800 mt-12 text-white">
							<div className="max-w-screen-xl mx-auto px-6 lg:px-8 text-center">
								<h2 className="text-3xl font-extrabold sm:text-4xl">
									Ready to Simplify Your Healthcare Journey?
								</h2>
								<p className="mt-4 text-lg">
									Sign up now and take control of your medical
									history today.
								</p>
								<div className="mt-8 flex justify-center gap-4">
									<a
										href="#get-started"
										className="inline-block bg-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
									>
										Get Started
									</a>
									<a
										href="#contact-us"
										className="inline-block bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg  shadow-md hover:bg-white hover:text-gray-800 transition-colors duration-300"
									>
										Contact Us
									</a>
								</div>
							</div>
						</section>
					}
				</div>

				{/* <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            How Can We Help You?
          </h2>
          <div className="flex justify-around gap-8">
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/idea-icon.svg"
                alt="Idea Icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">
                I have an idea
              </h3>
              <ul className="list-disc ml-6">
                <li>Learn how get started using Academy</li>
                <li>Idea validation and access to mentorship</li>
                <li>Quick and easy company registration</li>
              </ul>
              <button className="px-8 py-4 rounded-md bg-pink-500 text-white hover:bg-pink-600 font-bold mt-6">
                GET STARTED
              </button>
            </div>
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/startup-icon.svg"
                alt="Startup Icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">
                I have an startup
              </h3>
              <ul className="list-disc ml-6">
                <li>Self certification and compliance</li>
                <li>INR 10,000 crore of funding support</li>
                <li>Tax Exemptions for 3 years</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Services We Provide
          </h2>
          <div className="flex justify-around gap-8">
            <div className="flex flex-col items-center">
              <img
                src="/images/women-empowerment-icon.svg"
                alt="Women Empowerment Icon"
                className="h-16 mb-4"
              />
              <p className="text-lg font-medium">Women Empowerment</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/mentor-icon.svg"
                alt="Mentor Icon"
                className="h-16 mb-4"
              />
              <p className="text-lg font-medium">Mentor</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/service-provider-icon.svg"
                alt="Service Provider Icon"
                className="h-16 mb-4"
              />
              <p className="text-lg font-medium">Service Provider</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/knowledge-bank-icon.svg"
                alt="Knowledge Bank Icon"
                className="h-16 mb-4"
              />
              <p className="text-lg font-medium">Knowledge Bank</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/wep-academy-icon.svg"
                alt="WEP Academy Icon"
                className="h-16 mb-4"
              />
              <p className="text-lg font-medium">WEP Academy</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-pink-500 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Support</h2>
          <p className="text-xl font-medium mb-6">
            Mentorship and Events
          </p>
        </section>

        <section className="mt-12">
          <div className="flex justify-center gap-8">
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/idea-validation-icon.svg"
                alt="Idea Validation Icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">
                Idea validation
              </h3>
              <p className="text-lg font-medium">
                Help in identifying your idea, assess it with respect to
                potential customers and the market environment
              </p>
            </div>
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/financial-legal-icon.svg"
                alt="Financial and Legal Icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">
                Financial and Legal
              </h3>
              <p className="text-lg font-medium">
                Building a legal foundation, Company registration, patents,
                break-even analysis and effective business planning
              </p>
            </div>
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/pitching-funding-icon.svg"
                alt="Pitching and Funding Icon"
                className="h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">
                Pitching and Funding
              </h3>
              <p className="text-lg font-medium">
                Fundraising and evaluation; understanding investor's mindset,
                pitching and termsheets; identifying key focus areas
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Upcoming Event
          </h2>
          <div className="flex justify-around gap-8">
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <div className="flex justify-between mb-4">
                <p className="text-sm">18 Oct. 2018</p>
                <p className="text-sm">Mumbai</p>
              </div>
              <img
                src="/images/event-image.jpg"
                alt="Event Image"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Event Name</h3>
              <p className="text-lg font-medium">Category Name</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <div className="flex justify-between mb-4">
                <p className="text-sm">18 Oct. 2018</p>
                <p className="text-sm">Mumbai</p>
              </div>
              <img
                src="/images/event-image.jpg"
                alt="Event Image"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Event Name</h3>
              <p className="text-lg font-medium">Category Name</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <div className="flex justify-between mb-4">
                <p className="text-sm">18 Oct. 2018</p>
                <p className="text-sm">Mumbai</p>
              </div>
              <img
                src="/images/event-image.jpg"
                alt="Event Image"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Event Name</h3>
              <p className="text-lg font-medium">Category Name</p>
            </div>
          </div>
          <button className="px-8 py-4 rounded-md bg-pink-500 text-white hover:bg-pink-600 font-bold mt-6">
            View All
          </button>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Our Success Stories
          </h2>
          <div className="flex justify-around gap-8">
            <div className="bg-pink-100 rounded-lg p-8 shadow-md">
              <img
                src="/images/success-story-1.jpg"
                alt="Success Story 1"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">NAME</h3>
              <p className="text-sm font-medium mb-2">Designation</p>
              <p className="text-sm font-medium mb-2">Company Name</p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/success-story-2.jpg"
                alt="Success Story 2"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/success-story-3.jpg"
                alt="Success Story 3"
                className="w-24 h-24 rounded-full"
              />
            </div>
          </div>
          <button className="px-8 py-4 rounded-md bg-pink-500 text-white hover:bg-pink-600 font-bold mt-6">
            View All
          </button>
        </section> */}

				{/* <footer className="bg-black text-white py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <img
                  src="/images/niti-aayog-logo.svg"
                  alt="NITI Aayog Logo"
                  className="h-20"
                />
              </div>
              <div>
                <img
                  src="/images/wep-logo.svg"
                  alt="WEP Logo"
                  className="h-20"
                />
                <p className="mt-2">
                  For queries, please reach out to:
                  <br />
                  wep-niti@gov.in
                </p>
              </div>
            </div>
            <nav className="mt-8 flex justify-around">
              <ul className="list-none">
                <li className="hover:underline">About WEP</li>
                <li className="hover:underline">WTI Awards</li>
                <li className="hover:underline">Partners</li>
              </ul>
              <ul className="list-none">
                <li className="hover:underline">Knowledge Bank</li>
                <li className="hover:underline">WEP Academy</li>
                <li className="hover:underline">Events</li>
              </ul>
            </nav>
          </div>
        </footer> */}
			</main>
		</>
	);
};

export default _Home;
