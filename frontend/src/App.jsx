import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardPagePatient from "./pages/DashboardPagePatient";
import DashboardPageDoctor from "./pages/DashboardPageDoctor";
import TreatmentHistory from "./pages/TreatmentHistory";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectRoute from "./components/ProtectRoute";
import LoadingSpinner from "./components/LoadingSpinner";

import useInitialAuth from "./hooks/useInitialAuth";
import usePatient from "./hooks/usePatienth";
import News from "./pages/News";

function App() {
	const [isLoading, setLoading] = useState(true);
	const { user, isAuthenticated } = useInitialAuth(setLoading);

	// Get auth state from Redux
	const token = useSelector((store) => store.auth.token);

	// Load patient data (if you need this hook)
	usePatient();

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			<Router>
				<Navbar />

				<main className="min-h-screen">
					<Routes>
						{/* Public Routes (accessible to all) */}
						<Route path="/home" element={<Home />} />
						<Route path="/news" element={<News />} />

						{/* Auth-only protected routes */}
						<Route element={<ProtectRoute token={token} />}>
							<Route
								path="/"
								element={
									user?.isDoctor ? (
										<DashboardPageDoctor />
									) : (
										<DashboardPagePatient />
									)
								}
							/>
							<Route
								path="/patientdashboard"
								element={<DashboardPagePatient />}
							/>
							<Route
								path="/treatmentHistory/:patientId"
								element={
									user?.isDoctor ? (
										<TreatmentHistory />
									) : (
										<Navigate
											to="/patientdashboard"
											replace
										/>
									)
								}
							/>
						</Route>

						{/* Routes only for non-authenticated users */}
						<Route
							element={
								<ProtectRoute token={!token} redirect="/" />
							}
						>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
						</Route>
					</Routes>
				</main>

				<Footer />
			</Router>
			<Toaster position="top-center" reverseOrder={false} />
		</>
	);
}

export default App;
