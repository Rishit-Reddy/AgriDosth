// src/components/PaymentQRCode.tsx
import React from 'react';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import qrCode from '../assets/Qrcode.png';
import gpay from '../assets/gpay.webp';
import phonepe from '../assets/phonepe-icon.webp';
import paytm from '../assets/paytm.png';
import amazon from '../assets/amazom.png';

const PaymentQRCode: React.FC = () => {
  const navigate = useNavigate();
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center mt-5 p-6 border border-gray-300 rounded-lg bg-white max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">CropNeeds Payment</h2>
      <p className="text-lg mb-6">Pay With UPI QR</p>
      <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto mb-6" />
      <p className="text-xl mb-4">Amount: ₹ {totalPrice}</p>
      <p className="text-sm mb-4">Scan the QR using any UPI app on your phone.</p>
      <div className="flex justify-center space-x-2 mb-4">
        <img src={gpay} alt="Pay Icon" className="w-10 h-10" />
        <img src={amazon} alt="Icon" className="w-10 h-10" />
        <img src={paytm} alt="Icon" className="w-10 h-10" />
        <img src={phonepe} alt="Icon" className="w-10 h-10" />
      </div>
      <div className="container max-w-fit mx-auto rounded p-3 border border-cyan-600">
        Cash On Delivery
      </div>
      <p className="text-sm mt-6">QR Code by <strong>UPIGateway</strong></p>
    </div>
  );
};

export default PaymentQRCode;
