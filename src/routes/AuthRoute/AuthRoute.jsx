import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SigninPage from '../../pages/SigninPage/SigninPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    console.log(queryClient.getQueryState(["userQuery"]));
    console.log(queryClient.getQueryData(["userQuery"]));
    const isLogin = !!queryClient.getQueryData(["userQuery"]);

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        } // 아래 줄은 경고 문구 삭제를 위함 > React Hook useEffect has missing dependencies: 'isLogin' and 'navigate'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                !isLogin &&
                <Routes>
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            }
        </>
    );
}

export default AuthRoute;

// isLogin 에 login 되어있는지 확인하게끔 넣어주고
// return 실행 >> isLogin 이 false 인 경우(로그인이 안됨) Routes 렌더링
//                isLogin 이 true 인 경우(로그인이 됨) useEffect 동작(최초의 한번만) >> navigate 실행됨