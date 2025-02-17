import { useQuery } from "react-query";
import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import IndexPage from "./pages/IndexPage/IndexPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
	const healthCheckQuery = useQuery(
		["healthCheckQuery"],
		healthCheckApi,
		{
			refetchOnWindowFocus: false,
			enabled: true,
			cacheTime: 1000 * 60 * 10, // 캐시 유지 시간(언마운트 이후) >> 10분
			staleTime: 1000 * 60 * 10, // 10분마다 최신의 캐시 상태 유지(refetch)
		}
	);

	if (!healthCheckQuery.isLoading) {
		console.log(healthCheckQuery.data.data.status); // react-query의 data . axios 의 data . response 로 받아오는 "status"
	}

    return (
		<Container maxWidth="lg">
         <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
         </Routes>
       </Container>
    );
}

export default App;
