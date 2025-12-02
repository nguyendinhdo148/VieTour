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

interface OpenCageResult {
  geometry: { lat: number; lng: number };
  formatted: string;
  confidence: number;
}

interface OpenCageResponse {
  results: OpenCageResult[];
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
      // Major cities
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

      // Other provinces
      "Đồng Nai": "Dong Nai",
      "Bình Dương": "Binh Duong",
      "Long An": "Long An",
      "Tây Ninh": "Tay Ninh",
      "Bà Rịa - Vũng Tàu": "Ba Ria Vung Tau",
      "Vũng Tàu": "Vung Tau",
      "Kiên Giang": "Kien Giang",
      "An Giang": "An Giang",
      "Tiền Giang": "Tien Giang",
      "Bến Tre": "Ben Tre",
      "Vĩnh Long": "Vinh Long",
      "Trà Vinh": "Tra Vinh",
      "Sóc Trăng": "Soc Trang",
      "Bạc Liêu": "Bac Lieu",
      "Cà Mau": "Ca Mau",
      "Hậu Giang": "Hau Giang",

      // Ho Chi Minh City districts
      "Q.1": "District 1",
      "Quận 1": "District 1",
      "Q.2": "District 2",
      "Quận 2": "District 2",
      "Q.3": "District 3",
      "Quận 3": "District 3",
      "Q.4": "District 4",
      "Quận 4": "District 4",
      "Q.5": "District 5",
      "Quận 5": "District 5",
      "Q.6": "District 6",
      "Quận 6": "District 6",
      "Q.7": "District 7",
      "Quận 7": "District 7",
      "Q.8": "District 8",
      "Quận 8": "District 8",
      "Q.9": "District 9",
      "Quận 9": "District 9",
      "Q.10": "District 10",
      "Quận 10": "District 10",
      "Q.11": "District 11",
      "Quận 11": "District 11",
      "Q.12": "District 12",
      "Quận 12": "District 12",
      "Q.Bình Thạnh": "Binh Thanh District",
      "Quận Bình Thạnh": "Binh Thanh District",
      "Q.Tân Bình": "Tan Binh District",
      "Quận Tân Bình": "Tan Binh District",
      "Q.Tân Phú": "Tan Phu District",
      "Quận Tân Phú": "Tan Phu District",
      "Q.Phú Nhuận": "Phu Nhuan District",
      "Quận Phú Nhuận": "Phu Nhuan District",
      "Q.Gò Vấp": "Go Vap District",
      "Quận Gò Vấp": "Go Vap District",
      "Q.Thủ Đức": "Thu Duc District",
      "Quận Thủ Đức": "Thu Duc District",
      "TP Thủ Đức": "Thu Duc City",
      "Quận Ba Đình": "Ba Dinh District",
      "Quận Hoàn Kiếm": "Hoan Kiem District",
      "Quận Hai Bà Trưng": "Hai Ba Trung District",
      "Quận Đống Đa": "Dong Da District",
      "Quận Tây Hồ": "Tay Ho District",
      "Quận Thanh Xuân": "Thanh Xuan District",
      "Quận Nam Từ Liêm": "Nam Tu Liem District",
      "Quận Bắc Từ Liêm": "Bac Tu Liem District",
      "Q.Bình Tân": "Binh Tan District",
      "Quận Bình Tân": "Binh Tan District",
      "Q.Bình Chánh": "Binh Chanh District",
      "Quận Bình Chánh": "Binh Chanh District",
      "Q.Nguyễn Văn Trỗi": "Nguyen Van Troi District",
      "Quận Nguyễn Văn Trỗi": "Nguyen Van Troi District",
      "Q.Nhà Bè": "Nha Be District",
      "Quận Nhà Bè": "Nha Be District",
      "Q.Cần Giờ": "Can Gio District",
      "Quận Cần Giờ": "Can Gio District",
      "Q.Hóc Môn": "Hoc Mon District",
      "Quận Hóc Môn": "Hoc Mon District",
      "Q.Củ Chi": "Cu Chi District",
      "Quận Củ Chi": "Cu Chi District",
      "Q.Cần Thạnh": "Can Thanh District",
      "Quận Cần Thạnh": "Can Thanh District",
      "Q.Thủ Thiêm": "Thu Thiem District",
      "Quận Thủ Thiêm": "Thu Thiem District",
      "Q.Thạnh Mỹ Lợi": "Thanh My Loi District",
      "Quận Thạnh Mỹ Lợi": "Thanh My Loi District",
      "Q.An Phú": "An Phu District",
      "Quận An Phú": "An Phu District",
      "Q.Bình Khánh": "Binh Khanh District",
      "Quận Bình Khánh": "Binh Khanh District",
      "Q.Long Bình": "Long Binh District",
      "Quận Long Bình": "Long Binh District",
      "Q.Tân Thuận Đông": "Tan Thuan Dong District",
      "Quận Tân Thuận Đông": "Tan Thuan Dong District",
      "Q.Tân Thuận Tây": "Tan Thuan Tay District",
      "Quận Tân Thuận Tây": "Tan Thuan Tay District",
      "Q.Phú Mỹ Hưng": "Phu My Hung District",
      "Quận Phú Mỹ Hưng": "Phu My Hung District",
      "Q.Bình Trưng Đông": "Binh Trung Dong District",
      "Quận Bình Trưng Đông": "Binh Trung Dong District",
      "Q. Bình Thạnh": "Binh Thanh District",
      "Quận Hà Đông": "Ha Dong District",
      "Q. Thanh Xuân": "Thanh Xuan District",

