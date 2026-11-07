import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListPost } from '../redux/postSlice';
import ImageLoader from '../components/FormFields/ImageLoader';
import { slug } from '../utils/constants.js';
import LkvnNewsSidebar from '../components/LkvnNewsSidebar.jsx';

const revealStyles = `
    .reveal-hidden { opacity: 0; }
    .reveal-in {
        animation-duration: 0.75s;
        animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        animation-fill-mode: backwards;
    }
    .reveal-up { animation-name: revealUp; }
    @keyframes revealUp {
        from { opacity: 0; transform: translate3d(0, 24px, 0); }
        to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
        .reveal-in { animation: none !important; }
        .reveal-hidden { opacity: 1; }
    }
`;

const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.05 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`${className} ${visible ? 'reveal-in reveal-up' : 'reveal-hidden'}`}
            style={{ animationDelay: `${delay}ms` }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

const MainNewsRow = ({ news, index }) => (
    <Reveal delay={(index % 4) * 80}>
        <NavLink
            to={`/tin-tuc/${slug(news.title)}/${news.id}`}
            className="group block border-b border-dotted border-gray-300 pb-6 mb-6 last:border-b-0"
        >
            <h3 className="text-sm sm:text-base font-bold uppercase text-[#006837] group-hover:text-[#009245] transition-colors leading-snug mb-3">
                {news.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-5 md:col-span-4 aspect-[16/11] overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                    <ImageLoader
                        imagePath={news.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="sm:col-span-7 md:col-span-8">
                    <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed line-clamp-4 text-justify">
                        {news.description}
                    </p>
                </div>
            </div>
        </NavLink>
    </Reveal>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex items-center justify-center gap-1.5 pt-6 border-t border-dotted border-gray-300">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50"
            >
                <ChevronLeft className="w-4 h-4 inline" />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`min-w-7 h-7 px-2 text-xs font-semibold rounded border transition-colors ${currentPage === page
                        ? 'bg-[#006837] text-white border-[#006837]'
                        : 'border-gray-300 text-gray-700 hover:bg-emerald-50'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50"
            >
                <ChevronRight className="w-4 h-4 inline" />
            </button>
        </div>
    );
};

export default function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { PostList, PostTotal } = useSelector((state) => state.post);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const totalPages = Math.ceil((PostTotal || 0) / limit);

    useEffect(() => {
        dispatch(getListPost({ page: currentPage, limit }))
            .unwrap()
            .then((res) => {
                if (res && res.EC !== 0) toast.error(res.EM);
            });
    }, [currentPage, dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        if (PostTotal === 1 && PostList?.length === 1 && currentPage === 1) {
            navigate(`/tin-tuc/${PostList[0].id}`, { replace: true });
        }
    }, [PostTotal, PostList, currentPage, navigate]);

    const filteredNews = useMemo(() => {
        if (!PostList) return [];
        if (!search) return PostList;
        const lower = search.toLowerCase();
        return PostList.filter(news =>
            news.title?.toLowerCase().includes(lower) ||
            news.description?.toLowerCase().includes(lower)
        );
    }, [search, PostList]);

    return (
        <div className="min-h-screen bg-white">
            <style>{revealStyles}</style>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ===================== CỘT TRÁI (TÁI SỬ DỤNG COMPONENT) ===================== */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <LkvnNewsSidebar search={search} setSearch={setSearch} />
                    </div>

                    {/* ===================== CỘT PHẢI (DANH SÁCH BÀI VIẾT) ===================== */}
                    <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                        <div className="border-b border-dotted border-gray-300 pb-2">
                            <h1 className="text-xl sm:text-2xl font-black text-[#006837] tracking-tight">
                                Tin Tức - Sự kiện
                            </h1>
                        </div>

                        <div>
                            {filteredNews.length > 0 ? (
                                filteredNews.map((news, index) => (
                                    <MainNewsRow key={news.id} news={news} index={index} />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 py-8 text-center italic">
                                    Đang cập nhật danh sách bài viết...
                                </p>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}