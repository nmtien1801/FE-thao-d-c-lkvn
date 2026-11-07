import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ArrowRight,
    ChevronRight,
    ChevronLeft,
    Play,
    Leaf,
    Calendar,
    Award,
    CheckCircle2,
    Sparkles,
    Phone,
    Mail,
    MapPin,
    ExternalLink,
    ShieldCheck,
    TrendingUp,
    Users
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListPost } from '../redux/postSlice';
import { getListProductDropdown } from '../redux/productSlice';
import { typeCategory_obligatory } from '../utils/constants.js';
import ApiProductCategory from '../apis/ApiProductCategory';

// Component hiệu ứng cuộn mượt
function RevealOnScroll({ children, className = "", delay = 0, duration = 700 }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        const current = domRef.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`transition-all transform will-change-transform will-change-opacity ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-[0.985]'
                } ${className}`}
        >
            {children}
        </div>
    );
}

// Banner Slide thực tế từ LKVN
const lkvnSlides = [
    {
        img: "Images/Slide/TRUNG-TAM-LIENKET_22.jpg",
        tag: "Chuỗi Giá Trị",
        title: "Trung Tâm Liên Kết Chuỗi Giá Trị Dược Liệu",
        desc: "Khánh thành trung tâm bao tiêu và chế biến dược liệu sạch tại Ninh Sơn, Ninh Thuận.",
        link: "tt_LKVN-KHAI-TRUONG-TRUNG-TAM-LIEN-KET-CHUOI-GIA-TI.html"
    },
    {
        img: "Images/Slide/A_17_0.png",
        tag: "Vùng Trồng Sinh Thái",
        title: "Mô Hình Trồng Đinh Lăng Dưới Tán Rừng",
        desc: "Phát triển hệ sinh thái xanh bền vững, kết hợp bảo tồn rừng và tạo sinh kế lâu dài.",
        link: "tt_CAC-MO-HINH-DU-AN-CONG-TY-DANG-LIEN-KET.html"
    },
    {
        img: "Images/Slide/FF_16_0.png",
        tag: "Nông Nghiệp Công Nghệ Cao",
        title: "Hệ Thống Giám Sát & Tưới Nhỏ Giọt Tự Động",
        desc: "Ứng dụng công nghệ kiểm soát độ ẩm và vi chất, đảm bảo dược tính tự nhiên cao nhất.",
        link: "tt_CONG-NGHE-THEO-DOI-GIAM-SAT-VA-TUOI-NHO-GIOT.html"
    },
    {
        img: "Images/Slide/_20.png",
        tag: "Sản Phẩm Tiêu Biểu",
        title: "Trà Đinh Lăng & Nước Uống Đinh Lăng Nguyên Chất",
        desc: "Chiết xuất dược liệu tự nhiên đạt chuẩn GMP, bồi bổ khí huyết và tăng cường sức đề kháng.",
        link: "san-pham.html"
    },
    {
        img: "Images/Slide/_21_0.png",
        tag: "Dược Tính Tự Nhiên",
        title: "Trà Khổ Qua Rừng Thanh Nhiệt Giải Độc",
        desc: "Dược liệu sạch không đường, hỗ trợ ổn định đường huyết và thanh lọc cơ thể.",
        link: "san-pham.html"
    }
];

// Danh mục sản phẩm cốt lõi LKVN
const lkvnCategories = [
    { title: "Trà Đinh Lăng", desc: "Bồi bổ khí huyết, an thần", link: "xem_lkvn-8936546000021-tdl.html", img: "Images/Slide/_20.png" },
    { title: "Nước Uống Đinh Lăng", desc: "Chiết xuất rễ củ tự nhiên", link: "xem_lkvn-8936546000011-ndl.html", img: "Images/Slide/TRUONG_11_6.png" },
    { title: "Trà Khổ Qua Rừng", desc: "Thanh nhiệt, giải độc gan", link: "xem_lkvn-8936546000031-tkq.html", img: "Images/Slide/_21_0.png" },
    { title: "Dược Liệu Dưới Tán Rừng", desc: "Canh tác hữu cơ tự nhiên", link: "san-pham.html", img: "Images/Slide/A_17_0.png" },
    { title: "Dòng Sản Phẩm Không Đường", desc: "Tốt cho người kiêng đường", link: "san-pham.html", img: "Images/Slide/FF_15_4.png" }
];

