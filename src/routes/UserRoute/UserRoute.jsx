import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useQueryClient } from '@tanstack/react-query';

function UserRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isLogin = !!queryClient.getQueryData(["userQuery"]);

    useEffect(() => {
        if (!isLogin) {
            alert("로그인이 필요한 서비스입니다.")
            navigate("/auth/signin");
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                isLogin &&
                <Routes>
                    <Route path='/profile' element={<ProfilePage />} />
                </Routes>
            }
        </>
    );
}

export default UserRoute;