/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapIcon, ExternalLink } from "lucide-react";
import type { Company } from "@/types/company";
import "./LeafletFix.css";
import { API_KEY_MAP } from "@/utils/constant";

interface CompanyMapProps {
  company: Company;
}

interface GeocodeResult {
  lat: number;
  lon: number;
  display_name: string;
  confidence?: number;
  provider?: string;
}

interface LocationIQResponse {
  lat: string;
  lon: string;
  display_name: string;
  importance: number;
}



interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  class: string;
  importance: string;
}

const CompanyMap = ({ company }: CompanyMapProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [loading, setLoading] = useState(true);

  // Enhanced address normalization with additional Vietnamese context
  const normalizeVietnameseAddress = useCallback((address: string): string => {
    const normalizations: Record<string, string> = {
      "TP HCM": "Ho Chi Minh City",
      "TP.HCM": "Ho Chi Minh City",
      "Tp.HCM": "Ho Chi Minh City",
      TPHCM: "Ho Chi Minh City",
      "Sài Gòn": "Ho Chi Minh City",
      Saigon: "Ho Chi Minh City",
      "Hồ Chí Minh": "Ho Chi Minh City",
      "Ho Chi Minh": "Ho Chi Minh City",
      "TP Hà Nội": "Hanoi",
      "TP.Hà Nội": "Hanoi",
      "Hà Nội": "Hanoi",
      "Ha Noi": "Hanoi",
      "TP Đà Nẵng": "Da Nang",
      "TP.Đà Nẵng": "Da Nang",
      "Đà Nẵng": "Da Nang",
      "Da Nang": "Da Nang",
      "TP Cần Thơ": "Can Tho",
      "TP.Cần Thơ": "Can Tho",
      "Cần Thơ": "Can Tho",
      "Can Tho": "Can Tho",
      // ... Các tỉnh thành khác
    };

    let normalized = address.trim();

    Object.entries(normalizations).forEach(([vn, en]) => {
      const regex = new RegExp(
        `\\b${vn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      normalized = normalized.replace(regex, en);
    });

    return normalized;
  }, []);

  const createAddressVariations = useCallback(
    (address: string): { variation: string; score: number }[] => {
      const variations: { variation: string; score: number }[] = [];
      const cleanAddress = address.trim();

      variations.push({ variation: cleanAddress, score: 1.0 });

      const normalized = normalizeVietnameseAddress(cleanAddress);
      variations.push({ variation: normalized, score: 0.95 });

      return [...new Set(variations.map((v) => v.variation))]
        .filter((v) => v && v.length > 3)
        .map((v) => ({
          variation: v.trim(),
          score: variations.find((item) => item.variation === v)?.score || 0.5,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
    },
    [normalizeVietnameseAddress, company.name]
  );

  const geocodeWithMultipleProviders = useCallback(
    async (address: string): Promise<GeocodeResult | null> => {
      const providers = [
        {
          name: "LocationIQ",
          url: "https://us1.locationiq.com/v1/search",
          params: {
            key: API_KEY_MAP,
            format: "json",
            countrycodes: "vn",
            limit: "3",
            addressdetails: "1",
            dedupe: "1",
            normalizeaddress: "1",
          },
          parseResponse: (data: LocationIQResponse[]) => {
            if (data && data.length > 0) {
              const best = data.reduce((prev, curr) =>
                (curr.importance || 0) > (prev.importance || 0) ? curr : prev
              );
              return {
                lat: parseFloat(best.lat),
                lon: parseFloat(best.lon),
                display_name: best.display_name,
                confidence: best.importance || 0.5,
                provider: "LocationIQ",
              };
            }
            return null;
          },
          weight: 1.2,
        },
        {
          name: "Nominatim",
          url: "https://nominatim.openstreetmap.org/search",
          params: {
            format: "json",
            countrycodes: "vn",
            limit: "3",
            addressdetails: "1",
            dedupe: "1",
            extratags: "1",
          },
          parseResponse: (data: NominatimResult[]) => {
            if (data && data.length > 0) {
              const prioritized = data[0];
              return {
                lat: parseFloat(prioritized.lat),
                lon: parseFloat(prioritized.lon),
                display_name: prioritized.display_name,
                confidence: parseFloat(prioritized.importance || "0.5"),
                provider: "Nominatim",
              };
            }
            return null;
          },
          weight: 0.8,
        },
      ];

      const addressVariations = createAddressVariations(address);
      let bestResult: GeocodeResult | null = null;
      let bestScore = 0;

      for (const provider of providers) {
        for (const { variation, score } of addressVariations) {
          try {
            if (
              provider.params.key &&
              (provider.params.key === "test-key" ||
                provider.params.key.includes("test"))
            ) {
              continue;
            }

            const url = new URL(provider.url);
            const params = { ...provider.params, q: variation.trim() };
            Object.entries(params).forEach(([key, value]) => {
              if (typeof value === "string") {
                url.searchParams.append(key, value);
              }
            });

            const response = await fetch(url.toString(), {
              headers: {
                "User-Agent": "CompanyMap/2.0 (Vietnam Business Directory)",
                Accept: "application/json",
                "Accept-Language": "en,vi;q=0.9",
              },
            });

            if (!response.ok) continue;

            const data = await response.json();
            const result = provider.parseResponse(data);

            if (result && result.lat && result.lon) {
              const confidence =
                (result.confidence || 0.5) * provider.weight * score;

              if (confidence > bestScore) {
                bestResult = { ...result, confidence };
                bestScore = confidence;
                if (confidence > 0.95) return bestResult;
              }
            }
            await new Promise((resolve) => setTimeout(resolve, 50));
          } catch {
            continue;
          }
        }
      }

      return bestResult;
    },
    [createAddressVariations]
  );

  useEffect(() => {
    if (!mapContainer || (!company.address && !(company as any).lat)) return;

    const initMap = async () => {
      const L = await import("leaflet");
      import("leaflet/dist/leaflet.css");

      const defaultCoords: [number, number] = [10.762622, 106.660172];

      const mapInstance = L.map(mapContainer, {
        zoomControl: true,
        attributionControl: true,
        preferCanvas: true,
      }).setView(defaultCoords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '<span style="font-size:10px">© OpenStreetMap contributors</span>',
        maxZoom: 19,
        minZoom: 10,
        subdomains: ["a", "b", "c"],
      }).addTo(mapInstance);

      setMap(mapInstance);
      setLoading(true);

      try {
        let locationData = null;
        
        // KIỂM TRA ƯU TIÊN 1: Lấy tọa độ ghim sẵn từ database (Ép kiểu any để bắt mọi trường hợp schema)
        const comp = company as any;
        
        if (comp.lat && comp.lng) {
          locationData = {
            lat: Number(comp.lat),
            lon: Number(comp.lng),
            display_name: company.address || company.name,
            confidence: 1, // Điểm tuyệt đối vì lấy từ DB
            provider: "Database"
          };
        } else if (comp.latitude && comp.longitude) {
          locationData = {
            lat: Number(comp.latitude),
            lon: Number(comp.longitude),
            display_name: company.address || company.name,
            confidence: 1,
            provider: "Database"
          };
        } else if (comp.location?.coordinates?.length === 2) {
          // Trường hợp dùng GeoJSON [lng, lat]
          locationData = {
            lat: Number(comp.location.coordinates[1]),
            lon: Number(comp.location.coordinates[0]),
            display_name: company.address || company.name,
            confidence: 1,
            provider: "Database"
          };
        }

        // ƯU TIÊN 2: Nếu chưa ghim tọa độ, fallback về API quét chuỗi địa chỉ
        if (!locationData && company.address) {
          locationData = await geocodeWithMultipleProviders(company.address);
        }

        if (locationData) {
          const { lat, lon, display_name, confidence } = locationData;

          // Kiểm tra tọa độ VN
          if (lat < 8.0 || lat > 23.5 || lon < 102 || lon > 110) {
            throw new Error("Invalid coordinates");
          }

          const zoom = confidence && confidence > 0.7 ? 17 : 15;
          mapInstance.setView([lat, lon], zoom);

          const markerColor =
            confidence && confidence > 0.7 ? "#16a34a" : "#f59e0b";
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, ${markerColor}, ${markerColor}dd);
                width: 28px;
                height: 28px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                position: relative;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  background: white;
                  border-radius: 50%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(45deg);
                "></div>
              </div>
            `,
            className: "enhanced-marker",
            iconSize: [28, 28],
            iconAnchor: [14, 28],
          });

          L.marker([lat, lon], { icon: customIcon })
            .addTo(mapInstance)
            .bindPopup(
              `<div style="max-width: 300px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                <div style="font-size: 16px; font-weight: 700; color: #16a34a; margin-bottom: 8px; line-height: 1.3;">
                  ${company.name}
                </div>
                <div style="font-size: 13px; color: #4b5563; margin-bottom: 8px; line-height: 1.4;">
                  📍 ${display_name}
                </div>
                <div style="font-size: 11px; color: #9ca3af; padding-top: 6px; border-top: 1px solid #e5e7eb;">
                  Tọa độ: ${lat.toFixed(6)}, ${lon.toFixed(6)}
                </div>
              </div>`,
              {
                closeButton: true,
                autoClose: false,
                maxWidth: 340,
                className: "enhanced-popup",
              }
            )
            .openPopup();
        } else {
          // Xử lý lỗi không tìm thấy
          const fallbackIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, #ef4444, #dc2626);
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(239, 68, 68, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                transition: transform 0.3s ease;
              ">?</div>
            `,
            className: "fallback-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          L.marker(defaultCoords, { icon: fallbackIcon })
            .addTo(mapInstance)
            .bindPopup(
              `<div style="max-width: 300px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                <div style="font-size: 16px; font-weight: 700; color: #16a34a; margin-bottom: 8px;">
                  ${company.name}
                </div>
                <div style="font-size: 13px; color: #ef4444; margin-bottom: 6px; font-weight: 600;">
                  ⚠️ Không tìm thấy vị trí chính xác
                </div>
                <div style="font-size: 12px; color: #6b7280; line-height: 1.4; margin-bottom: 8px;">
                  Địa chỉ gốc: <em>${company.address}</em>
                </div>
              </div>`
            );
        }
      } catch {
        L.marker(defaultCoords)
          .addTo(mapInstance)
          .bindPopup(
            `<div style="color: #ef4444; font-weight: 600; font-size: 14px;">${company.name}</div>
             <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">❌ Lỗi tải bản đồ</div>`
          );
      } finally {
        setLoading(false);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [
    mapContainer,
    company,
    map,
    geocodeWithMultipleProviders,
  ]);

  // SỬA LỖI NÚT CHUYỂN HƯỚNG GOOGLE MAPS
  const handleOpenInMaps = () => {
    const comp = company as any;
    // Cố gắng lấy tọa độ
    const lat = comp.lat || comp.latitude || comp.location?.coordinates?.[1];
    const lng = comp.lng || comp.longitude || comp.location?.coordinates?.[0];

    if (lat && lng) {
      // Có tọa độ -> Mở Maps với tọa độ chính xác
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (company.address) {
      // Không có tọa độ -> Mở Maps bằng chuỗi địa chỉ
      const encodedAddress = encodeURIComponent(`${company.name}, ${company.address}`);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <MapIcon className="h-5 w-5 text-emerald-600" />
          Vị trí công ty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div
              ref={setMapContainer}
              className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner"
              style={{ minHeight: "240px" }}
            />
            {loading && (company.address || (company as any).lat) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-700 font-semibold text-sm">
                      Đang định vị chính xác...
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!company.address && !(company as any).lat && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10 rounded-2xl">
                <div className="text-center">
                  <MapIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">
                    Chưa có thông tin địa chỉ
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-start justify-center gap-2 mb-3">
              <MapIcon className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="font-medium text-gray-800 text-sm break-words leading-relaxed">
                {company.address ? `${company.name}, ${company.address}` : "Địa chỉ chưa được cập nhật"}
              </span>
            </div>
            {(company.address || (company as any).lat) && (
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleOpenInMaps}
                  className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Google Maps
                </Button>
              </div>
            )}
          </div>
        </div>
        <style>{`
          /* CSS rút gọn để tiết kiệm không gian file (giữ nguyên style cũ của bạn) */
          .leaflet-control-attribution { font-size: 10px !important; padding: 2px 6px !important; border-radius: 8px !important; background: rgba(255,255,255,0.9) !important; backdrop-filter: blur(4px) !important; margin: 6px !important; box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important; }
          .leaflet-control-zoom { border-radius: 10px !important; overflow: hidden !important; box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important; border: 1px solid rgba(0,0,0,0.1) !important; }
          .leaflet-control-zoom a { width: 32px !important; height: 32px !important; line-height: 32px !important; font-size: 16px !important; background: rgba(255,255,255,0.95) !important; backdrop-filter: blur(4px) !important; transition: all 0.2s ease !important; }
          .leaflet-control-zoom a:hover { background: rgba(16, 163, 74, 0.1) !important; color: #16a34a !important; }
          .enhanced-marker, .fallback-marker { background: transparent !important; border: none !important; }
          .enhanced-popup .leaflet-popup-content-wrapper { border-radius: 12px !important; box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important; backdrop-filter: blur(8px) !important; background: rgba(255,255,255,0.98) !important; border: 1px solid rgba(0,0,0,0.05) !important; }
          .enhanced-popup .leaflet-popup-tip { background: rgba(255,255,255,0.98) !important; border: 1px solid rgba(0,0,0,0.05) !important; border-top: none !important; border-right: none !important; }
          .leaflet-popup-close-button { color: #6b7280 !important; font-size: 18px !important; padding: 4px 8px !important; transition: color 0.2s ease !important; }
          .leaflet-popup-close-button:hover { color: #ef4444 !important; background: rgba(239, 68, 68, 0.1) !important; border-radius: 4px !important; }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default CompanyMap;