// Tin tức & Lễ ký kết thực tế từ website LKVN
const realLkvnNews = [
    {
        id: 1,
        title: "ĐH Nông Lâm TP.HCM ký kết chuyển giao công nghệ cho Thảo Dược LKVN",
        desc: "Lễ ký kết diễn ra với sự tham dự của PGS.TS Kha Chấn Tuyền (Trưởng khoa CNHH & Thực phẩm) cùng ban lãnh đạo LKVN về ứng dụng công nghệ chế biến sâu dược liệu.",
        date: "27/09",
        tag: "Chuyển Giao Công Nghệ",
        img: "Images/News/Icon/DHNONG-LAM-TPHCM-LKVN-CHUYEN-GIAO-0.jpg",
        link: "tt_dhnong-lam-tphcm-lkvn-chuyen-giao.html"
    },
    {
        id: 2,
        title: "Lãnh đạo LKVN làm việc với đối tác Halal Việt Nam về dự án Halal Khánh Hòa",
        desc: "Mở rộng chuỗi giá trị và quy chuẩn quốc tế phục vụ xuất khẩu dược liệu sang thị trường Halal tiềm năng.",
        date: "19/08",
        tag: "Hợp Tác Quốc Tế",
        img: "Images/News/Icon/CTYCP-THAO-DUOC-LKVN-LAM-VIEC-VOI-DOI-TAC-HALAL-VN.jpg",
        link: "tt_ctycp-thao-duoc-lkvn-lam-viec-voi-doi-tac-halal-vn.html"
    },
    {
        id: 3,
        title: "Ký kết hợp tác đầu tư hệ sinh thái xanh dưới tán rừng với Travel One",
        desc: "Phát triển mô hình bảo tồn và phát triển cây dược liệu bản địa gắn liền với du lịch sinh thái nông nghiệp bền vững.",
        date: "14/08",
        tag: "Dự Án Sinh Thái",
        img: "Images/News/Icon/LKVN-KY-KET-TRAVEL-ONE.jpg",
        link: "tt_lkvn-ky-ket-travel-one.html"
    },
    {
        id: 4,
        title: "Khai trương Trung tâm liên kết chuỗi giá trị tại Ninh Sơn, Ninh Thuận",
        desc: "Trung tâm kết nối, bao tiêu và bảo đảm đầu ra ổn định giá cho bà con nông dân và đối tác sản xuất nông dược.",
        date: "25/10",
        tag: "Khai Trương",
        img: "Images/News/Icon/LKVN-KHAI-TRUONG-TRUNG-TAM-LIEN-KET-CHUOI-GIA-TI.jpg",
        link: "tt_lkvn-khai-truong-trung-tam-lien-ket-chuoi-gia-ti.html"
    }
];

// Đối tác & Ban ngành liên kết thực tế từ website
const lkvnPartners = [
    { name: "Bộ Y Tế", url: "https://moh.gov.vn/", logo: "Images/Slide/_13_1.png", note: "Cơ quan bảo trợ" },
    { name: "Hội Đông Y Việt Nam", url: "http://hoidongy.vn/", logo: "Images/Slide/SLIDE-04_5_2.png", note: "Chuyên môn Đông Y" },
    { name: "Hội Người Cao Tuổi", url: "https://hoinguoicaotuoi.vn/", logo: "Images/Slide/SLIDE-03_4_2.png", note: "Đồng hành chăm sóc" },
    { name: "ĐH Nông Lâm TP.HCM", url: "#", logo: "Images/News/Icon/DHNONG-LAM-TPHCM-LKVN-CHUYEN-GIAO-0.jpg", note: "Chuyển giao công nghệ" },
    { name: "Đối Tác Halal VN", url: "#", logo: "Images/News/Icon/CTYCP-THAO-DUOC-LKVN-LAM-VIEC-VOI-DOI-TAC-HALAL-VN.jpg", note: "Tiêu chuẩn xuất khẩu" }
];

const SectionHeading = ({ title, sub, viewAllLink }) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-emerald-100 pb-3 mb-6 gap-2">
        <div>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#00a651] rounded-full inline-block" />
                <h2 className="text-base sm:text-lg md:text-xl font-black uppercase text-emerald-950 tracking-wide">
                    {title}
                </h2>
            </div>
            {sub && <p className="text-xs text-gray-500 mt-1 pl-3.5">{sub}</p>}
        </div>
        {viewAllLink && (
            <a
                href={viewAllLink}
                className="text-[#00a651] hover:text-emerald-700 text-xs sm:text-sm font-bold inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4" />
            </a>
        )}
    </div>
);

