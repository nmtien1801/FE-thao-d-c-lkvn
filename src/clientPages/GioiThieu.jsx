import React from 'react';
import LkvnNewsSidebar from '../components/LkvnNewsSidebar.jsx';

export default function GioiThieuLKVN() {
    return (
        <div className="min-h-screen bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ===================== CỘT TRÁI: SIDEBAR LKVN (3 CỘT) ===================== */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <LkvnNewsSidebar showSearch={false} />
                    </div>

                    {/* ===================== CỘT PHẢI: NỘI DUNG GIỚI THIỆU (9 CỘT) ===================== */}
                    <div className="lg:col-span-9 order-1 lg:order-2 space-y-12">

                        {/* Tiêu đề trang */}
                        <div className="border-b border-gray-200 pb-4">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 uppercase">
                                Giới thiệu Công ty Cổ phần Thảo Dược Liên Kết Việt Nam (LKVN)
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Hệ sinh thái liên kết vùng trồng, chế biến sâu và phân phối thảo dược sạch bền vững.
                            </p>
                        </div>

                        {/* 1. Tầm nhìn và Sứ mệnh */}
                        <section className="space-y-4">
                            <h2 className="text-lg sm:text-xl font-bold text-[#006837] uppercase tracking-wide border-b border-dotted border-gray-300 pb-1.5">
                                1. Tầm nhìn và Sứ mệnh
                            </h2>

                            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Tầm nhìn:</h3>
                                    <ul className="list-disc pl-5 space-y-1.5">
                                        <li>
                                            Trở thành doanh nghiệp tiên phong tại Việt Nam trong việc xây dựng và phát triển chuỗi giá trị nông nghiệp và dược liệu sạch bền vững.
                                        </li>
                                        <li>
                                            Nâng tầm dược liệu bản địa Việt Nam đạt các tiêu chuẩn quốc tế (GMP, ISO, Halal) để cung ứng cho thị trường trong nước và xuất khẩu ra thế giới.
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-2">
                                    <h3 className="font-bold text-gray-900 mb-1">Sứ mệnh:</h3>
                                    <ul className="list-disc pl-5 space-y-1.5">
                                        <li>
                                            <span className="font-medium text-gray-900">Đối với người nông dân:</span> Liên kết chặt chẽ, chuyển giao kỹ thuật canh tác công nghệ cao và thực hiện cam kết bao tiêu nông dược phẩm với giá cả ổn định lâu dài.
                                        </li>
                                        <li>
                                            <span className="font-medium text-gray-900">Đối với người tiêu dùng:</span> Nghiên cứu, chế biến sâu các sản phẩm thảo dược thiên nhiên (đinh lăng, khổ qua rừng...) nguyên chất, an toàn, không đường hóa học để chăm sóc và bảo vệ sức khỏe cộng đồng.
                                        </li>
                                        <li>
                                            <span className="font-medium text-gray-900">Đối với môi trường:</span> Phát triển mô hình trồng trọt dưới tán rừng, kết hợp bảo tồn tài nguyên rừng tự nhiên và tạo sinh kế bền vững.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 2. Lịch sử phát triển */}
                        <section className="space-y-4">
                            <h2 className="text-lg sm:text-xl font-bold text-[#006837] uppercase tracking-wide border-b border-dotted border-gray-300 pb-1.5">
                                2. Lịch sử phát triển
                            </h2>

                            <div className="space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed">
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Giai đoạn 1: Khảo sát và quy hoạch vùng trồng
                                    </h3>
                                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                                        <li>Khảo sát thổ nhưỡng, khí hậu tại các vùng nguyên liệu trọng điểm (tiêu biểu là Ninh Thuận).</li>
                                        <li>Lựa chọn các giống cây dược liệu bản địa có hoạt tính sinh học cao như Đinh lăng nếp, Khổ qua rừng.</li>
                                        <li>Thử nghiệm thành công mô hình trồng đinh lăng dưới tán rừng nhằm bảo tồn hệ sinh thái tự nhiên.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Giai đoạn 2: Đầu tư hạ tầng và công nghệ canh tác
                                    </h3>
                                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                                        <li>Xây dựng và khánh thành Trung tâm liên kết chuỗi giá trị nông nghiệp và dược liệu tại huyện Ninh Sơn, tỉnh Ninh Thuận.</li>
                                        <li>Thiết lập mạng lưới liên kết bao tiêu sản phẩm trực tiếp với các hộ nông dân và hợp tác xã địa phương.</li>
                                        <li>Đưa vào vận hành hệ thống tưới nhỏ giọt tự động và giám sát độ ẩm, vi chất để chuẩn hóa chất lượng dược tính.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Giai đoạn 3: Hợp tác khoa học và chế biến sâu
                                    </h3>
                                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                                        <li>Ký kết hợp tác và nhận chuyển giao công nghệ chế biến sâu dược liệu với Trường Đại học Nông Lâm TP.HCM (Khoa Công nghệ Hóa học và Thực phẩm).</li>
                                        <li>Hoàn thiện quy trình sản xuất và ra mắt các dòng sản phẩm chủ lực: Trà Đinh Lăng, Nước uống Đinh Lăng nguyên chất, Trà Khổ qua rừng đạt tiêu chuẩn an toàn thực phẩm và định hướng GMP.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Giai đoạn 4: Mở rộng thị trường và hội nhập
                                    </h3>
                                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                                        <li>Làm việc và ký kết cùng các đối tác tiêu chuẩn Halal để hoàn thiện hồ sơ xuất khẩu sang các thị trường quốc tế.</li>
                                        <li>Hợp tác với các đơn vị lữ hành (như Travel One) để phát triển mô hình du lịch sinh thái nông nghiệp gắn liền với vùng trồng dược liệu sạch.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. Cơ cấu tổ chức */}
                        <section className="space-y-4">
                            <h2 className="text-lg sm:text-xl font-bold text-[#006837] uppercase tracking-wide border-b border-dotted border-gray-300 pb-1.5">
                                3. Cơ cấu tổ chức
                            </h2>

                            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                                <p>
                                    Mô hình quản lý của công ty được phân cấp rõ ràng theo các tuyến chức năng:
                                </p>

                                <ul className="list-disc pl-5 space-y-3">
                                    <li>
                                        <strong className="text-gray-900">Đại hội đồng Cổ đông và Hội đồng Quản trị:</strong> Cơ quan quyết định cao nhất về chiến lược phát triển dài hạn, kế hoạch đầu tư vùng trồng và mở rộng sản xuất của công ty.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Ban Giám đốc (Ban Điều hành):</strong> Trực tiếp chỉ đạo, quản lý và điều hành mọi hoạt động sản xuất, kinh doanh và liên kết vùng của công ty theo mục tiêu đã đề ra.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Hội đồng Khoa học và Cố vấn Chuyên môn:</strong> Tập hợp các chuyên gia, giảng viên, nhà khoa học từ các trường đại học (như ĐH Nông Lâm TP.HCM) và viện nghiên cứu, phụ trách cố vấn công nghệ sinh học, quy trình chiết xuất và kiểm nghiệm hoạt chất.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Khối Nông nghiệp và Vùng trồng:</strong> Quản lý quy hoạch đất trồng, cung ứng cây giống, hướng dẫn kỹ thuật canh tác sạch cho nông dân và trực tiếp phụ trách việc thu mua, bao tiêu nguyên liệu tại các địa phương.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Khối Nghiên cứu, Phát triển và Chất lượng (R&D / QA-QC):</strong> Phụ trách nghiên cứu công thức sản phẩm mới, kiểm định hàm lượng dược chất và giám sát quy trình sản xuất đóng gói đạt tiêu chuẩn GMP, an toàn vệ sinh thực phẩm.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Khối Kinh doanh và Tiếp thị:</strong> Quản lý hệ thống phân phối, đại lý, kênh bán lẻ, thương mại điện tử và xúc tiến các hoạt động hợp tác thương mại trong nước lẫn xuất khẩu.
                                    </li>
                                    <li>
                                        <strong className="text-gray-900">Khối Tài chính - Kế toán và Hành chính:</strong> Đảm bảo nguồn vốn thu mua bao tiêu kịp thời cho bà con nông dân, quản trị dòng tiền đầu tư cơ sở vật chất và quản lý nhân sự, pháp lý doanh nghiệp.
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </div>

                </div>
            </main>
        </div>
    );
}