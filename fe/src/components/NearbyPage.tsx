import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Import CSS cốt lõi của Leaflet để bản đồ không bị vỡ bố cục
import "leaflet/dist/leaflet.css";

import { API } from "@/utils/constant";
import {
  MapPin,
  Star,
  Building2,
  ChevronLeft,
  SearchX,
  AlertCircle,
  Navigation,
  Map as MapIcon
} from "lucide-react";

import Navbar from "./shared/Navbar";
import Footer from "./Footer";

// ==========================================
// 1. TYPING & INTERFACES (Định nghĩa kiểu dữ liệu nghiêm ngặt)
// ==========================================
interface Company {
  _id: string;
  name: string;
  slug: string;
  address: string;
  logo?: string;
  distance?: number;
  rating?: number;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat] chuẩn MongoDB GeoJSON
  };
  latitude?: number;
  longitude?: number;
}

interface GeoJsResponse {
  latitude: string;
  longitude: string;
}

interface NominatimResponse {
  display_name?: string;
}

interface NearbyApiResponse {
  success: boolean;
  companies?: Company[];
}

interface MapComponentProps {
  userLocation: { lat: number; lng: number };
  companies: Company[];
}

interface RadarLoaderProps {
  statusText: string;
}

// ==========================================
// 2. CUSTOM THEME MARKER (Sử dụng Tailwind để vẽ Ghim, chống lỗi vỡ ảnh của Leaflet)
// ==========================================