      // Ho Chi Minh City suburban districts
      "H.Củ Chi": "Cu Chi District",
      "Huyện Củ Chi": "Cu Chi District",
      "H.Hóc Môn": "Hoc Mon District",
      "Huyện Hóc Môn": "Hoc Mon District",
      "H.Bình Chánh": "Binh Chanh District",
      "Huyện Bình Chánh": "Binh Chanh District",
      "H.Nhà Bè": "Nha Be District",
      "Huyện Nhà Bè": "Nha Be District",
      "H.Cần Giờ": "Can Gio District",
      "Huyện Cần Giờ": "Can Gio District",

      // Common abbreviations
      "P.": "Ward ",
      "Phường ": "Ward ",
      "F.": "Ward ",
      "W.": "Ward ",
      "Đ.": "Street ",
      "Đường ": "Street ",
      "St.": "Street ",
      "Rd.": "Road ",
    };

    let normalized = address.trim();

    // Apply normalization rules with word boundaries
    Object.entries(normalizations).forEach(([vn, en]) => {
      const regex = new RegExp(
        `\\b${vn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      normalized = normalized.replace(regex, en);
    });

    // Additional normalization for common Vietnamese patterns
    normalized = normalized
      .replace(/\bH\s*([0-9]+)\b/gi, "Highway $1")
      .replace(/\bQL\s*([0-9A-Z]+)\b/gi, "Highway $1")
      .replace(/\bTT\s*([^,]+)/gi, "Town $1")
      .replace(/\bKP\s*([^,]+)/gi, "Quarter $1")
      .replace(/\bCầu\s*([^,]+)/gi, "Bridge $1");

    return normalized;
  }, []);

  // Enhanced address variations with scoring, including company name
  const createAddressVariations = useCallback(
    (address: string): { variation: string; score: number }[] => {
      const variations: { variation: string; score: number }[] = [];
      const cleanAddress = address.trim();
      const companyName = company.name?.trim() || "";

      // 1. Original address
      variations.push({ variation: cleanAddress, score: 1.0 });

      // 2. Normalized address
      const normalized = normalizeVietnameseAddress(cleanAddress);
      variations.push({ variation: normalized, score: 0.95 });

      // 3. Street-focused variation with company name
      const streetMatch = cleanAddress.match(
        /(đường|đ\.|street|st\.)?\s*([^,]+)/i
      );
      if (streetMatch) {
        const streetVariation = `${streetMatch[2]?.trim()}, ${normalized
          .split(",")
          .slice(-2)
          .join(",")}`;
        variations.push({
          variation: `${companyName}, ${streetVariation}`,
          score: 0.98,
        });
      }

      // 4. Company name with city
      if (companyName) {
        const cityMatch = normalized.match(
          /\b(Ho Chi Minh City|Hanoi|Da Nang|Can Tho)\b/i
        );
        if (cityMatch) {
          variations.push({
            variation: `${companyName}, ${cityMatch[0]}`,
            score: 0.97,
          });
        }
      }

      // Remove duplicates, filter invalid, and sort by score
      return [...new Set(variations.map((v) => v.variation))]
        .filter((v) => v && v.length > 3)
        .map((v) => ({
          variation: v.trim(),
          score: variations.find((item) => item.variation === v)?.score || 0.5,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4); // Limited to 4 variations for speed
    },
    [normalizeVietnameseAddress, company.name]
  );

  // Enhanced geocoding with weighted provider results
  const geocodeWithMultipleProviders = useCallback(
    async (address: string): Promise<GeocodeResult | null> => {
      const providers = [
        {
          name: "LocationIQ",
          url: "https://us1.locationiq.com/v1/search",
          params: {
            key: API_KEY_MAP, // Replace with real key
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
          name: "OpenCage",
          url: "https://api.opencagedata.com/geocode/v1/json",
          params: {
            key: "e65abd15071a436db4a4a188e9a0fec3", // Replace with real key
            countrycode: "vn",
            limit: "3",
            language: "en",
            min_confidence: "5",
          },
          parseResponse: (data: OpenCageResponse) => {
            if (data.results && data.results.length > 0) {
              const best = data.results.reduce((prev, curr) =>
                (curr.confidence || 0) > (prev.confidence || 0) ? curr : prev
              );
              return {
                lat: best.geometry.lat,
                lon: best.geometry.lng,
                display_name: best.formatted,
                confidence: best.confidence / 10,
                provider: "OpenCage",
              };
            }
            return null;
          },
          weight: 1.0,
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
              const priorityTypes = [
                "building",
                "house",
                "commercial",
                "retail",
                "office",
                "bridge",
              ];
              const prioritized =
                data.find(
                  (item) =>
                    priorityTypes.includes(item.type) ||
                    priorityTypes.includes(item.class)
                ) || data[0];
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

            if (!response.ok) {
              continue;
            }

            const data = await response.json();
            const result = provider.parseResponse(data);

            if (result && result.lat && result.lon) {
              const confidence =
                (result.confidence || 0.5) * provider.weight * score;

              if (confidence > bestScore) {
                bestResult = { ...result, confidence };
                bestScore = confidence;

                if (confidence > 0.95) {
                  return bestResult;
                }
              }
            }

            await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms delay
          } catch {
            continue;
          }
        }
      }

      if (bestResult) {
        return bestResult;
      }

      return null;
    },
    [createAddressVariations]
  );

  useEffect(() => {
    if (!mapContainer || !company.address) return;

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
        const locationData = await geocodeWithMultipleProviders(
          company.address || ""
        );

        if (locationData) {
          const { lat, lon, display_name, confidence } = locationData;

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

          /*const confidenceText = confidence
            ? `<div style="font-size: 11px; color: #16a34a; margin-top: 4px;">
              ✓ Độ chính xác: ${(confidence * 100).toFixed(0)}%
            </div>`
            : ""; */

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
                <div style="font-size: 11px; color: #16a34a; background: #f0f9ff; padding: 4px 8px; border-radius: 6px; margin-top: 6px;">
                  💡 Hiển thị tại trung tâm TP.HCM
                </div>
              </div>`
            );
        }
      } catch {
        L.marker(defaultCoords)
          .addTo(mapInstance)
          .bindPopup(
            `<div style="color: #ef4444; font-weight: 600; font-size: 14px;">${company.name}</div>
             <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">❌ Lỗi tải bản đồ</div>
             <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Vui lòng thử lại sau</div>`
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
    company.address,
    company.name,
    map,
    geocodeWithMultipleProviders,
  ]);

  /*
  const handleGetDirections = () => {
    if (company.address) {
      const encodedAddress = encodeURIComponent(company.address);
      window.open(
        `https://www.openstreetmap.org/search?query=${encodedAddress}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };
  */

  const handleOpenInMaps = () => {
    if (company.address) {
      const encodedAddress = encodeURIComponent(company.address);
      window.open(
        `https://maps.google.com/maps?q=${company.name}+${encodedAddress}`,
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
            {loading && company.address && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-700 font-semibold text-sm">
                      Đang định vị chính xác...
                    </div>
                    <div className="text-emerald-600 text-xs mt-1">
                      Tìm kiếm với nhiều nguồn dữ liệu
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!company.address && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10 rounded-2xl">
                <div className="text-center">
                  <MapIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">
                    Chưa có thông tin địa chỉ
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Vui lòng cập nhật địa chỉ công ty
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-start justify-center gap-2 mb-3">
              <MapIcon className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="font-medium text-gray-800 text-sm break-words leading-relaxed">
                {`${company.name + ", "}${company.address}` ||
                  "Địa chỉ chưa được cập nhật"}
              </span>
            </div>
            {company.address && (
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                {/* <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGetDirections}
                  className="flex items-center gap-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  <Navigation className="h-4 w-4" />
                  Chỉ đường
                </Button> */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleOpenInMaps}
                  className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  Google Maps
                </Button>
              </div>
            )}
          </div>
        </div>
        <style>{`
          .leaflet-control-attribution {
            font-size: 10px !important;
            padding: 2px 6px !important;
            border-radius: 8px !important;
            background: rgba(255,255,255,0.9) !important;
            backdrop-filter: blur(4px) !important;
            margin: 6px !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          }
          .leaflet-control-zoom {
            border-radius: 10px !important;
            overflow: hidden !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            border: 1px solid rgba(0,0,0,0.1) !important;
          }
          .leaflet-control-zoom a {
            width: 32px !important;
            height: 32px !important;
            line-height: 32px !important;
            font-size: 16px !important;
            background: rgba(255,255,255,0.95) !important;
            backdrop-filter: blur(4px) !important;
            transition: all 0.2s ease !important;
          }
          .leaflet-control-zoom a:hover {
            background: rgba(16, 163, 74, 0.1) !important;
            color: #16a34a !important;
          }
          .enhanced-marker, .fallback-marker {
            background: transparent !important;
            border: none !important;
          }
          .enhanced-popup .leaflet-popup-content-wrapper {
            border-radius: 12px !important;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important;
            backdrop-filter: blur(8px) !important;
            background: rgba(255,255,255,0.98) !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
          }
          .enhanced-popup .leaflet-popup-tip {
            background: rgba(255,255,255,0.98) !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
            border-top: none !important;
            border-right: none !important;
          }
          .leaflet-popup-close-button {
            color: #6b7280 !important;
            font-size: 18px !important;
            padding: 4px 8px !important;
            transition: color 0.2s ease !important;
          }
          .leaflet-popup-close-button:hover {
            color: #ef4444 !important;
            background: rgba(239, 68, 68, 0.1) !important;
            border-radius: 4px !important;
          }
          @media (max-width: 768px) {
            .leaflet-control-attribution { 
              font-size: 9px !important;
              padding: 1px 4px !important;
            }
            .leaflet-control-zoom { 
              transform: scale(0.9) !important;
              margin: 8px !important;
            }
            .enhanced-marker, .fallback-marker {
              transform: scale(0.9) rotate(-45deg) !important;
            }
            .enhanced-popup .leaflet-popup-content-wrapper {
              max-width: 280px !important;
              font-size: 13px !important;
            }
          }
          @media (max-width: 480px) {
            .leaflet-control-attribution { 
              display: none !important; 
            }
            .leaflet-control-zoom { 
              transform: scale(0.8) !important;
            }
            .enhanced-popup .leaflet-popup-content-wrapper {
              max-width: 240px !important;
              font-size: 12px !important;
            }
          }
          @media (prefers-color-scheme: dark) {
            .leaflet-control-zoom a {
              background: rgba(31, 41, 55, 0.95) !important;
              color: #f3f4f6 !important;
            }
            .leaflet-control-zoom a:hover {
              background: rgba(16, 163, 74, 0.2) !important;
            }
            .enhanced-popup .leaflet-popup-content-wrapper {
              background: rgba(31, 41, 55, 0.98) !important;
              color: #f3f4f6 !important;
              border: 1px solid rgba(255,255,255,0.1) !important;
            }
            .enhanced-popup .leaflet-popup-tip {
              background: rgba(31, 41, 55, 0.98) !important;
              border: 1px solid rgba(255,255,255,0.1) !important;
            }
          }
          .leaflet-interactive {
            transition: all 0.3s ease !important;
          }
          .leaflet-control-zoom a:focus {
            outline: 2px solid #16a34a !important;
            outline-offset: 2px !important;
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default CompanyMap;
