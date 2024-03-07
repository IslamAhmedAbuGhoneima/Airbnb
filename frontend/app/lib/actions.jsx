"use server";
import { cookies } from "next/headers";

const loginCookies = async (userID, accessToken, refreshToken) => {
    cookies().set("session_userID", userID, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One weake
        path: '/',
    });
    cookies().set("session_access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 60 minuets
        path: '/',
    });
    cookies().set("session_refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One weake
        path: '/',
    })
}

const logoutCookies = async () => {
    cookies().delete("session_userID");
    cookies().delete("session_access_token");
    cookies().delete("session_refresh_token");
}

const getUserID = async () => cookies().get("session_userID")?.value || null;


export { loginCookies, logoutCookies, getUserID }