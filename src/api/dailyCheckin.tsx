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
    const data= await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Check-in failed');
    }
    return data;
  } catch (error) {
    console.error('Error uploading daily check-in:', error);
    throw error;
  }
}
