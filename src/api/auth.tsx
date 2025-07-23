import { BASE_URL } from "../env";

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error("Login failed");
        }
        const data = await response.json();
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.data));
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}

export const signUp=async (email: string, password: string, name: string) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name })
        });
        if (!response.ok) {
            throw new Error("Sign up failed");
        }
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.data));
        return data;
    } catch (error) {
        console.error("Error signing up:", error);
        return null;
    }
}