// Ghim vị trí của BẠN (Chấm đỏ tỏa sóng radar)
const createUserIcon = (): L.DivIcon => L.divIcon({
  html: `
    <div class="relative flex items-center justify-center w-6 h-6">
      <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-60"></div>
      <div class="relative w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white shadow-md"></div>
    </div>
  `,
  className: "custom-user-marker",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Ghim vị trí các nhà hàng đối tác (Ghim tròn màu tím bo góc viền trắng nổi bật)
const createCompanyIcon = (): L.DivIcon => L.divIcon({
  html: `
    <div class="flex items-center justify-center w-9 h-9 bg-purple-600 rounded-full text-white border-2 border-white shadow-xl transition-transform duration-200 hover:scale-110 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
    </div>
  `,
  className: "custom-company-marker",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

// Component hỗ trợ dịch chuyển camera Bản đồ tự động khi tọa độ thay đổi
const ChangeMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

// ==========================================
// 3. COMPONENT BẢN ĐỒ MIỄN PHÍ (LEAFLET)
// ==========================================
const NearbyMap: React.FC<MapComponentProps> = ({ userLocation, companies }) => {
  const navigate = useNavigate();
  const mapCenter: [number, number] = [userLocation.lat, userLocation.lng];

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      className="w-full h-full min-h-[450px]"
      zoomControl={true}
    >
      {/* Tải dữ liệu hình ảnh bản đồ từ OpenStreetMap miễn phí */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Tự động di chuyển góc nhìn bản đồ theo người dùng */}
      <ChangeMapCenter center={mapCenter} />

      {/* Ghim vị trí chính mình */}
      <Marker position={mapCenter} icon={createUserIcon()} />

      {/* Vòng lặp rải ghim toàn bộ các nhà hàng xung quanh */}
      {companies.map((company) => {
        let lat: number | undefined;
        let lng: number | undefined;

        if (company.latitude && company.longitude) {
          lat = company.latitude;
          lng = company.longitude;
        } else if (company.location?.coordinates) {
          lat = company.location.coordinates[1];
          lng = company.location.coordinates[0];
        }

        if (lat !== undefined && lng !== undefined) {
          const distanceText = company.distance ? `${(company.distance / 1000).toFixed(1)} km` : "";
          const ratingText = company.rating ? company.rating.toFixed(1) : "5.0";
          const logoUrl = company.logo || "https://via.placeholder.com/150";

          return (
            <Marker key={company._id} position={[lat, lng]} icon={createCompanyIcon()}>
              {/* Bảng thông tin nhỏ hiển thị khi bấm vào ghim */}
              <Popup>
                <div className="p-1 max-w-[200px] text-center font-sans flex flex-col items-center">
                  <img 
                    src={logoUrl} 
                    alt={company.name} 
                    className="w-14 h-14 rounded-full object-cover mb-2 shadow-sm border border-gray-100" 
                  />
                  <h3 className="m-0 mb-1 text-sm font-bold text-gray-900 leading-tight">
                    {company.name}
                  </h3>
                  <div className="flex justify-center items-center gap-1.5 mb-3">
                    <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">⭐ {ratingText}</span>
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">📍 {distanceText}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/company/detail/${company.slug}`)}
                    className="block w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-semibold text-center transition-colors border-0 cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

// ==========================================
// 4. RADAR LOADER CAO CẤP
// ==========================================
const PremiumRadarLoader: React.FC<RadarLoaderProps> = ({ statusText }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-8 border border-blue-500/20 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-16 border border-purple-500/30 rounded-full" />
        <div className="absolute inset-24 border border-blue-500/40 rounded-full" />
        
        <div className="absolute w-full h-[1px] bg-purple-500/20" />
        <div className="absolute h-full w-[1px] bg-purple-500/20" />

        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div 
            className="w-full h-full animate-[spin_2s_linear_infinite] origin-center"
            style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(168, 85, 247, 0.5) 100%)' }}
          >
            <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>
        </div>

        <div className="absolute w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,1)] flex items-center justify-center z-10">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>
      
      <div className="mt-16 flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase animate-pulse">
          HỆ THỐNG RADAR
        </h3>
        <p className="mt-4 text-purple-200/70 font-mono text-sm tracking-widest bg-purple-900/30 px-4 py-1.5 rounded-full border border-purple-500/20">
          {statusText}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 5. MAIN COMPONENT
// ==========================================
const NearbyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
    lat: searchParams.get("lat") ? Number(searchParams.get("lat")) : null,
    lng: searchParams.get("lng") ? Number(searchParams.get("lng")) : null
  });

  const [userAddress, setUserAddress] = useState<string>("Đang giải mã tọa độ...");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<string>("ĐANG THIẾT LẬP VỊ TRÍ GPS...");
  const [locationPermissionState, setLocationPermissionState] = useState<PermissionState | null>(null);
  const [hasRequestedBrowserLocation, setHasRequestedBrowserLocation] = useState(false);

  // BƯỚC 1: XỬ LÝ LẤY ĐỊNH VỊ
  useEffect(() => {
    if (coords.lat && coords.lng) return;

    const fallbackToIP = async () => {
      try {
        setScanStatus("ĐANG MỞ RỘNG VÙNG QUÉT IP...");
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!response.ok) throw new Error("Network error");
        const data = (await response.json()) as GeoJsResponse;
        
        if (data.latitude && data.longitude) {
          setCoords({ lat: Number(data.latitude), lng: Number(data.longitude) });
        } else {
          throw new Error("Không có tọa độ");
        }
      } catch {
        setScanStatus("SỬ DỤNG VỊ TRÍ MẶC ĐỊNH (TP.HCM)...");
        setTimeout(() => {
          setCoords({ lat: 10.7769, lng: 106.7009 });
        }, 1000);
      }
    };

    const requestBrowserLocation = () => {
      if (!("geolocation" in navigator)) {
        void fallbackToIP();
        return;
      }

      setScanStatus("ĐANG LẤY VỊ TRÍ TỪ TRÌNH DUYỆT...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          void fallbackToIP();
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    };

    if (locationPermissionState === "denied") {
      void fallbackToIP();
      return;
    }

    if (locationPermissionState === "granted") {
      requestBrowserLocation();
      return;
    }

    if (locationPermissionState === "prompt") {
      if (hasRequestedBrowserLocation) {
        requestBrowserLocation();
        return;
      }
      void fallbackToIP();
      return;
    }

    void fallbackToIP();
  }, [coords.lat, coords.lng, hasRequestedBrowserLocation, locationPermissionState]);

  useEffect(() => {
    if (!("permissions" in navigator)) {
      return;
    }

    let isCancelled = false;
    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      if (isCancelled) return;
      setLocationPermissionState(status.state);
      status.onchange = () => setLocationPermissionState(status.state);
    }).catch(() => {
      if (!isCancelled) {
        setLocationPermissionState(null);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // BƯỚC 1.5: DỊCH TỌA ĐỘ THÀNH ĐỊA CHỈ TEXT (REVERSE GEOCODING)
  useEffect(() => {
    if (coords.lat && coords.lng) {
      axios.get<NominatimResponse>(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'vi-VN' } }
      )
      .then((res: AxiosResponse<NominatimResponse>) => {
        if (res.data && res.data.display_name) {
          setUserAddress(res.data.display_name);
        } else {
          setUserAddress(`${coords.lat!.toFixed(4)}, ${coords.lng!.toFixed(4)}`);
        }
      })
      .catch(() => {
        setUserAddress(`${coords.lat!.toFixed(4)}, ${coords.lng!.toFixed(4)}`);
      });
    }
  }, [coords.lat, coords.lng]);

  // BƯỚC 2: FETCH API KHI ĐÃ CÓ TỌA ĐỘ
  useEffect(() => {
    const fetchNearby = async () => {
      try {
        setScanStatus("ĐANG PHÂN TÍCH KHU VỰC...");
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1500)); 

        const res = await axios.get<NearbyApiResponse>(
          `${API}/company/nearby?lat=${coords.lat}&lng=${coords.lng}&radius=50000`
        );

        if (res.data.success) {
          setCompanies(res.data.companies || []);
        } else {
          setError("Không thể tải danh sách địa điểm lúc này.");
        }
      } catch {
        setError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (coords.lat && coords.lng) {
      void fetchNearby();
    }
  }, [coords.lat, coords.lng]);

  const nearbyCompanies = useMemo(() => companies.filter(item => item.distance !== undefined && item.distance <= 5000), [companies]);
  const farCompanies = useMemo(() => companies.filter(item => item.distance === undefined || item.distance > 5000), [companies]);

  if (loading) return <PremiumRadarLoader statusText={scanStatus} />;

  const renderCompanyCard = (item: Company) => (
    <div
      key={item._id}
      onClick={() => navigate(`/company/detail/${item.slug}`)}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-video bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <Building2 className="w-12 h-12 text-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-[17px] text-gray-900 line-clamp-1 mb-1.5 group-hover:text-purple-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-4 leading-relaxed">
          {item.address}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>{item.rating ? item.rating.toFixed(1) : '5.0'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
            <MapPin className="w-3.5 h-3.5" />
            {item.distance !== undefined ? `${(item.distance / 1000).toFixed(1)} km` : "Chưa rõ"}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="flex-grow pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {coords.lat && coords.lng && !error && (
          <div className="relative w-full h-[50vh] min-h-[450px] bg-gray-200 shadow-inner">
            {/* Bản đồ không tốn một đồng chi phí */}
            <NearbyMap userLocation={{ lat: coords.lat, lng: coords.lng }} companies={companies} />

            {/* Khung địa chỉ nổi trên bản đồ */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-2xl pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-red-400 rounded-full blur animate-ping opacity-30" />
                  <Navigation className="w-6 h-6 text-red-600 relative z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MapIcon className="w-3.5 h-3.5" /> Vị trí hiện tại của bạn
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate" title={userAddress}>
                    {userAddress}
                  </p>
                  {locationPermissionState === "prompt" && !hasRequestedBrowserLocation && (
                    <button
                      type="button"
                      onClick={() => setHasRequestedBrowserLocation(true)}
                      className="mt-3 inline-flex items-center justify-center rounded-full bg-purple-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors"
                    >
                      Sử dụng vị trí chính xác hơn
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Nút quay lại */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 z-[1000] bg-white shadow-md hover:shadow-lg rounded-full p-3 text-gray-600 hover:text-purple-600 transition-all border border-gray-100"
              title="Trở về trang chủ"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
          {error ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-sm border border-red-100 text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Không thể xác định vị trí</h3>
              <p className="text-gray-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Gần bạn nhất <span className="text-gray-400 text-base font-normal ml-2">(Dưới 5km)</span>
                  </h2>
                </div>

                {nearbyCompanies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-gray-300 text-center">
                    <SearchX className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">Không tìm thấy địa điểm nào trong bán kính 5km.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {nearbyCompanies.map(renderCompanyCard)}
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Các địa điểm khác <span className="text-gray-400 text-base font-normal ml-2">(Trên 5km)</span>
                  </h2>
                </div>

                {farCompanies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-gray-300 text-center">
                    <SearchX className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">Không có địa điểm nào khác trong khu vực.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {farCompanies.map(renderCompanyCard)}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NearbyPage;