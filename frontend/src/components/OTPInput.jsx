import React, { useState } from 'react';
import axios from 'axios';

const OTPInput = ({ ride, onRideStarted, onClose }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/start`,
                {},
                {
                    params: { rideId: ride._id, otp: otp },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("captainToken")}`
                    }
                }
            );

            if (response.data) {
                onRideStarted(response.data);
            }
        } catch (error) {
            console.error('Error starting ride:', error);
            setError(error.response?.data?.message || 'Failed to start ride. Please check your OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-sm mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Enter OTP to Start Ride</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ride Details:</p>
                    <p className="text-sm"><strong>From:</strong> {ride?.pickup}</p>
                    <p className="text-sm"><strong>To:</strong> {ride?.destination}</p>
                    <p className="text-sm"><strong>Fare:</strong> ${ride?.fare}</p>
                </div>

                <form onSubmit={handleOTPSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter 6-digit OTP:
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                            placeholder="000000"
                            maxLength="6"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Starting...' : 'Start Ride'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPInput;
