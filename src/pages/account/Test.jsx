import React from 'react'
import { API_URL } from '../../utils/constants';
import axios from 'axios';

const Test = () => {

    const handleClick = async () => {
        try {
            const token = localStorage.getItem('token'); // or wherever you store it
            const response = await axios.get(`${API_URL}/api/test`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response) {
                // Backend returned an error
                console.log('Error response:', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
        }
    }

    return (
        <div className='mt-20'>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default Test
