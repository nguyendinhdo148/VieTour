import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import {
  Calculator,
  Calendar,
  CircleCheck,
  CircleCheckBig,
  DollarSign,
  FileCheck2,
  FileWarning,
  Pencil,
  Plus,
  ShieldQuestion,
  Trash2,
  UserRoundCheck,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Footer from "../Footer";

type InsuranceType = "compulsory" | "voluntary" | "both";
type VoluntaryParticipantType =
  | "normal"
  | "poor"
  | "near_poor"
  | "ethnic_minority"
  | "farmer"
  | "fisherman";

interface InsurancePeriod {
  fromYear: number;
  fromMonth: number;
  toYear: number;
  toMonth: number;
  salary: number;
  type: InsuranceType;
  voluntaryParticipantType?: VoluntaryParticipantType;
}

interface CalculationDetail {
  period: string;
  months: number;
  salary: number;
  coefficient: number;
  adjustedSalary: number;
  amount: number;
  type: InsuranceType;
  voluntaryParticipantType?: VoluntaryParticipantType;
}

interface CalculationResult {
  totalAmount: number;
  timeParticipated: string;
  averageSalary: number;
  calculationDetails: CalculationDetail[];
  pre2014Amount: number;
  post2014Amount: number;
  voluntaryAmount: number;
  voluntarySubsidyAmount: number;
  pre2014Months: number;
  post2014Months: number;
  voluntaryMonths: number;
}

const SocialInsurance = () => {
  const [insuranceType, setInsuranceType] =
    useState<InsuranceType>("compulsory");
  const [periods, setPeriods] = useState<InsurancePeriod[]>([
    {
      fromYear: 2010,
      fromMonth: 1,
      toYear: 2025,
      toMonth: 12,
      salary: 5000000,
      type: "compulsory",
    },
  ]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const voluntaryParticipantTypes = [
    { value: "normal", label: "Thông thường (không thuộc diện hỗ trợ)" },
    { value: "poor", label: "Hộ nghèo (được hỗ trợ 30%)" },
    { value: "near_poor", label: "Hộ cận nghèo (được hỗ trợ 25%)" },
    {
      value: "ethnic_minority",
      label: "Người dân tộc thiểu số (được hỗ trợ 30%)",
    },
    { value: "farmer", label: "Nông dân (được hỗ trợ 10%)" },
    { value: "fisherman", label: "Ngư dân (được hỗ trợ 10%)" },
  ];

  // Updated adjustment coefficients according to Circular 01/2023/TT-BLĐTBXH
  const adjustmentCoefficients: Record<number, number> = {
    1994: 5.43,
    1995: 4.61,
    1996: 4.36,
    1997: 4.22,
    1998: 3.92,
    1999: 3.75,
    2000: 3.82,
    2001: 3.83,
    2002: 3.68,
    2003: 3.57,
    2004: 3.31,
    2005: 3.06,
    2006: 2.85,
    2007: 2.63,
    2008: 2.14,
    2009: 2.0,
    2010: 1.83,
    2011: 1.54,
    2012: 1.41,
    2013: 1.33,
    2014: 1.27,
    2015: 1.27,
    2016: 1.23,
    2017: 1.19,
    2018: 1.15,
    2019: 1.12,
    2020: 1.08,
    2021: 1.07,
    2022: 1.03,
    2023: 1.0,
    2024: 1.0,
    2025: 1.0,
  };

  const handleAddPeriod = () => {
    const newPeriod: InsurancePeriod = {
      fromYear: new Date().getFullYear(),
      fromMonth: 1,
      toYear: new Date().getFullYear(),
      toMonth: 12,
      salary: 0,
      type: insuranceType === "both" ? "compulsory" : insuranceType,
    };

    if (insuranceType === "voluntary" || insuranceType === "both") {
      newPeriod.voluntaryParticipantType = "normal";
    }

    setPeriods([...periods, newPeriod]);
  };

  const handleRemovePeriod = (index: number) => {
    const newPeriods = [...periods];
    newPeriods.splice(index, 1);
    setPeriods(newPeriods);
  };

  const handlePeriodChange = (
    index: number,
    field: keyof InsurancePeriod,
    value: number | string | VoluntaryParticipantType | InsuranceType
  ) => {
    const newPeriods = periods.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setPeriods(newPeriods);
  };

  const calculateInsurance = () => {
    let totalMonths = 0;
    let adjustedSalarySum = 0;
    const details: CalculationDetail[] = [];

    let pre2014Months = 0;
    let post2014Months = 0;
    let voluntarySubsidy = 0;
    let voluntarySupportMonths = 0; // Thêm biến để đếm số tháng được hỗ trợ

    periods.forEach((period) => {
      const monthsInPeriod =
        (period.toYear - period.fromYear) * 12 +
        (period.toMonth - period.fromMonth) +
        1;

      totalMonths += monthsInPeriod;

      for (let y = period.fromYear; y <= period.toYear; y++) {
        const startM = y === period.fromYear ? period.fromMonth : 1;
        const endM = y === period.toYear ? period.toMonth : 12;
        const months = endM - startM + 1;

        if (months <= 0) continue;

        const coef = adjustmentCoefficients[y] || 1;
        const adjustedSalary = period.salary * coef;
        const adjustedAmount = adjustedSalary * months;
        adjustedSalarySum += adjustedAmount;

        // Tính số tiền hỗ trợ từ Nhà nước theo công thức mới (chỉ áp dụng từ 2018)
        if (
          (period.type === "voluntary" ||
            (period.type === "both" && period.voluntaryParticipantType)) &&
          y >= 2018
        ) {
          let subsidyRate = 0;
          switch (period.voluntaryParticipantType) {
            case "poor":
            case "ethnic_minority":
              subsidyRate = 0.3; // Hỗ trợ 30%
              break;
            case "near_poor":
              subsidyRate = 0.25; // Hỗ trợ 25%
              break;
            case "farmer":
            case "fisherman":
              subsidyRate = 0.1; // Hỗ trợ 10%
              break;
          }

          const supportMonths = Math.min(months, 12);
          voluntarySupportMonths += supportMonths;

          // Tính theo công thức hỗ trợ mới
          if (y >= 2018 && y <= 2021) {
            voluntarySubsidy += 0.22 * 700000 * subsidyRate * supportMonths;
          } else if (y >= 2022 && y <= 2025) {
            voluntarySubsidy += 0.22 * 1500000 * subsidyRate * supportMonths;
          }
        }

        // Phân loại giai đoạn
        if (y < 2014) {
          pre2014Months += months;
        } else {
          post2014Months += months;
        }

        details.push({
          period: `T${startM}/${y} - T${endM}/${y}`,
          months,
          salary: period.salary,
          coefficient: coef,
          adjustedSalary,
          amount: adjustedAmount,
          type: period.type,
          voluntaryParticipantType: period.voluntaryParticipantType,
        });
      }
    });

    const averageSalary = totalMonths > 0 ? adjustedSalarySum / totalMonths : 0;

    // Làm tròn số năm theo quy định
    const roundYears = (months: number): number => {
      const years = Math.floor(months / 12);
      const leftover = months % 12;
      if (leftover >= 7) return years + 1;
      if (leftover >= 1) return years + 0.5;
      return years;
    };

    let roundedPre2014Years = roundYears(pre2014Months);
    let roundedPost2014Years = roundYears(post2014Months);

    // Nếu còn tháng lẻ trước 2014 thì chuyển sang sau 2014
    const leftoverPre2014 = pre2014Months % 12;
    if (leftoverPre2014 > 0 && leftoverPre2014 < 7) {
      roundedPre2014Years = Math.floor(pre2014Months / 12); // bỏ tháng lẻ
      roundedPost2014Years += 0.5; // cộng vào sau 2014
    }

    // Công thức tính tổng BHXH (giữ nguyên như cũ)
    const pre2014Amount = roundedPre2014Years * 1.5 * averageSalary;
    const post2014Amount = roundedPost2014Years * 2 * averageSalary;
    const totalPayout = pre2014Amount + post2014Amount;

    const yearsParticipated = Math.floor(totalMonths / 12);
    const monthsParticipated = totalMonths % 12;
    const timeParticipated = `${yearsParticipated} năm ${monthsParticipated} tháng`;

    setResult({
      totalAmount: totalPayout - voluntarySubsidy, // Trừ đi tiền hỗ trợ từ tổng
      timeParticipated,
      averageSalary,
      calculationDetails: details,
      pre2014Amount,
      post2014Amount,
      voluntaryAmount: 0, // Giữ nguyên như cũ
      voluntarySubsidyAmount: voluntarySubsidy, // Tiền hỗ trợ tính theo công thức mới
      pre2014Months,
      post2014Months,
      voluntaryMonths: voluntarySupportMonths, // Số tháng được hỗ trợ
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " (VNĐ)";
  };

  const getParticipantTypeLabel = (type?: VoluntaryParticipantType) => {
    if (!type) return "";
    const found = voluntaryParticipantTypes.find((t) => t.value === type);
    return found ? found.label : "";
  };

  const renderInsuranceTypeDifferences = () => {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Điểm khác biệt giữa các loại hình BHXH:
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>BHXH bắt buộc:</strong> Hệ số tính lương hưu 1.5 (trước
            2014) hoặc 2.0 (từ 2014), được đóng bởi cả người lao động và người
            sử dụng lao động.
          </li>
          <li>
            <strong>BHXH tự nguyện:</strong> Hệ số tính lương hưu 1.0, người lao
            động tự đóng toàn bộ hoặc được hỗ trợ một phần tùy đối tượng.
          </li>
          <li>
            <strong>Hệ số điều chỉnh:</strong> Áp dụng theo Thông tư
            01/2023/TT-BLĐTBXH để điều chỉnh Chi phí khoảng / khách đóng BHXH của các năm
            trước về giá trị hiện tại.
          </li>
        </ul>
      </div>
    );
  };

  const renderVoluntaryParticipantSelector = (
    index: number,
    currentType?: VoluntaryParticipantType
  ) => {
    const period = periods[index];
    if (period.type !== "voluntary" && period.type !== "both") {
      return null;
    }

    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Đối tượng tham gia
        </label>
        <Select
          value={currentType || "normal"}
          onValueChange={(value) =>
            handlePeriodChange(
              index,
              "voluntaryParticipantType",
              value as VoluntaryParticipantType
            )
          }
        >
          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
            <SelectValue placeholder="Chọn đối tượng" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
            {voluntaryParticipantTypes.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderPeriodTypeSelector = (
    index: number,
    currentType: InsuranceType
  ) => {
    if (insuranceType !== "both") return null;

    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Loại BHXH
        </label>
        <Select
          value={currentType}
          onValueChange={(value) => {
            const newType = value as InsuranceType;
            handlePeriodChange(index, "type", newType);
            if (
              newType === "voluntary" &&
              !periods[index].voluntaryParticipantType
            ) {
              handlePeriodChange(index, "voluntaryParticipantType", "normal");
            }
          }}
        >
          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
            <SelectValue placeholder="Chọn loại BHXH" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
            <SelectItem
              value="compulsory"
              className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Bắt buộc
            </SelectItem>
            <SelectItem
              value="voluntary"
              className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Tự nguyện
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 w-full max-w-screen-2xl">
        <div className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Công cụ tính bảo hiểm xã hội một lần
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="size-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <CircleCheck className="size-6 text-white" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Công cụ này giúp tính toán mức hưởng BHXH một lần theo quy định
                hiện hành, áp dụng hệ số điều chỉnh lương theo Thông tư
                01/2023/TT-BLĐTBXH và phân chia chính xác thời gian tham gia
                BHXH trước và sau năm 2014.
              </p>
            </div>
            {renderInsuranceTypeDifferences()}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <FileCheck2 className="w-5 h-5 text-white" />
                </div>
                Loại hình bảo hiểm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setInsuranceType("compulsory");
                    setPeriods(
                      periods.map((p) => ({
                        ...p,
                        type: "compulsory",
                        voluntaryParticipantType: undefined,
                      }))
                    );
                  }}
                  className={`group relative py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                    insuranceType === "compulsory"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg transform scale-100"
                      : "bg-white/50 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:scale-100"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <CircleCheckBig className="w-5 h-5 mr-2" />
                    <span className="font-semibold">BHXH bắt buộc</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setInsuranceType("voluntary");
                    setPeriods(
                      periods.map((p) => ({
                        ...p,
                        type: "voluntary",
                        voluntaryParticipantType:
                          p.voluntaryParticipantType || "normal",
                      }))
                    );
                  }}
                  className={`group relative py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                    insuranceType === "voluntary"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg transform scale-100"
                      : "bg-white/50 border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50 hover:scale-100"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <UserRoundCheck className="w-5 h-5 mr-2" />
                    <span className="font-semibold">BHXH tự nguyện</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setInsuranceType("both");
                    setPeriods(
                      periods.map((p) => ({
                        ...p,
                        type:
                          p.type === "voluntary" ? "voluntary" : "compulsory",
                        voluntaryParticipantType:
                          p.type === "voluntary"
                            ? p.voluntaryParticipantType || "normal"
                            : undefined,
                      }))
                    );
                  }}
                  className={`group relative py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                    insuranceType === "both"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg transform scale-100"
                      : "bg-white/50 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:scale-100"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      Cả BHXH bắt buộc & tự nguyện
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Giai đoạn nộp BHXH
                </h2>
                <button
                  onClick={handleAddPeriod}
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Thêm giai đoạn
                </button>
              </div>

              <div className="space-y-6">
                {periods.map((period, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Giai đoạn {index + 1}
                        </h3>
                      </div>
                      {periods.length > 1 && (
                        <button
                          onClick={() => handleRemovePeriod(index)}
                          className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tháng bắt đầu
                        </label>
                        <Select
                          value={period.fromMonth.toString()}
                          onValueChange={(value) =>
                            handlePeriodChange(
                              index,
                              "fromMonth",
                              Number.parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
                            <SelectValue placeholder="Chọn tháng" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                            {months.map((month) => (
                              <SelectItem
                                key={month}
                                value={month.toString()}
                                className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                              >
                                Tháng {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Năm bắt đầu
                        </label>
                        <Select
                          value={period.fromYear.toString()}
                          onValueChange={(value) =>
                            handlePeriodChange(
                              index,
                              "fromYear",
                              Number.parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
                            <SelectValue placeholder="Chọn năm" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {years.map((year) => (
                              <SelectItem
                                key={year}
                                value={year.toString()}
                                className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                              >
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tháng kết thúc
                        </label>
                        <Select
                          value={period.toMonth.toString()}
                          onValueChange={(value) =>
                            handlePeriodChange(
                              index,
                              "toMonth",
                              Number.parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
                            <SelectValue placeholder="Chọn tháng" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                            {months.map((month) => (
                              <SelectItem
                                key={month}
                                value={month.toString()}
                                className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                              >
                                Tháng {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Năm kết thúc
                        </label>
                        <Select
                          value={period.toYear.toString()}
                          onValueChange={(value) =>
                            handlePeriodChange(
                              index,
                              "toYear",
                              Number.parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300">
                            <SelectValue placeholder="Chọn năm" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {years.map((year) => (
                              <SelectItem
                                key={year}
                                value={year.toString()}
                                className="hover:bg-blue-50 focus:bg-blue-100 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                              >
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional form fields with enhanced styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {renderPeriodTypeSelector(index, period.type)}
                      {(insuranceType === "voluntary" ||
                        insuranceType === "both") &&
                        renderVoluntaryParticipantSelector(
                          index,
                          period.voluntaryParticipantType
                        )}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Chi phí khoảng / khách đóng BHXH
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={period.salary.toLocaleString("vi-VN")}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\./g, "");
                              if (!isNaN(Number(value))) {
                                handlePeriodChange(
                                  index,
                                  "salary",
                                  Number.parseInt(value) || 0
                                );
                              }
                            }}
                            className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                            placeholder="Nhập Chi phí khoảng / khách..."
                          />
                          <span className="absolute right-4 top-3 text-gray-500 font-medium">
                            VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={calculateInsurance}
                className="cursor-pointer bg-gradient-to-r from-emerald-500 via-green-600 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center text-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Tính BHXH một lần
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  Kết quả tính BHXH một lần
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-200">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xl text-gray-700 font-semibold">
                      Tiền BHXH một lần được nhận:
                    </p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    {formatCurrency(result.totalAmount)}
                  </p>
                  {result.voluntarySubsidyAmount > 0 && (
                    <div className="bg-blue-100 rounded-xl p-4 inline-block">
                      <p className="text-blue-700 font-medium">
                        (Trong đó bao gồm{" "}
                        <span className="font-bold text-blue-800">
                          {formatCurrency(result.voluntarySubsidyAmount)}
                        </span>{" "}
                        hỗ trợ từ Nhà nước cho BHXH tự nguyện)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  Chi tiết tính toán
                </h3>

                {/* Time participation details */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                      1
                    </span>
                    Thời gian tham gia BHXH
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">Tổng thời gian:</span>{" "}
                    {result.timeParticipated}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Trước 2014</p>
                      <p className="text-lg font-bold text-blue-600">
                        {Math.floor(result.pre2014Months / 12)} năm{" "}
                        {result.pre2014Months % 12} tháng
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Từ 2014</p>
                      <p className="text-lg font-bold text-green-600">
                        {Math.floor(result.post2014Months / 12)} năm{" "}
                        {result.post2014Months % 12} tháng
                      </p>
                    </div>
                    {result.voluntaryMonths > 0 && (
                      <div className="bg-white/60 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Tự nguyện</p>
                        <p className="text-lg font-bold text-purple-600">
                          {Math.floor(result.voluntaryMonths / 12)} năm{" "}
                          {result.voluntaryMonths % 12} tháng
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Average salary details */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                      2
                    </span>
                    Mức bình quân tiền lương tháng đóng BHXH
                  </h4>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    {formatCurrency(result.averageSalary)}
                  </p>

                  {/* Period details */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-800">
                      Chi tiết từng giai đoạn:
                    </h5>
                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {result.calculationDetails.map((detail, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            detail.type === "voluntary"
                              ? "bg-blue-50 border-blue-400"
                              : "bg-gray-50 border-gray-400"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">
                              {detail.period}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                detail.type === "voluntary"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {detail.type === "voluntary"
                                ? "Tự nguyện"
                                : "Bắt buộc"}
                            </span>
                          </div>
                          {detail.voluntaryParticipantType && (
                            <p className="text-blue-600 text-sm mb-2">
                              (
                              {getParticipantTypeLabel(
                                detail.voluntaryParticipantType
                              )}
                              )
                            </p>
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Thời gian:</span>
                              <p className="font-medium">
                                {detail.months} tháng
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Lương cơ bản:
                              </span>
                              <p className="font-medium">
                                {formatCurrency(detail.salary)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Hệ số:</span>
                              <p className="font-medium">
                                {detail.coefficient}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Tổng:</span>
                              <p className="font-medium text-green-600">
                                {formatCurrency(detail.amount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white/60 rounded-lg">
                    <p className="font-semibold text-gray-800">
                      Tổng tiền đóng BHXH:{" "}
                      {formatCurrency(
                        result.calculationDetails.reduce(
                          (sum, item) => sum + item.amount,
                          0
                        )
                      )}
                    </p>
                    <p className="font-semibold text-gray-800 mt-1">
                      Mức bình quân = Tổng tiền / tổng số tháng ={" "}
                      {formatCurrency(result.averageSalary)}
                    </p>
                  </div>
                </div>

                {/* Payout calculation */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                      3
                    </span>
                    Mức hưởng BHXH một lần
                  </h4>

                  <div className="space-y-4">
                    {result.pre2014Amount > 0 && (
                      <div className="bg-white/60 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-2">
                          Thời gian trước 2014:
                        </h5>
                        <p className="text-gray-700">
                          {formatCurrency(result.averageSalary)} ×{" "}
                          {Math.floor(result.pre2014Months / 12)} năm × 1.5 =
                          <span className="font-bold text-blue-600 ml-2">
                            {formatCurrency(result.pre2014Amount)}
                          </span>
                        </p>
                        {result.pre2014Months % 12 > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            (Số tháng lẻ {result.pre2014Months % 12} tháng được
                            chuyển sang giai đoạn từ 2014)
                          </p>
                        )}
                      </div>
                    )}

                    {result.post2014Amount > 0 && (
                      <div className="bg-white/60 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-2">
                          Thời gian từ 2014:
                        </h5>
                        <p className="text-gray-700">
                          {formatCurrency(result.averageSalary)} ×{" "}
                          {(result.post2014Months +
                            (result.pre2014Months % 12)) /
                            12}{" "}
                          năm × 2.0 =
                          <span className="font-bold text-green-600 ml-2">
                            {formatCurrency(result.post2014Amount)}
                          </span>
                        </p>
                      </div>
                    )}

                    {result.voluntaryAmount > 0 && (
                      <div className="bg-white/60 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-2">
                          Thời gian tự nguyện:
                        </h5>
                        <p className="text-gray-700">
                          {formatCurrency(result.averageSalary)} ×{" "}
                          {result.voluntaryMonths / 12} năm × 1.0 =
                          <span className="font-bold text-purple-600 ml-2">
                            {formatCurrency(result.voluntaryAmount)}
                          </span>
                        </p>
                        {result.voluntarySubsidyAmount > 0 && (
                          <p className="text-sm text-blue-600 mt-1">
                            (Trong đó có{" "}
                            {formatCurrency(result.voluntarySubsidyAmount)} được
                            Nhà nước hỗ trợ)
                          </p>
                        )}
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 border-2 border-emerald-300">
                      <h5 className="font-bold text-lg text-gray-800 mb-2">
                        Tổng mức hưởng BHXH một lần:
                      </h5>
                      <p className="text-gray-700">
                        {result.pre2014Amount > 0 &&
                          `${formatCurrency(
                            result.pre2014Amount
                          )} (trước 2014)`}
                        {result.post2014Amount > 0 &&
                          ` + ${formatCurrency(
                            result.post2014Amount
                          )} (từ 2014)`}
                        {result.voluntaryAmount > 0 &&
                          ` + ${formatCurrency(
                            result.voluntaryAmount
                          )} (tự nguyện)`}
                        {result.voluntarySubsidyAmount > 0 &&
                          ` (gồm ${formatCurrency(
                            result.voluntarySubsidyAmount
                          )} hỗ trợ)`}
                      </p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mt-2">
                        = {formatCurrency(result.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <ShieldQuestion className="w-6 h-6 text-white" />
              </div>
              Hướng dẫn sử dụng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Cách nhập liệu
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <p>
                      Chọn loại hình BHXH phù hợp (bắt buộc, tự nguyện hoặc cả
                      hai)
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <p>
                      Thêm các giai đoạn đóng BHXH với thời gian và Chi phí khoảng / khách
                      chính xác
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <p>
                      Đối với BHXH tự nguyện, chọn đúng đối tượng tham gia để
                      tính hỗ trợ từ Nhà nước
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    <p>Nhấn nút "Tính BHXH một lần" để xem kết quả</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <FileWarning className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Lưu ý quan trọng
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                    <p>
                      Công cụ áp dụng hệ số điều chỉnh lương theo Thông tư
                      01/2023/TT-BLĐTBXH
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                    <p>
                      Thời gian tham gia được phân chia chính xác trước/sau năm
                      2014
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                    <p>
                      Số tháng lẻ trước 2014 được chuyển sang giai đoạn từ 2014
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                    <p>Kết quả tính toán chỉ mang tính chất tham khảo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SocialInsurance;