export default function TrangChuLKVN() {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [topSeller, setTopSeller] = useState([]);
    const [dinhLangProducts, setDinhLangProducts] = useState([]);
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % lkvnSlides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + lkvnSlides.length) % lkvnSlides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5500);
        return () => clearInterval(timer);
    }, [nextSlide]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await dispatch(getListProductDropdown()).unwrap();
                if (res && res.EC === 0) {
                    setTopSeller(res.DT.filter((p) => p.isTopSeller === true));
                }
                const resCombo = await ApiProductCategory.getProductsByCategory(typeCategory_obligatory.comboLivestream);
                if (resCombo && resCombo.DT) {
                    setDinhLangProducts(resCombo.DT);
                }
            } catch {
                // Fallback an toàn
            }
        };
        loadProducts();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-[#fafbfa] font-sans text-gray-800">
            <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

                {/* ===================== BỐ CỤC 2 CỘT ===================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ===================== CỘT CHÍNH (BÊN TRÁI - 8 hoặc 9 CỘT) ===================== */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-10">

                        {/* 1. HERO BANNER SLIDER */}
                        <RevealOnScroll duration={700}>
                            <section className="relative w-full rounded-2xl overflow-hidden shadow-md border border-emerald-100 group/banner">
                                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[28/9] overflow-hidden bg-emerald-950">
                                    <div
                                        className="flex h-full transition-transform duration-700 ease-out"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {lkvnSlides.map((slide, idx) => (
                                            <div key={idx} className="relative flex-shrink-0 w-full h-full">
                                                <img
                                                    src={slide.img}
                                                    alt={slide.title}
                                                    className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/45 to-transparent" />

                                                <div className="relative z-10 flex flex-col justify-center h-full max-w-xl pl-6 sm:pl-10 md:pl-12 pr-6 text-white space-y-2 sm:space-y-3">
                                                    <span className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-emerald-200 border border-white/20">
                                                        <Leaf className="w-3 h-3 text-emerald-300" />
                                                        {slide.tag}
                                                    </span>
                                                    <h1 className="text-lg sm:text-2xl md:text-3xl font-black leading-snug drop-shadow-sm">
                                                        {slide.title}
                                                    </h1>
                                                    <p className="text-xs sm:text-sm text-emerald-100/90 line-clamp-2 max-w-md">
                                                        {slide.desc}
                                                    </p>
                                                    <div className="pt-1 sm:pt-2">
                                                        <a
                                                            href={slide.link}
                                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00a651] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                                                        >
                                                            <span>Xem chi tiết</span>
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Nút điều hướng Slide */}
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-0 group-hover/banner:opacity-100 backdrop-blur-sm"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-0 group-hover/banner:opacity-100 backdrop-blur-sm"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                                        {lkvnSlides.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-[#00a651] w-7' : 'bg-white/50 w-2 hover:bg-white/80'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </RevealOnScroll>

                        {/* 2. TIN TỨC & SỰ KIỆN */}
                        <RevealOnScroll delay={150}>
                            <section>
                                <SectionHeading
                                    title="TIN TỨC & SỰ KIỆN NỔI BẬT"
                                    sub="Hợp tác nghiên cứu khoa học, xúc tiến dự án chuỗi giá trị nông sản"
                                    viewAllLink="cmt_tin-tuc-chung.html"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-6 group">
                                        <a href={realLkvnNews[0].link} className="block space-y-3">
                                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-emerald-100 shadow-sm border border-emerald-100">
                                                <img
                                                    src={realLkvnNews[0].img}
                                                    alt={realLkvnNews[0].title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <span className="absolute top-2.5 left-2.5 bg-[#00a651] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                                                    {realLkvnNews[0].tag}
                                                </span>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span>{realLkvnNews[0].date}</span>
                                                </div>
                                                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#00a651] transition-colors leading-snug">
                                                    {realLkvnNews[0].title}
                                                </h3>
                                                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                                    {realLkvnNews[0].desc}
                                                </p>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="md:col-span-6 flex flex-col justify-between space-y-3">
                                        {realLkvnNews.slice(1, 4).map((news) => (
                                            <a
                                                key={news.id}
                                                href={news.link}
                                                className="flex items-center gap-3 p-2 rounded-xl group hover:bg-emerald-50/50 transition-all border border-transparent hover:border-emerald-100"
                                            >
                                                <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-emerald-100">
                                                    <img
                                                        src={news.img}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">
                                                        {news.tag}
                                                    </span>
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#00a651] transition-colors leading-snug">
                                                        {news.title}
                                                    </h4>
                                                    <span className="text-[11px] text-gray-400 block">{news.date}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </RevealOnScroll>

                        {/* 3. KHỐI VIDEO YOUTUBE CHÍNH THỨC CỦA LKVN */}
                        <RevealOnScroll delay={100}>
                            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#024424] text-white p-5 sm:p-7 md:p-8 shadow-xl border border-emerald-700/40">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                                    {/* Cột giới thiệu Video */}
                                    <div className="lg:col-span-5 space-y-3.5 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/15">
                                            <Play className="w-3.5 h-3.5 fill-current" />
                                            Video Giới Thiệu Chính Thức
                                        </div>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight">
                                            Mô Hình Chuỗi Giá Trị Thảo Dược Liên Kết Việt Nam
                                        </h2>
                                        <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                                            Toàn cảnh quy trình liên kết từ khâu quy hoạch vùng trồng đinh lăng, hướng dẫn kỹ thuật canh tác, công nghệ tưới nhỏ giọt đến nhà máy bao tiêu chế biến thành phẩm.
                                        </p>

                                        <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs text-emerald-200 border border-white/10">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Vùng trồng chuẩn sạch
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs text-emerald-200 border border-white/10">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Chế biến GMP
                                            </span>
                                        </div>
                                    </div>

                                    {/* Player YouTube */}
                                    <div className="lg:col-span-7">
                                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-white/15 group">
                                            {!isPlayingVideo ? (
                                                <div
                                                    className="relative w-full h-full cursor-pointer"
                                                    onClick={() => setIsPlayingVideo(true)}
                                                >
                                                    <img
                                                        src="https://img.youtube.com/vi/ykBXZi_3ivU/maxresdefault.jpg"
                                                        alt="Thảo Dược LKVN Video"
                                                        className="w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="relative flex items-center justify-center">
                                                            <span className="absolute w-14 h-14 rounded-full bg-[#00a651]/50 animate-ping" />
                                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00a651] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                                                                <Play className="w-5 h-5 fill-current ml-0.5" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium">
                                                        Phát Video Giới Thiệu
                                                    </div>
                                                </div>
                                            ) : (
                                                <iframe
                                                    className="w-full h-full"
                                                    src="https://www.youtube.com/embed/ykBXZi_3ivU?autoplay=1&rel=0"
                                                    title="Video Thảo Dược LKVN"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </RevealOnScroll>

                        {/* 4. LƯỚI SẢN PHẨM PHỤ TRỢ (Nếu có dữ liệu từ Redux) */}
                        {topSeller.length > 0 && (
                            <RevealOnScroll>
                                <SectionHeading title="SẢN PHẨM TIÊU BIỂU TỪ DƯỢC LIỆU" viewAllLink="san-pham.html" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {topSeller.slice(0, 5).map((p) => (
                                        <ProductCard key={p.id} product={p} />
                                    ))}
                                </div>
                            </RevealOnScroll>
                        )}

                    </div>

                    {/* ===================== CỘT PHẢI (SIDEBAR - 4 hoặc 3 CỘT) ===================== */}
                    <aside className="lg:col-span-4 xl:col-span-3 space-y-6 h-full relative">

                        {/* 1. SẢN PHẨM THẢO DƯỢC & MÔ HÌNH NÔNG NGHIỆP (ĐÃ CHUYỂN SANG ĐÂY) */}
                        <RevealOnScroll delay={50}>
                            <div className="bg-white border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-[#00a651] rounded-full inline-block" />
                                        <h3 className="text-xs sm:text-sm font-black uppercase text-emerald-950 tracking-wider">
                                            SẢN PHẨM & MÔ HÌNH
                                        </h3>
                                    </div>
                                    <a
                                        href="san-pham.html"
                                        className="text-[#00a651] hover:text-emerald-700 text-xs font-bold inline-flex items-center gap-0.5 transition-colors"
                                    >
                                        <span>Xem tất cả</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                {/* Danh sách sản phẩm/mô hình tối ưu theo dạng list dọc dành cho Sidebar */}
                                <div className="space-y-2.5">
                                    {lkvnCategories.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.link}
                                            className="group flex items-center gap-3 p-2 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-100/70 transition-all duration-300 hover:shadow-sm"
                                        >
                                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-emerald-100 border border-emerald-200/50">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-emerald-700 font-medium line-clamp-1 block">
                                                    {item.desc}
                                                </span>
                                                <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#00a651] transition-colors line-clamp-1">
                                                    {item.title}
                                                </h4>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:text-[#00a651] group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* 2. SỨ MỆNH LKVN */}
                        <RevealOnScroll delay={100}>
                            <div className="bg-gradient-to-br from-white to-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                                <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#00a651]">
                                        <Award className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase text-emerald-950 tracking-wider">
                                            SỨ MỆNH LKVN
                                        </h3>
                                        <p className="text-[10px] text-emerald-700">Công ty CP Thảo Dược Liên Kết Việt Nam</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                                        <span>Xây dựng chuỗi giá trị dược liệu đạt chuẩn Quốc tế.</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                                        <span>Liên kết, đào tạo, giám sát và bao tiêu nông dược phẩm ổn định giá.</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                                        <span>Sản xuất đóng gói sản phẩm đạt chuẩn quốc tế GMP.</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                                        <span>Xây dựng và phát triển thị trường vì sức khỏe người Việt.</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0 mt-0.5" />
                                        <span>Cung cấp dược liệu đạt chuẩn cho các nước trên thế giới.</span>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* 3. THÔNG TIN TRỰC TIẾP LKVN */}
                        <RevealOnScroll delay={150}>
                            <div className="sticky top-20 z-10 space-y-6">
                                <div className="bg-emerald-950 text-white p-5 rounded-2xl shadow-lg border border-emerald-800 space-y-3">
                                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                        <Phone className="w-3.5 h-3.5" />
                                        Hotline Hỗ Trợ Dự Án
                                    </div>
                                    <div>
                                        <a href="tel:0964685128" className="text-lg font-black text-white hover:text-amber-300 transition-colors block">
                                            0964.685.128
                                        </a>
                                        <a href="tel:0905533247" className="text-sm font-bold text-emerald-200 hover:text-amber-300 transition-colors block">
                                            090 55 33 247
                                        </a>
                                    </div>
                                    <div className="pt-2 border-t border-emerald-800/80 text-[11px] text-emerald-200/90 space-y-1.5">
                                        <p className="flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            info@lkvn.vn
                                        </p>
                                        <p className="flex items-start gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                            Thôn Hạnh Trí 2, xã Quảng Sơn, H. Ninh Sơn, T. Ninh Thuận
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                    </aside>
                </div>

                {/* ===================== KHỐI ĐỐI TÁC & BAN NGÀNH LIÊN KẾT (TOÀN TRANG) ===================== */}
                <RevealOnScroll>
                    <section className="w-full pt-8 pb-4 border-t border-emerald-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                            <div className="flex items-center gap-2 text-base md:text-lg font-bold text-emerald-950 uppercase tracking-wide">
                                <span className="w-1.5 h-6 bg-[#00a651] inline-block rounded-sm" />
                                <span>ĐỐI TÁC LIÊN KẾT & CƠ QUAN ĐỒNG HÀNH</span>
                            </div>
                            <span className="text-xs text-gray-500">
                                Xây dựng chuỗi giá trị nông nghiệp và dược liệu sạch bền vững
                            </span>
                        </div>

                        {/* Lưới Logo Đối tác chuẩn LKVN */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {lkvnPartners.map((partner, i) => (
                                <a
                                    key={i}
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-emerald-100 shadow-sm hover:shadow-md hover:border-[#00a651]/50 transition-all group"
                                >
                                    <div className="h-14 w-full flex items-center justify-center mb-2">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-12 max-w-[120px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                    <h4 className="text-xs font-bold text-emerald-950 line-clamp-1 group-hover:text-[#00a651] transition-colors">
                                        {partner.name}
                                    </h4>
                                    <span className="mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                                        {partner.note}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>
                </RevealOnScroll>

            </main>
        </div>
    );
}