import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import { Container } from "@mui/material";
import { userApi } from "./api/apis/userApi";
import { jwtDecode } from "jwt-decode";
import UserRoute from "./routes/UserRoute/UserRoute";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {

	const healthCheckQuery = useQuery({
		queryKey: ["healthCheckQuery"],
		queryFn: healthCheckApi,
		cacheTime: 1000 * 60 * 10, // 캐시 유지 시간(언마운트 이후) >> 10분
		staleTime: 1000 * 60 * 10, // 10분마다 최신의 캐시 상태 유지(refetch)
	});

	if (!healthCheckQuery.isLoading) {
		console.log(healthCheckQuery.data.data.status); // react-query의 data . axios 의 data . response 로 받아오는 "status"
	}

	const userQuery = useQuery({
		queryKey: ["userQuery"],
		queryFn: async () => {
			const accessToken = localStorage.getItem("AccessToken");
			if (!accessToken) {
				return null;	// token 이 없으면 null 반환
			}
			const decodedJwt = jwtDecode(accessToken);
			console.log(decodedJwt.userId);
			return await userApi(decodedJwt.userId);
		},
	});

    return (
		<Container maxWidth="lg">
			{
				(!userQuery.isLoading && !userQuery.isRefetching) && // 로딩이 끝난 경우에 아래를 렌더링 (&& 캐시 처리(refetch))
				<>
					<MainHeader />
					<Routes>
						<Route path="/" element={<IndexPage />} />
						<Route path="/user/*" element={<UserRoute />} />
						<Route path="/auth/*" element={<AuthRoute />} />
					</Routes>
				</>
			}
       </Container>
    );
}

export default App;
