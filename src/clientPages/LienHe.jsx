import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LkvnNewsSidebar from '../components/LkvnNewsSidebar.jsx';

export default function LienHe() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.content.trim()) {
            toast.error('Vui lòng nhập nội dung liên hệ!');
            return;
        }

        setLoading(true);
        try {
            // Thay bằng hàm gọi API liên hệ thực tế của backend nếu có
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success('Gửi thông tin liên hệ thành công!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                subject: '',
                content: ''
            });
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <main className="max-w-[1240px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ===================== CỘT TRÁI: SIDEBAR LKVN (4 CỘT) ===================== */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <LkvnNewsSidebar showSearch={false} />
                    </div>

                    {/* ===================== CỘT PHẢI: FORM CHUẨN NGUYÊN BẢN (8 CỘT) ===================== */}
                    <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">

                        {/* 1. THÔNG TIN DOANH NGHIỆP TRÊN CÙNG */}
                        <div className="space-y-2 text-sm sm:text-[15px] leading-relaxed">
                            <h1 className="text-base sm:text-lg font-bold uppercase text-[#009245] tracking-wide mb-3">
                                CÔNG TY CỔ PHẦN THẢO DƯỢC LKVN
                            </h1>

                            <div className="grid grid-cols-[100px_15px_1fr] sm:grid-cols-[110px_15px_1fr] text-gray-900 gap-y-1.5 items-baseline">
                                <span className="font-normal text-gray-900">Địa chỉ</span>
                                <span className="text-center font-normal">:</span>
                                <span>Thôn Hạnh Trí 2, xã Quảng Sơn, huyện Ninh Sơn, tỉnh Ninh Thuận</span>

                                <span className="font-normal text-gray-900">Điện thoại</span>
                                <span className="text-center font-normal">:</span>
                                <span>0964.685.128</span>

                                <span className="font-normal text-gray-900">Fax</span>
                                <span className="text-center font-normal">:</span>
                                <span></span>

                                <span className="font-normal text-gray-900">Hotline</span>
                                <span className="text-center font-normal">:</span>
                                <span>090 55 33 247</span>

                                <span className="font-normal text-gray-900">Email</span>
                                <span className="text-center font-normal">:</span>
                                <a href="mailto:info@lkvn.vn" className="hover:underline text-gray-900">
                                    info@lkvn.vn
                                </a>
                            </div>
                        </div>

                        {/* 2. DÒNG HƯỚNG DẪN */}
                        <div className="pt-2">
                            <p className="text-xs sm:text-sm text-[#009245]">
                                Quý khách vui lòng điền đầy đủ thông tin dưới đây.
                            </p>
                        </div>

                        {/* 3. FORM NHẬP LIỆU CHUẨN 2 CỘT */}
                        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">

                            {/* Tên của bạn */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
                                <label className="sm:col-span-4 font-bold text-gray-900">
                                    Tên của bạn
                                </label>
                                <div className="sm:col-span-8">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Địa chỉ email */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
                                <label className="sm:col-span-4 font-bold text-gray-900">
                                    Địa chỉ email
                                </label>
                                <div className="sm:col-span-8">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Số điện thoại */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
                                <label className="sm:col-span-4 font-bold text-gray-900">
                                    Số điện thoại
                                </label>
                                <div className="sm:col-span-8">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Địa chỉ người gửi */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
                                <label className="sm:col-span-4 font-bold text-gray-900">
                                    Địa chỉ người gửi
                                </label>
                                <div className="sm:col-span-8">
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Tiêu đề */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
                                <label className="sm:col-span-4 font-bold text-gray-900">
                                    Tiêu đề
                                </label>
                                <div className="sm:col-span-8">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Nội dung liên hệ (*) */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-start">
                                <label className="sm:col-span-4 font-bold text-gray-900 pt-1">
                                    Nội dung liên hệ <span className="text-red-600 font-bold">(*)</span>
                                </label>
                                <div className="sm:col-span-8">
                                    <textarea
                                        name="content"
                                        rows="6"
                                        required
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-none focus:outline-none focus:border-[#009245] text-gray-800 resize-y"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Nút gửi */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 pt-2">
                                <div className="sm:col-start-5 sm:col-span-8 flex gap-3">
                                    <button
                                        type="reset"
                                        onClick={() => setFormData({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            address: '',
                                            subject: '',
                                            content: ''
                                        })}
                                        className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs uppercase transition-colors"
                                    >
                                        Nhập lại
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-1.5 bg-[#009245] hover:bg-[#007a3a] text-white font-bold text-xs uppercase transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Đang gửi...' : 'Gửi liên hệ'}
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </main>
        </div>
    );
}