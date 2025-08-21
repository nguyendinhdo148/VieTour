import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "../Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Calculator,
  Calendar,
  ChartSpline,
  CircleCheck,
  DollarSign,
  FileQuestion,
  ShieldAlert,
} from "lucide-react";

interface InsuranceResult {
  monthlyBenefit: number;
  monthsEligible: number;
  details: {
    label: string;
    value: number | string;
    explanation?: string;
  }[];
}

interface SalaryInput {
  month1: string;
  month2: string;
  month3: string;
  month4: string;
  month5: string;
  month6: string;
}

const UnemploymentInsurance = () => {
  // Regional minimum wages for different periods
  const REGION_MIN_WAGES_2024 = {
    I: 4680000,
    II: 4160000,
    III: 3640000,
    IV: 3250000,
  };

  const REGION_MIN_WAGES_2025 = {
    I: 4960000,
    II: 4410000,
    III: 3860000,
    IV: 3450000,
  };

  // Base salary for different periods
  const BASE_SALARY_2024 = 1800000; // Before 01/07/2024
  const BASE_SALARY_2025 = 2340000; // From 01/07/2024

  const [period, setPeriod] = useState<"2024" | "2025">("2025");
  const [salaryType, setSalaryType] = useState<"fixed" | "variable">("fixed");
  const [fixedSalary, setFixedSalary] = useState<string>("");
  const [variableSalaries, setVariableSalaries] = useState<SalaryInput>({
    month1: "",
    month2: "",
    month3: "",
    month4: "",
    month5: "",
    month6: "",
  });

  const [insuranceMonths, setInsuranceMonths] = useState<string>("");
  const [salaryScheme, setSalaryScheme] = useState<"state" | "private">(
    "state"
  );
  const [region, setRegion] = useState<keyof typeof REGION_MIN_WAGES_2025>("I");
  const [result, setResult] = useState<InsuranceResult | null>(null);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const handleFixedSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(value)) {
      setFixedSalary(formatInputNumber(value));
    }
  };

  const handleVariableSalaryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    month: keyof SalaryInput
  ) => {
    const value = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(value)) {
      setVariableSalaries((prev) => ({
        ...prev,
        [month]: formatInputNumber(value),
      }));
    }
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(value)) {
      setInsuranceMonths(formatInputNumber(value));
    }
  };

  const formatInputNumber = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateInsurance = () => {
    // Get the correct base salary and regional wages based on period
    const baseSalary = period === "2024" ? BASE_SALARY_2024 : BASE_SALARY_2025;
    const regionWages =
      period === "2024" ? REGION_MIN_WAGES_2024 : REGION_MIN_WAGES_2025;

    // Calculate average salary
    let averageSalary = 0;
    if (salaryType === "fixed") {
      averageSalary = parseFloat(fixedSalary.replace(/\./g, "")) || 0;
    } else {
      const salaries = Object.values(variableSalaries).map(
        (s) => parseFloat(s.replace(/\./g, "")) || 0
      );
      averageSalary = salaries.reduce((sum, s) => sum + s, 0) / salaries.length;
    }

    const monthsValue = parseInt(insuranceMonths.replace(/\./g, "")) || 0;

    // Calculate maximum insurance salary
    const maxInsuranceSalary =
      salaryScheme === "state"
        ? baseSalary * 20 // 20 times base salary for state employees
        : regionWages[region] * 20; // 20 times regional minimum wage for private employees

    // The actual salary used for calculation (capped at max)
    const calculationSalary = Math.min(averageSalary, maxInsuranceSalary);

    // Monthly benefit is 60% of calculation salary
    const monthlyBenefit = calculationSalary * 0.6;

    // Maximum monthly benefit is 5 times base salary or regional minimum wage
    const maxMonthlyBenefit =
      salaryScheme === "state" ? baseSalary * 5 : regionWages[region] * 5;

    // Final monthly benefit (capped at maximum)
    const finalMonthlyBenefit = Math.min(monthlyBenefit, maxMonthlyBenefit);

    // Calculate eligible months
    let monthsEligible = 0;
    if (monthsValue >= 12 && monthsValue <= 36) {
      monthsEligible = 3;
    } else if (monthsValue > 36) {
      monthsEligible = 3 + Math.floor((monthsValue - 36) / 12);
      monthsEligible = Math.min(monthsEligible, 12); // Max 12 months
    }

    setResult({
      monthlyBenefit: finalMonthlyBenefit,
      monthsEligible,
      details: [
        {
          label: "Tiền lương đóng BHTN",
          value: formatCurrency(averageSalary),
          explanation:
            "(Bình quân tiền lương tháng đóng BHTN của 06 tháng liền kề trước khi thất nghiệp)",
        },
        {
          label: "Lương cơ sở",
          value: formatCurrency(baseSalary),
          explanation:
            period === "2024"
              ? "(Theo quy định trước 01/07/2024)"
              : "(Theo Nghị định số 73/2024/NĐ-CP từ 01/07/2024)",
        },
        {
          label: "Mức lương tháng được đóng BHTN tối đa",
          value: formatCurrency(maxInsuranceSalary),
          explanation: `(= 20 * ${
            salaryScheme === "state" ? "lương cơ sở" : "lương tối thiểu vùng"
          })`,
        },
        {
          label: "Mức lương tháng áp dụng tính BHTN",
          value: formatCurrency(calculationSalary),
          explanation: "(Không vượt quá mức lương tháng đóng BHTN tối đa)",
        },
        {
          label: "Mức hưởng trợ cấp thất nghiệp hàng tháng tối đa",
          value: formatCurrency(maxMonthlyBenefit),
          explanation: `(= 5 * ${
            salaryScheme === "state" ? "lương cơ sở" : "lương tối thiểu vùng"
          })`,
        },
        {
          label: "Thời gian đóng BHTN chưa hưởng",
          value: `${monthsValue} tháng`,
        },
        {
          label: "Chế độ lương",
          value:
            salaryScheme === "state"
              ? "Doanh nghiệp nhà nước"
              : "Doanh nghiệp tư nhân",
        },
        {
          label: "Mức trợ cấp hàng tháng theo mức lương áp dụng",
          value: formatCurrency(monthlyBenefit),
          explanation: "(= 0.6 * Mức lương tháng áp dụng tính BHTN)",
        },
        {
          label: "Mức hưởng BHTN hàng tháng thực nhận",
          value: formatCurrency(finalMonthlyBenefit),
          explanation:
            "(Không vượt quá mức hưởng trợ cấp thất nghiệp hàng tháng tối đa)",
        },
        {
          label: "Số tháng hưởng BHTN",
          value: `${monthsEligible} tháng`,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Công cụ tính mức hưởng bảo hiểm thất nghiệp
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Chính xác nhất - Cập nhật theo quy định mới nhất
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Thông tin tính bảo hiểm thất nghiệp
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <label
                className={`inline-flex items-center px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  period === "2024"
                    ? "bg-white border-blue-400 text-blue-700 shadow-md"
                    : "bg-white/50 border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                <input
                  type="radio"
                  className="form-radio text-blue-600 w-5 h-5"
                  name="period"
                  checked={period === "2024"}
                  onChange={() => setPeriod("2024")}
                />
                <span className="ml-3 font-medium">
                  Từ 01/07/2024 - 30/06/2025
                </span>
              </label>
              <label
                className={`inline-flex items-center px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  period === "2025"
                    ? "bg-white border-blue-400 text-blue-700 shadow-md"
                    : "bg-white/50 border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                <input
                  type="radio"
                  className="form-radio text-blue-600 w-5 h-5"
                  name="period"
                  checked={period === "2025"}
                  onChange={() => setPeriod("2025")}
                />
                <span className="ml-3 font-medium">
                  Từ 01/07/2025 (Mới nhất)
                </span>
              </label>
            </div>

            <div className="mb-8 bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
              <label className="block text-slate-700 font-semibold mb-4 text-lg">
                Lương đóng BH:
              </label>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                    salaryType === "fixed"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg"
                      : "bg-white border-slate-300 text-slate-600 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setSalaryType("fixed")}
                >
                  Không thay đổi trong 6 tháng
                </button>
                <button
                  className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                    salaryType === "variable"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg"
                      : "bg-white border-slate-300 text-slate-600 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setSalaryType("variable")}
                >
                  Thay đổi trong 6 tháng
                </button>
              </div>

              {salaryType === "fixed" ? (
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl pr-16 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-lg font-medium"
                    placeholder="VD: 10.000.000"
                    value={fixedSalary}
                    onChange={handleFixedSalaryChange}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    VND
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {(
                    [
                      "month1",
                      "month2",
                      "month3",
                      "month4",
                      "month5",
                      "month6",
                    ] as (keyof SalaryInput)[]
                  ).map((month, index) => (
                    <div key={month} className="relative">
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Tháng {index + 1}
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border-2 border-slate-300 rounded-xl pr-16 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                        value={variableSalaries[month]}
                        onChange={(e) => handleVariableSalaryChange(e, month)}
                      />
                      <span className="absolute right-3 top-11 text-slate-500 text-sm">
                        VND
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-slate-500 mt-3 italic">
                (Bình quân tiền lương tháng đóng BHTN của 06 tháng liền kề trước
                khi thất nghiệp)
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-2 text-lg">
                  Tổng thời gian đóng BHTN chưa hưởng
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-slate-300 rounded-xl pr-20 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-lg font-medium"
                    placeholder="VD: 12"
                    value={insuranceMonths}
                    onChange={handleMonthsChange}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    Tháng
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2 italic">
                  (Thời gian đóng bảo hiểm thất nghiệp - Thời gian đã hưởng trợ
                  cấp thất nghiệp)
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-3 text-lg">
                  Chế độ tiền lương
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      salaryScheme === "state"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-lg"
                        : "bg-white border-slate-300 text-slate-600 hover:border-emerald-300 hover:shadow-md"
                    }`}
                    onClick={() => setSalaryScheme("state")}
                  >
                    Doanh nghiệp nhà nước
                  </button>
                  <button
                    className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      salaryScheme === "private"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-lg"
                        : "bg-white border-slate-300 text-slate-600 hover:border-emerald-300 hover:shadow-md"
                    }`}
                    onClick={() => setSalaryScheme("private")}
                  >
                    Doanh nghiệp tư nhân
                  </button>
                </div>
              </div>

              {salaryScheme === "private" && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 text-lg">
                    Vùng lương tối thiểu
                  </label>
                  <Select
                    value={region}
                    onValueChange={(v) =>
                      setRegion(v as keyof typeof REGION_MIN_WAGES_2025)
                    }
                  >
                    <SelectTrigger
                      id="region-select"
                      className="px-4 py-3 text-lg border-2 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 rounded-xl"
                    >
                      <SelectValue placeholder="Chọn vùng" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border border-gray-300 shadow-sm">
                      <SelectItem
                        value="I"
                        className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        Vùng I:{" "}
                        {formatCurrency(
                          period === "2024"
                            ? REGION_MIN_WAGES_2024["I"]
                            : REGION_MIN_WAGES_2025["I"]
                        )}
                        đ
                      </SelectItem>
                      <SelectItem
                        value="II"
                        className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        Vùng II:{" "}
                        {formatCurrency(
                          period === "2024"
                            ? REGION_MIN_WAGES_2024["II"]
                            : REGION_MIN_WAGES_2025["II"]
                        )}
                        đ
                      </SelectItem>
                      <SelectItem
                        value="III"
                        className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        Vùng III:{" "}
                        {formatCurrency(
                          period === "2024"
                            ? REGION_MIN_WAGES_2024["III"]
                            : REGION_MIN_WAGES_2025["III"]
                        )}
                        đ
                      </SelectItem>
                      <SelectItem
                        value="IV"
                        className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        Vùng IV:{" "}
                        {formatCurrency(
                          period === "2024"
                            ? REGION_MIN_WAGES_2024["IV"]
                            : REGION_MIN_WAGES_2025["IV"]
                        )}
                        đ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500 mt-2 italic">
                    {period === "2024"
                      ? "Theo Nghị định 38/2022/NĐ-CP có hiệu lực từ 01/07/2024"
                      : "Theo Nghị định 128/2025/NĐ-CP có hiệu lực từ 01/07/2025"}
                  </p>
                </div>
              )}
            </div>

            <button
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl mt-8 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              onClick={calculateInsurance}
            >
              <span className="flex items-center justify-center gap-3">
                <Calculator className="w-6 h-6" />
                Tính bảo hiểm thất nghiệp
              </span>
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <ChartSpline className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">
                Kết quả tính bảo hiểm thất nghiệp
              </h2>
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <DollarSign className="size-4 text-white" />
                        </div>
                        <p className="text-base font-medium text-slate-600">
                          Mức hưởng BHTN hàng tháng:
                        </p>
                      </div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {formatCurrency(result.monthlyBenefit)} VND
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Calendar className="size-4 text-white" />
                        </div>
                        <p className="text-base font-medium text-slate-600">
                          Số tháng hưởng BHTN:
                        </p>
                      </div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {result.monthsEligible} tháng
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    (*) Diễn giải chi tiết
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.details.map((detail, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded shadow-sm"
                      >
                        <p className="text-sm text-gray-600">
                          ({index + 1}) {detail.label}
                        </p>
                        <p className="font-medium">
                          {typeof detail.value === "string"
                            ? detail.value
                            : formatCurrency(detail.value)}
                          {detail.explanation && (
                            <span className="text-xs text-gray-500 block mt-1">
                              {detail.explanation}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-200 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Chưa có dữ liệu
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Nhập thông tin và nhấn "Tính bảo hiểm thất nghiệp" để xem kết
                  quả
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Thông tin về bảo hiểm thất nghiệp
            </h2>
          </div>

          <div className="space-y-10">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileQuestion className="w-6 h-6 text-blue-600" />
                Bảo hiểm thất nghiệp là gì?
              </h3>
              <div className="prose prose-sm text-slate-700 leading-relaxed">
                <p className="mb-4">
                  Bảo hiểm thất nghiệp là hình thức bảo hiểm bắt buộc với mục
                  đích xã hội và không vì lợi nhuận. Theo Điều 42 Luật Việc làm
                  2013, quyền lợi khi tham gia BHTN bao gồm:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Khoản tiền trợ cấp thất nghiệp;
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Hỗ trợ học nghề;
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Hỗ trợ tư vấn và giới thiệu việc làm;
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Hỗ trợ giúp đào tạo, nâng cao trình độ của nghề.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CircleCheck className="size-6 text-emerald-600" />
                Công thức tính bảo hiểm thất nghiệp
              </h3>
              <div className="bg-white p-6 rounded-xl border border-emerald-200 shadow-sm">
                <p className="font-bold text-emerald-800 mb-2 text-lg">
                  Mức hưởng thất nghiệp hàng tháng = Mức trung bình tiền lương
                  đóng bảo hiểm thất nghiệp hàng tháng của 06 tháng gần nhất
                  trước khi thất nghiệp × 60%
                </p>
                <p className="text-sm text-emerald-700 italic">
                  Mức hưởng tối đa không quá 5 lần mức lương cơ sở (với chế độ
                  lương nhà nước) hoặc 5 lần mức lương tối thiểu vùng (với chế
                  độ lương doanh nghiệp)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ví dụ minh họa
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800">
                    Ví dụ 1: Nhân viên nhà nước
                  </h4>
                  <p className="text-sm text-gray-600">
                    Anh A làm Nhà nước, đóng bảo hiểm thất nghiệp được 12 tháng
                    với mức lương trung bình 6 tháng cuối cùng 13,000,000
                    đồng/tháng.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Kết quả:</span> Được hưởng
                    7,800,000 đồng/tháng trong 3 tháng (60% lương, không vượt
                    quá 5 lần lương cơ sở).
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800">
                    Ví dụ 2: Nhân viên tư nhân
                  </h4>
                  <p className="text-sm text-gray-600">
                    Chị B đóng bảo hiểm thất nghiệp được 62 tháng tại doanh
                    nghiệp tư nhân vùng I với lương trung bình 6 tháng cuối là
                    6,000,000 đồng/tháng.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Kết quả:</span> Được hưởng
                    3,600,000 đồng/tháng trong 5 tháng (3 tháng đầu + 2 tháng
                    sau).
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Thời gian hưởng bảo hiểm thất nghiệp
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian đóng BHTN
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tháng hưởng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 12 - dưới 36 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        3 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 36 - dưới 48 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        4 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 48 - dưới 60 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        5 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 60 - dưới 72 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        6 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 72 - dưới 84 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        7 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 84 - dưới 96 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        8 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 96 - dưới 108 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        9 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 108 - dưới 120 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        10 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 120 - dưới 132 tháng
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        11 tháng
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        Từ 132 tháng trở lên
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                        12 tháng
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Thời điểm hưởng trợ cấp tính từ ngày thứ 16 sau khi nộp đủ hồ
                sơ.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Điều kiện hưởng bảo hiểm thất nghiệp
              </h3>
              <div className="prose prose-sm text-gray-600">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Đã chấm dứt hợp đồng lao động (không phải do đơn phương chấm
                    dứt trái pháp luật)
                  </li>
                  <li>
                    Đã đóng BHTN từ 12 tháng trở lên trong 24 tháng trước khi
                    thất nghiệp
                  </li>
                  <li>Đã đăng ký thất nghiệp tại trung tâm dịch vụ việc làm</li>
                  <li>
                    Chưa tìm được việc làm sau 15 ngày kể từ ngày đăng ký thất
                    nghiệp
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Hồ sơ hưởng bảo hiểm thất nghiệp
              </h3>
              <div className="prose prose-sm text-gray-600">
                <p>Khi đi làm thủ tục hưởng BHTN, cần chuẩn bị:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Đơn đề nghị hưởng trợ cấp thất nghiệp</li>
                  <li>Bản sao hợp đồng lao động đã hết hạn hoặc bị chấm dứt</li>
                  <li>Bản sao sổ bảo hiểm xã hội</li>
                  <li>Giấy chứng nhận sức khỏe (nếu có)</li>
                  <li>Giấy tờ tùy thân (CMND/CCCD, hộ khẩu)</li>
                </ul>
                <p className="mt-2">
                  Thời gian giải quyết hồ sơ: Trong vòng 20 ngày làm việc kể từ
                  ngày nộp đủ hồ sơ hợp lệ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Lưu ý quan trọng
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Kết quả tính toán chỉ mang tính chất tham khảo. Mức hưởng thực
                  tế có thể thay đổi tùy thuộc vào quy định cụ thể tại thời điểm
                  nộp hồ sơ và chính sách của địa phương. Để biết chính xác, vui
                  lòng liên hệ trực tiếp với cơ quan bảo hiểm xã hội hoặc trung
                  tâm dịch vụ việc làm địa phương.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UnemploymentInsurance;
