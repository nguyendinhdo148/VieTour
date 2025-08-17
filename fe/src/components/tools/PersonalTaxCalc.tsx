import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Calculator } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Footer from "../Footer";

interface TaxBreakdown {
  bracket: string;
  taxableAmount: number;
  rate: number;
  taxAmount: number;
}

// Regional minimum wages (effective from 01/07/2024 - 30/06/2025)
const REGION_MIN_WAGES_2024 = {
  I: 4960000, // Vùng I: 4,960,000đ
  II: 4410000, // Vùng II: 4,410,000đ
  III: 3860000, // Vùng III: 3,860,000đ
  IV: 3450000, // Vùng IV: 3,450,000đ
};

// Regional minimum wages (effective from 01/07/2025 - Nghị định 128/2025/NĐ-CP)
const REGION_MIN_WAGES_2025 = {
  I: 4960000, // Vùng I: 4,960,000đ
  II: 4410000, // Vùng II: 4,410,000đ
  III: 3860000, // Vùng III: 3,860,000đ
  IV: 3450000, // Vùng IV: 3,450,000đ
};

// Base salary (effective from 01/07/2024 - Nghị định số 73/2024/NĐ-CP)
const BASE_SALARY = 4680000; // 20 x 234,000 (lương cơ sở 2024)
const MAX_SOCIAL_INSURANCE = BASE_SALARY * 10; // Mức đóng BHXH tối đa
const MAX_HEALTH_INSURANCE = BASE_SALARY * 10; // Mức đóng BHYT tối đa

// Personal and dependent deductions (Nghị Quyết số 954/2020/UBTVQH14)
const PERSONAL_DEDUCTION = 11000000; // 11,000,000 VND/month
const DEPENDENT_DEDUCTION = 4400000; // 4,400,000 VND/month per dependent

