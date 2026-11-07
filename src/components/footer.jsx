import React, { useState } from "react";
import {
    Phone,
    Truck,
    RefreshCw,
    MessageSquare,
    Tag,
    MapPin,
    Mail,
    Globe,
} from "lucide-react";
import ApiContact from "../apis/ApiContact";
import { toast } from 'react-toastify'
import ApiMapCrm from "../apis/ApiMapCrm";

// ================= ServiceCommitment: ĐÃ SỬA SANG CĂN TRÁI =================
const ServiceCommitment = ({ icon: Icon, title, description }) => (
    <div className="group text-left p-3 bg-white rounded-xl hover:shadow-lg transition-all duration-500 hover:-translate-y-1 w-full max-w-[150px] aspect-square flex flex-col justify-center items-start mx-auto border border-gray-50">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="px-0">
            <h4 className="text-[12px] font-bold text-gray-900 mb-1 leading-tight line-clamp-2 uppercase">
                {title}
            </h4>
            <p className="text-[10px] text-gray-600 leading-tight line-clamp-2">
                {description}
            </p>
        </div>
    </div>
);

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const LOGO = "/logo.png";
    const ZALOPAY_IMG = "/zalopay.png";
    const MOMO_IMG = "/MoMo.png";
    const BANK_TRANSFER_IMG = "/Bank.png";

    const socialImages = [
        { name: "Facebook", src: "/facebook.png", href: "https://www.facebook.com/cmicstudio" },
        { name: "YouTube", src: "/YouTube.png", href: "https://www.youtube.com/@CMICSTUDIO" },
        { name: "TikTok", src: "/tiktok.png", href: "https://www.tiktok.com/@cmic.studio" },
        { name: "Zalo", src: "/zalo.webp", href: "#" }
    ];

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const contactData = {
                name: "client",
                phone: 0,
                email: email,
                message: `Tôi đang quan tâm đến sản phẩm của bạn. Hãy liên hệ với tôi sớm nhất có thể!`,
            };

            // gửi crm
            let data = await ApiMapCrm.searchCustomerByPhoneOrEmailApi(contactData.phone, contactData.email);
            if (data && Array.isArray(data.DT) && data.DT.length > 0) {
                const customer = data.DT[0];
                const customerId = Number(customer.id);

                let res = await ApiMapCrm.createPurchaseHistory(customerId, {
                    issue: contactData.message
                });
            } else {
                const customerResponse = await ApiMapCrm.createCustomer({
                    fullName: contactData.name,
                    phone: contactData.phone,
                    email: contactData.email,
                    ecosystem: 'CMIC_STUDIO'
                });
                const customerResult = customerResponse?.DT || customerResponse;
                if (customerResult?.id) {
                    await ApiMapCrm.createPurchaseHistory(customerResult.id, {
                        issue: contactData.message
                    });
                }
            }

            // gửi thông báo đến lark và gửi email
            let res = await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi thông tin liên hệ thành công!');
            setEmail('');
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi thông tin liên hệ thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="text-white font-sans">
            {/* Phần thông tin chính - Thay items-center thành items-start */}
            <div className="bg-[#00a651]">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 px-6 py-12">

                    {/* Cột 1: Thông tin liên hệ - Đổi justify-center thành justify-start */}
                    <div className="w-full lg:w-auto space-y-6 text-left">
                        <div className="flex justify-start items-center space-x-4">
                            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/10 backdrop-blur-sm p-1.5 shadow-lg border-2 border-white/20 aspect-square shrink-0 flex items-center justify-center overflow-hidden">
                                <img
                                    src={LOGO}
                                    alt="Logo LKVN"
                                    className="w-full h-full object-contain drop-shadow"
                                />
                            </div>
                            <div className="space-y-0.5">
                                <h2 className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tight">
                                    LKVN
                                </h2>
                                <p className="text-emerald-100 text-xs sm:text-sm font-medium opacity-90 leading-snug">
                                    Liên kết phát triển dược liệu sạch &
                                </p>
                                <p className="text-emerald-100 text-xs sm:text-sm font-medium opacity-90 leading-snug">
                                    Sản phẩm thảo dược thiên nhiên chuẩn GMP
                                </p>
                            </div>
                        </div>

                        {/* Danh sách thông tin dạng Icon + Text liên kết thẳng góc trái */}
                        <div className="text-base space-y-4">
                            <div className="flex items-start justify-start">
                                <MapPin className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3 mt-1" />
                                <p className="max-w-xs">Thôn Hạnh Trí 2, xã Quảng Sơn, huyện Ninh Sơn, tỉnh Ninh Thuận</p>
                            </div>
                            <div className="flex items-center justify-start">
                                <Phone className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p><span className="font-bold">Hotline:</span> 0964.685.128</p>
                            </div>
                            <div className="flex items-center justify-start">
                                <Phone className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p><span className="font-bold">Hotline:</span> 090 55 33 247</p>
                            </div>
                            <div className="flex items-center justify-start">
                                <Globe className="w-5 h-5 text-orange-950 flex-shrink-0 mr-3" />
                                <p><span className="font-bold">Website:</span> info@lkvn.vn</p>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Chính sách & Hỗ trợ - Chuyển items-center sang items-start, text-center sang text-left */}
                    <div className="w-full lg:w-auto flex flex-col items-start text-left space-y-4">
                        <h2 className="text-lg lg:text-xl font-bold uppercase tracking-wider">Thảo Dược Cốt Lõi</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="dieu-khoan-dich-vu-va-dieu-kien-giao-dich-chung" className="hover:underline hover:text-orange-950 transition-colors">• Rượu Sâm Ngọc Cẩu</a>
                            </li>
                            <li>
                                <a href="cac-phuong-thuc-thanh-toan" className="hover:underline hover:text-orange-950 transition-colors">• Rượu Sâm Tiến Vua</a>
                            </li>
                            <li>
                                <a href="chinh-sach-van-chuyen-va-giao-nhan" className="hover:underline hover:text-orange-950 transition-colors">• Trà đinh Lăng</a>
                            </li>
                            <li>
                                <a href="chinh-sach-bao-mat-thong-tin-ca-nhan" className="hover:underline hover:text-orange-950 transition-colors">• Nước uống Đinh Lăng</a>
                            </li>
                            <li>
                                <a href="chinh-sach-bao-mat-thong-tin-ca-nhan" className="hover:underline hover:text-orange-950 transition-colors">• Trà Khổ Qua</a>
                            </li>
                            <li>
                                <a href="chinh-sach-bao-mat-thong-tin-ca-nhan" className="hover:underline hover:text-orange-950 transition-colors">• Trà túi lọc đinh lăng</a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Đăng ký & Social - Sửa sang items-start và text-left toàn diện */}
                    <div className="w-full lg:w-auto flex flex-col items-start text-left space-y-6">
                        {/* Social + Payment: Sửa flex flex-col items-center sang items-start */}
                        <div className="w-full flex flex-col items-start gap-5 pt-5 border-t border-white/20">
                            <div className="flex items-center space-x-4 opacity-90 transition-all">
                                <img src={ZALOPAY_IMG} alt="ZaloPay" className="h-6" />
                                <img src={MOMO_IMG} alt="MoMo" className="h-6" />
                                <img src={BANK_TRANSFER_IMG} alt="Bank" className="h-6" />
                            </div>
                            <div className="flex items-center space-x-4 opacity-90 transition-all cursor-pointer">
                                <a href="http://online.gov.vn/Home/WebDetails/143786" target="_blank" rel="noopener noreferrer">
                                    <img src="/bct.gif" alt="Bộ Công Thương" className="h-16" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}