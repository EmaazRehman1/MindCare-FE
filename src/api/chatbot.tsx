import { BASE_URL } from "../env";

export const fetchChatbotResponse = async (message: string) => {
    const response = await fetch(`${BASE_URL}/chatbot`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
    }

    const data = await response.json();
    return data;
}