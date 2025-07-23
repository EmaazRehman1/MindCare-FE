import { BASE_URL } from "../env";

export const uploadDailyCheckin = async (formData:any)=>{
  try {
    const response = await fetch(`${BASE_URL}/dailycheckin`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading daily check-in:', error);
    throw error;
  }
}