const PersonalTaxCalc = () => {
  const [income, setIncome] = useState<string>("");
  const [insuranceBase, setInsuranceBase] = useState<string>("");
  const [useCustomInsurance, setUseCustomInsurance] = useState<boolean>(false);
  const [dependents, setDependents] = useState<number>(0);
  const [region, setRegion] = useState<keyof typeof REGION_MIN_WAGES_2025>("I");
  const [taxYear, setTaxYear] = useState<string>("2025");
  const [calculationDetails, setCalculationDetails] = useState<{
    grossIncome: number;
    socialInsurance: number;
    healthInsurance: number;
    unemploymentInsurance: number;
    taxableIncome: number;
    personalDeduction: number;
    dependentDeduction: number;
    taxAmount: number;
    breakdown: TaxBreakdown[];
    netIncome: number;
  } | null>(null);

  // Get the appropriate regional minimum wages based on selected tax year
  const getRegionMinWages = () => {
    return taxYear === "2025" ? REGION_MIN_WAGES_2025 : REGION_MIN_WAGES_2024;
  };

  useEffect(() => {
    // Reset insurance base when toggling custom insurance or changing tax year
    if (!useCustomInsurance) {
      setInsuranceBase("");
    }
  }, [useCustomInsurance, taxYear]);

  const calculateInsurance = (
    grossIncome: number,
    insuranceBaseSalary: number
  ) => {
    const regionWages = getRegionMinWages();

    // Social insurance (8% capped at MAX_SOCIAL_INSURANCE)
    const socialInsurance =
      Math.min(insuranceBaseSalary, MAX_SOCIAL_INSURANCE) * 0.08;

    // Health insurance (1.5% capped at MAX_HEALTH_INSURANCE)
    const healthInsurance =
      Math.min(insuranceBaseSalary, MAX_HEALTH_INSURANCE) * 0.015;

    // Unemployment insurance (1% capped at 20 times regional minimum wage)
    const unemploymentCap = regionWages[region] * 20;
    const unemploymentInsurance = Math.min(grossIncome * 0.01, unemploymentCap);

    return {
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      totalInsurance: socialInsurance + healthInsurance + unemploymentInsurance,
    };
  };

  const calculateTax = () => {
    const grossIncome = parseFloat(income.replace(/\./g, "")) || 0;
    const insuranceBaseSalary = useCustomInsurance
      ? parseFloat(insuranceBase.replace(/\./g, "")) || grossIncome
      : grossIncome;
    const numDependents = Number(dependents) || 0;

    // Insurance calculations
    const insurance = calculateInsurance(grossIncome, insuranceBaseSalary);
    const totalInsurance = insurance.totalInsurance;

    // Deductions
    const personalDeduction = PERSONAL_DEDUCTION;
    const dependentDeduction = DEPENDENT_DEDUCTION * numDependents;

    // Taxable income
    const incomeBeforeTax = grossIncome - totalInsurance;
    const taxableIncome =
      incomeBeforeTax - personalDeduction - dependentDeduction;

    if (taxableIncome <= 0) {
      setCalculationDetails({
        grossIncome,
        socialInsurance: insurance.socialInsurance,
        healthInsurance: insurance.healthInsurance,
        unemploymentInsurance: insurance.unemploymentInsurance,
        taxableIncome: 0,
        personalDeduction,
        dependentDeduction,
        taxAmount: 0,
        breakdown: [],
        netIncome: incomeBeforeTax,
      });
      return;
    }

    // Tax brackets (same for both periods)
    const brackets = [
      { min: 0, max: 5000000, rate: 0.05, fixedAmount: 0 },
      { min: 5000000, max: 10000000, rate: 0.1, fixedAmount: 250000 },
      { min: 10000000, max: 18000000, rate: 0.15, fixedAmount: 750000 },
      { min: 18000000, max: 32000000, rate: 0.2, fixedAmount: 1950000 },
      { min: 32000000, max: 52000000, rate: 0.25, fixedAmount: 4750000 },
      { min: 52000000, max: 80000000, rate: 0.3, fixedAmount: 9750000 },
      { min: 80000000, max: Infinity, rate: 0.35, fixedAmount: 18150000 },
    ];

    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const breakdown: TaxBreakdown[] = [];

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (remainingIncome <= 0) break;

      const bracketRange = bracket.max - bracket.min;
      const taxableInBracket = Math.min(remainingIncome, bracketRange);

      if (taxableInBracket > 0) {
        const taxForBracket = taxableInBracket * bracket.rate;
        totalTax += taxForBracket;

        breakdown.push({
          bracket:
            i === 0
              ? `Đến ${formatCurrency(bracket.max)}`
              : `Trên ${formatCurrency(bracket.min)} đến ${
                  bracket.max === Infinity ? "" : formatCurrency(bracket.max)
                }`,
          taxableAmount: taxableInBracket,
          rate: bracket.rate * 100,
          taxAmount: taxForBracket,
        });

        remainingIncome -= taxableInBracket;
      }
    }

    setCalculationDetails({
      grossIncome,
      socialInsurance: insurance.socialInsurance,
      healthInsurance: insurance.healthInsurance,
      unemploymentInsurance: insurance.unemploymentInsurance,
      taxableIncome,
      personalDeduction,
      dependentDeduction,
      taxAmount: Math.round(totalTax),
      breakdown,
      netIncome: incomeBeforeTax - totalTax,
    });
  };

  const formatCurrency = (value: number | string): string => {
    const num =
      typeof value === "string"
        ? parseFloat(value.replace(/\./g, "")) || 0
        : value;
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(value)) {
      setIncome(formatInputNumber(value));
    }
  };

  const handleInsuranceBaseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(value)) {
      setInsuranceBase(formatInputNumber(value));
    }
  };

  const formatInputNumber = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDependentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDependents(value >= 0 ? value : 0);
  };

  const toggleCustomInsurance = () => {
    setUseCustomInsurance(!useCustomInsurance);
  };

  const regionWages = getRegionMinWages();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Calculator className="w-10 h-10 text-indigo-700 flex-shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Công cụ tính{" "}
              <span className="text-indigo-700">Thuế thu nhập cá nhân</span>
            </h1>
          </div>
          <Badge
            variant="outline"
            className="border-2 border-indigo-600 text-indigo-600 text-base py-1 px-3 mt-4 sm:mt-0"
          >
            Chuẩn 2025
          </Badge>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Thông tin tính thuế</h2>

            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <label className="block text-blue-800 font-medium mb-2">
                Áp dụng quy định:
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center bg-white px-4 py-2 rounded border border-blue-200">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="taxYear"
                    value="2024-2025"
                    checked={taxYear === "2024-2025"}
                    onChange={() => setTaxYear("2024-2025")}
                  />
                  <span className="ml-2">Từ 01/07/2024 - 30/06/2025</span>
                </label>
                <label className="inline-flex items-center bg-white px-4 py-2 rounded border border-blue-200">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="taxYear"
                    value="2025"
                    checked={taxYear === "2025"}
                    onChange={() => setTaxYear("2025")}
                  />
                  <span className="ml-2">Từ 01/07/2025 (Mới nhất)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-1">
                  Giảm trừ gia cảnh bản thân
                </h3>
                <p className="text-2xl font-bold text-blue-600">11,000,000đ</p>
                <p className="text-sm text-blue-700 mt-1">
                  132,000,000đ/năm (Theo Nghị Quyết 954/2020/UBTVQH14)
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-1">
                  Người phụ thuộc
                </h3>
                <p className="text-2xl font-bold text-green-600">4,400,000đ</p>
                <p className="text-sm text-green-700 mt-1">
                  52,800,000đ/năm/người (Theo Nghị Quyết 954/2020/UBTVQH14)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="salary-input"
                  className="block mb-2 font-semibold text-gray-900 text-base"
                >
                  Thu nhập Gross
                </Label>
                <Input
                  type="text"
                  className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                  placeholder="VD: 15,000,000"
                  value={income}
                  onChange={handleIncomeChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="region-select"
                  className="block mb-2 font-semibold text-gray-900 text-base"
                >
                  Vùng lương tối thiểu
                </Label>
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
                  <SelectContent className="bg-white rounded-xl border border-slate-300 shadow-lg">
                    <SelectItem
                      value="I"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Vùng I: {formatCurrency(regionWages["I"])}
                    </SelectItem>
                    <SelectItem
                      value="II"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Vùng II: {formatCurrency(regionWages["II"])}
                    </SelectItem>
                    <SelectItem
                      value="III"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Vùng III: {formatCurrency(regionWages["III"])}
                    </SelectItem>
                    <SelectItem
                      value="IV"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Vùng IV: {formatCurrency(regionWages["IV"])}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  {taxYear === "2025"
                    ? "Theo Nghị định 128/2025/NĐ-CP có hiệu lực từ 01/07/2025"
                    : "Theo Nghị định 38/2022/NĐ-CP có hiệu lực từ 01/07/2024"}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id="customInsurance"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={useCustomInsurance}
                    onChange={toggleCustomInsurance}
                  />
                  <Label
                    htmlFor="customInsurance"
                    className="text-base ml-2 text-gray-700 font-medium"
                  >
                    Sử dụng mức lương đóng BHXH khác
                  </Label>
                </div>

                {useCustomInsurance && (
                  <div className="relative">
                    <Input
                      type="text"
                      className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                      placeholder="Nhập mức lương đóng BHXH"
                      value={insuranceBase}
                      onChange={handleInsuranceBaseChange}
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Mức đóng BHXH tối đa: {formatCurrency(MAX_SOCIAL_INSURANCE)}{" "}
                  VND/tháng (20 lần lương cơ sở theo Nghị định 73/2024/NĐ-CP)
                </p>
              </div>

              <div>
                <Label
                  htmlFor="dependents-input"
                  className="block mb-2 font-semibold text-gray-900 text-base"
                >
                  Số người phụ thuộc
                </Label>
                <Input
                  id="dependents-input"
                  type="number"
                  value={dependents}
                  min={0}
                  onChange={handleDependentsChange}
                  className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nhập số người phụ thuộc đã đăng ký với cơ quan thuế
                </p>
              </div>
            </div>

            <Button
              className="w-full py-4 mt-6 text-lg font-semibold cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-400 hover:shadow-indigo-600 transition-all duration-200 rounded-xl"
              onClick={calculateTax}
            >
              Tính thuế TNCN
            </Button>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Kết quả tính thuế</h2>

            {calculationDetails ? (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Tổng quan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lương GROSS:</span>
                      <span className="font-medium">
                        {formatCurrency(calculationDetails.grossIncome)} VND
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Bảo hiểm xã hội (8%):</span>
                      <span>
                        -{formatCurrency(calculationDetails.socialInsurance)}{" "}
                        VND
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Bảo hiểm y tế (1.5%):</span>
                      <span>
                        -{formatCurrency(calculationDetails.healthInsurance)}{" "}
                        VND
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Bảo hiểm thất nghiệp (1%):</span>
                      <span>
                        -
                        {formatCurrency(
                          calculationDetails.unemploymentInsurance
                        )}{" "}
                        VND
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span className="font-medium">Thu nhập trước thuế:</span>
                      <span className="font-medium">
                        {formatCurrency(
                          calculationDetails.grossIncome -
                            calculationDetails.socialInsurance -
                            calculationDetails.healthInsurance -
                            calculationDetails.unemploymentInsurance
                        )}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-3">Giảm trừ</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-green-600">
                      <span>Giảm trừ gia cảnh bản thân:</span>
                      <span>
                        -{formatCurrency(calculationDetails.personalDeduction)}{" "}
                        VND
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>
                        Giảm trừ người phụ thuộc (
                        {calculationDetails.dependentDeduction > 0
                          ? dependents
                          : 0}{" "}
                        người):
                      </span>
                      <span>
                        -{formatCurrency(calculationDetails.dependentDeduction)}{" "}
                        VND
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-2 mt-2">
                      <span className="font-medium">Thu nhập chịu thuế:</span>
                      <span className="font-medium">
                        {formatCurrency(calculationDetails.taxableIncome)} VND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-3">
                    Thuế thu nhập cá nhân
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Tổng thuế phải nộp:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {formatCurrency(calculationDetails.taxAmount)} VND
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-purple-200 pt-2 mt-2">
                      <span className="font-medium">
                        Lương NET (thực nhận):
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(calculationDetails.netIncome)} VND
                      </span>
                    </div>
                  </div>
                </div>

                {calculationDetails.breakdown.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">
                      Chi tiết tính thuế
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mức chịu thuế
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thuế suất
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tiền nộp
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {calculationDetails.breakdown.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                {item.bracket}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                                {item.rate}%
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                                {formatCurrency(item.taxAmount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
                  Nhập thông tin và nhấn "Tính thuế TNCN" để xem kết quả
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Thông tin về thuế TNCN
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Thuế thu nhập cá nhân là gì?
              </h3>
              <div className="prose prose-sm text-gray-600">
                <p>
                  Thuế thu nhập cá nhân (Tiếng Anh: Personal income tax) là
                  khoản tiền mà người có thu nhập cần trích từ lương và các
                  nguồn thu khác (nếu có) của mình để nộp vào ngân sách nhà nước
                  sau khi đã được giảm trừ.
                </p>
                <p>
                  Thuế thu nhập cá nhân không đánh vào tất cả các đối tượng mà
                  có mức lương quy định cần đóng riêng, góp phần thu hẹp khoảng
                  cách giữa các tầng lớp trong xã hội.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Mức lương tối thiểu vùng{" "}
                {taxYear === "2025" ? "2025" : "2024-2025"}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Vùng
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Mức lương tối thiểu
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Bảo hiểm thất nghiệp tối đa (20 lần)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(regionWages).map(([regionKey, wage]) => (
                      <tr key={regionKey}>
                        <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                          Vùng {regionKey}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                          {formatCurrency(wage)} VND
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                          {formatCurrency(wage * 20)} VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {taxYear === "2025"
                  ? "Theo Nghị định 128/2025/NĐ-CP có hiệu lực từ 01/07/2025"
                  : "Theo Nghị định 38/2022/NĐ-CP có hiệu lực từ 01/07/2024"}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Công thức tính thuế thu nhập cá nhân
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-base font-medium text-blue-800 mb-1">
                  Thuế TNCN phải nộp = Thu nhập tính thuế × Thuế suất
                </p>
                <p className="text-sm text-blue-700">
                  Trong đó: Thu nhập tính thuế = Thu nhập chịu thuế - Các khoản
                  giảm trừ
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Bảng thuế suất luỹ tiến từng phần
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Bậc
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Thu nhập tính thuế/tháng
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Thuế suất
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Cách tính
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        1
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Đến 5 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        5%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        0 + 5% TNTT
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        2
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 5 triệu đến 10 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        10%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        250,000 + 10% TNTT {">"}5tr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        3
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 10 triệu đến 18 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        15%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        750,000 + 15% TNTT {">"}10tr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        4
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 18 triệu đến 32 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        20%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        1,950,000 + 20% TNTT {">"}18tr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        5
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 32 triệu đến 52 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        25%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        4,750,000 + 25% TNTT {">"}32tr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        6
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 52 triệu đến 80 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        30%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        9,750,000 + 30% TNTT {">"}52tr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        7
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        Trên 80 triệu
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        35%
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-700">
                        18,150,000 + 35% TNTT {">"}80tr
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalTaxCalc;
