import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

// Dữ liệu mặc định chuẩn theo LKVN (nếu không truyền props)
const DEFAULT_KIEN_THUC = [
    {
        id: 'kt-1',
        title: 'Đinh lăng và những điều không ngờ',
        image: 'Images/Slide/A_17_0.png',
        link: '/tin-tuc/dinh-lang-va-nhung-dieu-khong-ngo/1'
    },
    {
        id: 'kt-2',
        title: 'Đinh lăng và những điều không ngờ (Phần 2)',
        image: 'Images/Slide/A_17_0.png',
        link: '/tin-tuc/dinh-lang-va-nhung-dieu-khong-ngo/2'
    }
];

const DEFAULT_TIN_MOI = [
    {
        id: 'tm-1',
        title: 'Quy Trình Sản Xuất Và Tiêu Thụ Sản Phẩm Tới Người Tiêu Dùng',
        image: 'Images/Slide/TRUNG-TAM-LIENKET_22.jpg',
        link: '/tin-tuc/quy-trinh-san-xuat-va-tieu-thu/1'
    },
    {
        id: 'tm-2',
        title: 'Công nghệ theo dõi giám sát và tưới nhỏ giọt',
        image: 'Images/Slide/FF_16_0.png',
        link: '/tin-tuc/cong-nghe-theo-doi-giam-sat-va-tuoi-nho-giot/2'
    },
    {
        id: 'tm-3',
        title: 'Công nghệ nhân giống khí canh',
        image: 'Images/News/Icon/DHNONG-LAM-TPHCM-LKVN-CHUYEN-GIAO-0.jpg',
        link: '/tin-tuc/cong-nghe-nhan-giong-khi-canh/3'
    },
    {
        id: 'tm-4',
        title: 'Các mô hình - dự án công ty đang liên kết',
        image: 'Images/Slide/TRUNG-TAM-LIENKET_22.jpg',
        link: '/tin-tuc/cac-mo-hinh-du-an-cong-ty-dang-lien-ket/4'
    },
    {
        id: 'tm-5',
        title: 'Tầm nhìn của công ty Thảo dược LKVN',
        image: 'Images/Slide/A_17_0.png',
        link: '/tin-tuc/tam-nhin-cua-cong-ty-thao-duoc-lkvn/5'
    }
];

const DEFAULT_HOAT_DONG = [
    {
        id: 'hd-1',
        title: 'CÔNG TY CỔ PHẦN THẢO DƯỢC LIÊN KẾT VIỆT NAM KÝ LIÊN KẾT',
        image: 'Images/News/Icon/LKVN-KY-KET-TRAVEL-ONE.jpg',
        link: '/tin-tuc/lkvn-ky-lien-ket/1'
    },
    {
        id: 'hd-2',
        title: 'BẤT NGỜ 7 CÔNG DỤNG CHỮA BỆNH CỦA LÁ ĐINH LĂNG',
        image: 'Images/Slide/_20.png',
        link: '/tin-tuc/cong-dung-chua-benh-la-dinh-lang/2'
    }
];

// Khối widget từng danh mục có border và đường kẻ chấm
const SidebarSection = ({ title, items = [] }) => (
    <div className="space-y-1.5">
        <h3 className="text-[13px] font-extrabold uppercase text-[#006837] tracking-wider border-b border-dotted border-gray-300 pb-1">
            {title}
        </h3>
        <div className="border border-gray-200 bg-white p-2 divide-y divide-dotted divide-gray-200">
            {items.map((item) => (
                <NavLink
                    key={item.id}
                    to={item.link || '#'}
                    className="flex items-start gap-2.5 py-2 group hover:bg-emerald-50/40 transition-colors px-1"
                >
                    <div className="w-[68px] h-[46px] shrink-0 overflow-hidden border border-gray-200 bg-gray-100">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <span className="text-[11.5px] font-semibold text-[#008d4c] group-hover:text-[#005a2e] leading-snug line-clamp-3">
                        {item.title}
                    </span>
                </NavLink>
            ))}
        </div>
    </div>
);

export default function LkvnNewsSidebar({
    search = '',
    setSearch,
    showSearch = true,
    kienThucList = DEFAULT_KIEN_THUC,
    tinMoiList = DEFAULT_TIN_MOI,
    hoatDongList = DEFAULT_HOAT_DONG,
    bannerImage = 'Images/Slide/TRUNG-TAM-LIENKET_22.jpg',
    className = ''
}) {
    return (
        <aside className={`space-y-6 ${className}`}>
            {/* 1. Ô Tìm kiếm (tùy chọn) */}
            {showSearch && setSearch && (
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin tức..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#006837]"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
            )}

            {/* 2. KIẾN THỨC DƯỢC */}
            <SidebarSection title="KIẾN THỨC DƯỢC" items={kienThucList} />

            {/* 3. TIN MỚI */}
            <SidebarSection title="TIN MỚI" items={tinMoiList} />

            {/* 4. HOẠT ĐỘNG */}
            <SidebarSection title="HOẠT ĐỘNG" items={hoatDongList} />

            {/* 5. LIÊN KẾT THƯ VIỆN */}
            <div className="space-y-1.5">
                <h3 className="text-[13px] font-extrabold uppercase text-[#006837] tracking-wider border-b border-dotted border-gray-300 pb-1">
                    LIÊN KẾT THƯ VIỆN
                </h3>
                <div className="border border-gray-200 p-1 bg-white">
                    <div className="aspect-[16/7] overflow-hidden bg-gray-100">
                        <img
                            src={bannerImage}
                            alt="Liên kết thư viện LKVN"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}