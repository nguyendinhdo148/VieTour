import { useState, useMemo } from "react";
import {
  Calculator,
  Info,
  AlertCircle,
  ArrowLeftRight,
  BadgeInfo,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

// =================== TYPES ====================
type YearKey = "2024" | "2025";
type RegionKey = "I" | "II" | "III" | "IV";
type TabKey = "grossToNet" | "netToGross";
type InsuranceType = "official" | "region" | "cap";

interface ConfigType {
  baseSalary: number;
  personalDeduction: number;
  dependentDeduction: number;
  minSalaries: Record<RegionKey, number>;
}

interface CalcResult {
  gross: number;
  net: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;
  tax: number;
  insuranceBase: number;
  taxableIncome: number;
}

// ================== DATA CONFIGS ===================
const configList: Record<YearKey, ConfigType> = {
  "2024": {
    baseSalary: 1800000,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    minSalaries: {
      I: 4680000,
      II: 4160000,
      III: 3640000,
      IV: 3250000,
    },
  },
  "2025": {
    baseSalary: 2340000,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    minSalaries: {
      I: 4960000,
      II: 4410000,
      III: 3860000,
      IV: 3450000,
    },
  },
} as const;

const insuranceRates = {
  social: 0.08,
  health: 0.015,
  unemployment: 0.01,
} as const;

const taxRates = [
  { min: 0, max: 5000000, rate: 0.05 },
  { min: 5000000, max: 10000000, rate: 0.1 },
  { min: 10000000, max: 18000000, rate: 0.15 },
  { min: 18000000, max: 32000000, rate: 0.2 },
  { min: 32000000, max: 52000000, rate: 0.25 },
  { min: 52000000, max: 80000000, rate: 0.3 },
  { min: 80000000, max: Infinity, rate: 0.35 },
] as const;

// ================= HELPER =========================
function formatCurrency(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

// ============== CALCULATION CORE ==================
function calcGrossToNet({
  salary,
  dependents,
  insuranceSalary,
  otherIncome,
  region,
  config,
}: {
  salary: number;
  dependents: number;
  insuranceSalary: InsuranceType;
  otherIncome: number;
  region: RegionKey;
  config: ConfigType;
}): CalcResult {
  const totalIncome = salary + (otherIncome || 0);

  let insuranceBase = salary;
  if (insuranceSalary === "region") insuranceBase = config.minSalaries[region];
  if (insuranceSalary === "cap")
    insuranceBase = Math.min(salary, 20 * config.baseSalary);

  const socialInsurance = insuranceBase * insuranceRates.social;
  const healthInsurance = insuranceBase * insuranceRates.health;
  const unemploymentInsurance = insuranceBase * insuranceRates.unemployment;
  const totalInsurance =
    socialInsurance + healthInsurance + unemploymentInsurance;

  const taxableIncome =
    totalIncome -
    totalInsurance -
    config.personalDeduction -
    dependents * config.dependentDeduction;

  let tax = 0;
  if (taxableIncome > 0) {
    for (const br of taxRates) {
      if (taxableIncome > br.min) {
        const upper = Math.min(taxableIncome, br.max);
        tax += (upper - br.min) * br.rate;
      }
    }
  }
  const net = totalIncome - totalInsurance - tax;

  return {
    gross: totalIncome,
    net,
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    tax,
    insuranceBase,
    taxableIncome,
  };
}

// Giải Net to Gross thông qua lặp, đảm bảo đúng precision
function calcNetToGross({
  netWant,
  dependents,
  insuranceSalary,
  otherIncome,
  region,
  config,
}: {
  netWant: number;
  dependents: number;
  insuranceSalary: InsuranceType;
  otherIncome: number;
  region: RegionKey;
  config: ConfigType;
}): CalcResult & { gross: number } {
  let gross = netWant;
  let iterations = 0;
  const precision = 1000;
  const maxIter = 100;
  let lastRes: CalcResult = calcGrossToNet({
    salary: gross,
    dependents,
    insuranceSalary,
    otherIncome,
    region,
    config,
  });
  while (iterations < maxIter) {
    lastRes = calcGrossToNet({
      salary: gross,
      dependents,
      insuranceSalary,
      otherIncome,
      region,
      config,
    });
    const delta = lastRes.net - netWant;
    if (Math.abs(delta) < precision) break;
    gross += -delta * 0.7;
    iterations++;
  }
  return {
    ...lastRes,
    gross,
  };
}

// =============== MAIN UI ==========================
const SalaryCalculator = () => {
  // --- STATES, all typed ---
  const [activeTab, setActiveTab] = useState<TabKey>("grossToNet");
  const [salary, setSalary] = useState<string>("");
  const [dependents, setDependents] = useState<string>("0");
  const [insuranceSalary, setInsuranceSalary] =
    useState<InsuranceType>("official");
  const [otherIncome, setOtherIncome] = useState<string>("");
  const [region, setRegion] = useState<RegionKey>("I");
  const [effectiveDate, setEffectiveDate] = useState<YearKey>("2025");
  const [result, setResult] = useState<
    CalcResult | (CalcResult & { gross: number }) | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Memo config typed theo năm
  const config = useMemo(() => configList[effectiveDate], [effectiveDate]);

  // Input parsing
  const salaryNum = parseInt(salary.replace(/[^0-9]/g, "") || "0", 10);
  const dependentsNum = Math.max(
    0,
    parseInt(dependents.replace(/[^0-9]/g, "") || "0", 10)
  );
  const otherIncomeNum = parseInt(
    otherIncome.replace(/[^0-9]/g, "") || "0",
    10
  );

  // MAIN calculating handler
  const handleCalculate = () => {
    setErrorMsg("");
    if (salaryNum <= 0) {
      setResult(null);
      setErrorMsg("Vui lòng nhập mức lương hợp lệ.");
      return;
    }
    if (!(region in config.minSalaries)) {
      setResult(null);
      setErrorMsg("Vui lòng chọn vùng lương tối thiểu.");
      return;
    }
    if (dependentsNum < 0) {
      setResult(null);
      setErrorMsg("Số người phụ thuộc không được nhỏ hơn 0.");
      return;
    }
    if (activeTab === "grossToNet") {
      setResult(
        calcGrossToNet({
          salary: salaryNum,
          dependents: dependentsNum,
          insuranceSalary,
          otherIncome: otherIncomeNum,
          region,
          config,
        })
      );
    } else {
      setResult(
        calcNetToGross({
          netWant: salaryNum,
          dependents: dependentsNum,
          insuranceSalary,
          otherIncome: otherIncomeNum,
          region,
          config,
        })
      );
    }
  };

  // Khi đổi tab, react-select Tabs muốn onValueChange kiểu: (value: string) => void
  // Nên phải check/ép kiểu chặt
  const onChangeTab = (tab: string) => {
    if (tab === "grossToNet" || tab === "netToGross") {
      setActiveTab(tab);
      setResult(null);
      setErrorMsg("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Calculator className="w-10 h-10 text-indigo-700 flex-shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Công cụ tính lương{" "}
              <span className="text-indigo-700">Gross - Net</span>
            </h1>
          </div>
          <Badge
            variant="outline"
            className="border-2 border-indigo-600 text-indigo-600 text-base py-1 px-3 mt-4 sm:mt-0"
          >
            {effectiveDate === "2025" ? "Chuẩn 2025" : "Chuẩn 2024"}
          </Badge>
        </header>

        {/* Announcement */}
        <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-12 max-w-3xl mx-auto flex items-start gap-4">
          <BadgeInfo className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-indigo-800 text-lg mb-1">
              Áp dụng quy định mới nhất
            </h2>
            <p className="text-indigo-700 text-sm max-w-xl">
              {effectiveDate === "2024"
                ? "Từ 01/07/2024 - 30/06/2025 (Nghị định số 73/2024/NĐ-CP)"
                : "Từ 01/07/2025 (Nghị định 128/2025/NĐ-CP, cập nhật mức lương cơ sở và tối thiểu vùng)"}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Calculator */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <ArrowLeftRight className="w-5 h-5 text-indigo-600" />
                  {activeTab === "grossToNet"
                    ? "Chuyển đổi lương Gross sang Net"
                    : "Chuyển đổi lương Net sang Gross"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-7">
                <Tabs
                  value={activeTab}
                  onValueChange={onChangeTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full h-auto p-1 bg-gray-100 rounded-xl">
                    <TabsTrigger
                      value="grossToNet"
                      className="py-3 px-0 text-center text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-700 data-[state=active]:rounded-lg transition-all"
                    >
                      Gross → Net
                    </TabsTrigger>
                    <TabsTrigger
                      value="netToGross"
                      className="py-3 px-0 text-center text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-700 data-[state=active]:rounded-lg transition-all"
                    >
                      Net → Gross
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-6">
                  {/* Salary Input */}
                  <div>
                    <Label
                      htmlFor="salary-input"
                      className="block mb-2 font-semibold text-gray-900 text-base"
                    >
                      {activeTab === "grossToNet" ? "Lương Gross" : "Lương Net"}{" "}
                      (VNĐ)
                    </Label>
                    <Input
                      id="salary-input"
                      type="text"
                      value={salary}
                      placeholder="VD: 15,000,000"
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setSalary(
                          rawValue
                            ? new Intl.NumberFormat("vi-VN").format(
                                parseInt(rawValue, 10)
                              )
                            : ""
                        );
                      }}
                      className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                    />
                  </div>

                  {/* Dependents & Insurance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                        onChange={(e) => setDependents(e.target.value)}
                        className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="insurance-select"
                        className="block mb-2 font-semibold text-gray-900 text-base"
                      >
                        Mức lương đóng bảo hiểm
                      </Label>
                      <Select
                        value={insuranceSalary}
                        onValueChange={(v) =>
                          setInsuranceSalary(v as InsuranceType)
                        }
                      >
                        <SelectTrigger
                          id="insurance-select"
                          className="px-4 py-3 text-lg border-2 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 rounded-xl"
                        >
                          <SelectValue placeholder="Chọn mức đóng bảo hiểm" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-xl border border-gray-300 shadow-sm">
                          <SelectItem
                            value="official"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Trên lương chính thức
                          </SelectItem>
                          <SelectItem
                            value="region"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Theo lương tối thiểu vùng
                          </SelectItem>
                          <SelectItem
                            value="cap"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Mức trần (20 lương cơ sở)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Other Income */}
                  <div>
                    <Label
                      htmlFor="other-income-input"
                      className="block mb-2 font-semibold text-gray-900 text-base"
                    >
                      Thu nhập khác (VNĐ)
                    </Label>
                    <Input
                      id="other-income-input"
                      type="text"
                      value={otherIncome}
                      placeholder="Có thể bỏ qua"
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setOtherIncome(
                          rawValue
                            ? new Intl.NumberFormat("vi-VN").format(
                                parseInt(rawValue, 10)
                              )
                            : ""
                        );
                      }}
                      className="bg-white rounded-xl border border-gray-300 shadow-sm focus-visible:ring-indigo-400 focus-visible:border-indigo-500 transition px-4 py-3 text-lg"
                    />
                  </div>

                  {/* Region & Effective Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <Label
                        htmlFor="region-select"
                        className="block mb-2 font-semibold text-gray-900 text-base"
                      >
                        Vùng lương tối thiểu
                      </Label>
                      <Select
                        value={region}
                        onValueChange={(v) => setRegion(v as RegionKey)}
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
                            Vùng I: {formatCurrency(config.minSalaries.I)}
                          </SelectItem>
                          <SelectItem
                            value="II"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Vùng II: {formatCurrency(config.minSalaries.II)}
                          </SelectItem>
                          <SelectItem
                            value="III"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Vùng III: {formatCurrency(config.minSalaries.III)}
                          </SelectItem>
                          <SelectItem
                            value="IV"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Vùng IV: {formatCurrency(config.minSalaries.IV)}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="effective-date-select"
                        className="block mb-2 font-semibold text-gray-900 text-base"
                      >
                        Thời điểm áp dụng
                      </Label>
                      <Select
                        value={effectiveDate}
                        onValueChange={(v) => {
                          setEffectiveDate(v as YearKey);
                          setResult(null);
                        }}
                      >
                        <SelectTrigger
                          id="effective-date-select"
                          className="px-4 py-3 text-lg border-2 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 rounded-xl"
                        >
                          <SelectValue placeholder="Chọn thời điểm" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-xl border border-gray-300 shadow-sm">
                          <SelectItem
                            value="2024"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Từ 01/07/2024 - 30/06/2025
                          </SelectItem>
                          <SelectItem
                            value="2025"
                            className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                          >
                            Từ 01/07/2025 (Mới nhất)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {errorMsg && (
                  <p className="mt-3 text-sm text-red-600 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  onClick={handleCalculate}
                  className="w-full py-4 text-lg font-semibold cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-400 hover:shadow-indigo-600 transition-all duration-200 rounded-xl"
                >
                  Tính lương {activeTab === "grossToNet" ? "Net" : "Gross"}
                </Button>
              </CardFooter>
            </Card>

            {/* Explanation */}
            {result && (
              <Card className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Giải thích cách tính
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700 text-sm leading-relaxed">
                  <section>
                    <h3 className="font-semibold mb-2 text-indigo-700 text-base">
                      1. Tính các khoản bảo hiểm
                    </h3>
                    <p>
                      Mức lương đóng bảo hiểm:{" "}
                      <b className="text-gray-900">
                        {formatCurrency(result.insuranceBase)}
                      </b>
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        BHXH (8%):{" "}
                        <b className="text-gray-900">
                          {formatCurrency(result.socialInsurance)}
                        </b>
                      </li>
                      <li>
                        BHYT (1.5%):{" "}
                        <b className="text-gray-900">
                          {formatCurrency(result.healthInsurance)}
                        </b>
                      </li>
                      <li>
                        BHTN (1%):{" "}
                        <b className="text-gray-900">
                          {formatCurrency(result.unemploymentInsurance)}
                        </b>
                      </li>
                      <li className="font-semibold text-gray-900">
                        Tổng bảo hiểm:{" "}
                        {formatCurrency(
                          result.socialInsurance +
                            result.healthInsurance +
                            result.unemploymentInsurance
                        )}
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold mb-2 text-indigo-700 text-base">
                      2. Tính thu nhập chịu thuế
                    </h3>
                    <p>
                      = Tổng thu nhập (
                      <b className="text-gray-900">
                        {formatCurrency(result.gross)}
                      </b>
                      ) - Bảo hiểm (
                      <b className="text-gray-900">
                        {formatCurrency(
                          result.socialInsurance +
                            result.healthInsurance +
                            result.unemploymentInsurance
                        )}
                      </b>
                      ) - Giảm trừ bản thân (
                      <b className="text-gray-900">
                        {formatCurrency(config.personalDeduction)}
                      </b>
                      ) - Giảm trừ người phụ thuộc (
                      <b className="text-gray-900">
                        {formatCurrency(
                          dependentsNum * config.dependentDeduction
                        )}
                      </b>
                      )
                    </p>
                    <p className="font-semibold mt-2 text-gray-900">
                      → Thu nhập chịu thuế:{" "}
                      {formatCurrency(result.taxableIncome)}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold mb-2 text-indigo-700 text-base">
                      3. Tính thuế thu nhập cá nhân
                    </h3>
                    <p>Biểu thuế lũy tiến từng phần:</p>
                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                      {taxRates.map((br, i) => (
                        <li key={i}>
                          {formatCurrency(br.min)}
                          {br.max !== Infinity
                            ? ` đến ${formatCurrency(br.max)}`
                            : " trở lên"}
                          : {br.rate * 100}%
                        </li>
                      ))}
                      <li className="font-semibold text-gray-900">
                        Tổng thuế: {formatCurrency(result.tax)}
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold mb-2 text-indigo-700 text-base">
                      4. Công thức tính lương Net/Gross
                    </h3>
                    <p>Lương Net = Lương Gross - Bảo hiểm - Thuế TNCN</p>
                    <p>
                      Lương Gross = (Lương Net + Bảo hiểm + Thuế TNCN) + … (quy
                      đổi ngược lại)
                    </p>
                  </section>
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            <Card className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Câu hỏi thường gặp (FAQs)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="1">
                    <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                      Lương Gross là gì?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 leading-relaxed">
                      Là tổng số tiền ghi trong hợp đồng lao động (trước khi trừ
                      bảo hiểm và thuế).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                      Lương Net là gì?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 leading-relaxed">
                      Là số tiền thực nhận cuối cùng sau khi trừ hết các khoản
                      bảo hiểm, thuế thu nhập cá nhân.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="3">
                    <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                      Bảo hiểm bắt buộc gồm những gì?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 leading-relaxed">
                      Bao gồm: BHXH (8%), BHYT (1.5%), BHTN (1%). Tính trên mức
                      lương đóng bảo hiểm.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="4">
                    <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                      Có nên deal lương Gross hay Net?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 leading-relaxed">
                      Deal Gross giúp bạn rõ mọi khoản bị trừ, minh bạch hơn.
                      Tuy nhiên, tuỳ tình huống thực tế bạn có thể deal Net
                      (thường là mức cứng bạn muốn nhận hàng tháng).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right: Result */}
          <div className="space-y-8">
            <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Kết quả tính toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="text-center py-16 text-gray-400">
                    <Info className="mx-auto mb-3 w-10 h-10" />
                    <p className="text-lg">
                      Điền thông tin và bấm{" "}
                      <b className="text-gray-500">Tính lương</b> để xem kết
                      quả!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Lương Net/Gross */}
                    <div className="bg-indigo-50 rounded-xl p-6 space-y-2">
                      <div className="flex justify-between items-center font-bold text-indigo-700 text-xl">
                        <span>
                          Lương {activeTab === "grossToNet" ? "Net" : "Gross"}:
                        </span>
                        <span>
                          {activeTab === "grossToNet"
                            ? formatCurrency(result.net)
                            : formatCurrency(result.gross)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-indigo-800 text-lg font-medium">
                        <span>
                          Lương {activeTab === "grossToNet" ? "Gross" : "Net"}:
                        </span>
                        <span>
                          {activeTab === "grossToNet"
                            ? formatCurrency(result.gross)
                            : formatCurrency(result.net)}
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Các khoản khấu trừ */}
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800 text-lg">
                        Các khoản khấu trừ:
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between text-base">
                          <span>Bảo hiểm xã hội (8%):</span>
                          <span className="font-medium">
                            -{formatCurrency(result.socialInsurance)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Bảo hiểm y tế (1.5%):</span>
                          <span className="font-medium">
                            -{formatCurrency(result.healthInsurance)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Bảo hiểm thất nghiệp (1%):</span>
                          <span className="font-medium">
                            -{formatCurrency(result.unemploymentInsurance)}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold text-indigo-700 text-base pt-2 border-t border-gray-100 mt-2">
                          <span>Tổng bảo hiểm:</span>
                          <span>
                            {formatCurrency(
                              result.socialInsurance +
                                result.healthInsurance +
                                result.unemploymentInsurance
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Thuế TNCN:</span>
                          <span className="font-medium">
                            -{formatCurrency(result.tax)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Thông tin khác */}
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800 text-lg">
                        Thông tin khác:
                      </h3>
                      <div className="space-y-3 text-gray-700 text-base">
                        <div className="flex justify-between">
                          <span>Mức đóng bảo hiểm:</span>
                          <span className="font-medium">
                            {formatCurrency(result.insuranceBase)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Giảm trừ bản thân:</span>
                          <span className="font-medium">
                            {formatCurrency(config.personalDeduction)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Giảm trừ người phụ thuộc:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              dependentsNum * config.dependentDeduction
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thu nhập chịu thuế:</span>
                          <span className="font-medium">
                            {formatCurrency(result.taxableIncome)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Latest Updates - Thiết kế theo hình */}
            <Card className="rounded-2xl py-0 shadow-md border border-gray-200 bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                  <BadgeInfo className="size-7" />
                  Cập nhật mới nhất năm 2025
                </CardTitle>
              </div>
              <CardContent className="p-0">
                {/* Lương cơ sở */}
                <div className="p-6 bg-blue-50 border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 text-lg mb-2">
                    Lương cơ sở: 2,340,000 đ/tháng
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Áp dụng từ 01/07/2024 theo{" "}
                    <strong>Nghị định 73/2024/NĐ-CP</strong>
                  </p>
                </div>

                {/* Lương tối thiểu vùng */}
                <div className="p-6 bg-green-50 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 text-lg mb-4">
                    Lương tối thiểu vùng 2025
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-700">Vùng I</div>
                      <div className="text-green-600 font-medium">
                        4,960,000 đ
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-700">
                        Vùng II
                      </div>
                      <div className="text-green-600 font-medium">
                        4,410,000 đ
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-700">
                        Vùng III
                      </div>
                      <div className="text-green-600 font-medium">
                        3,860,000 đ
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-700">
                        Vùng IV
                      </div>
                      <div className="text-green-600 font-medium">
                        3,450,000 đ
                      </div>
                    </div>
                  </div>
                  <p className="text-green-700 text-sm">
                    Từ 01/07/2025 theo <strong>Nghị định 128/2025/NĐ-CP</strong>
                  </p>
                </div>

                {/* Lưu ý quan trọng */}
                <div className="p-6 bg-amber-50 border-l-4 border-amber-500">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">
                      Lưu ý quan trọng
                    </span>
                  </div>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Kết quả tính toán chỉ mang tính tham khảo. Các khoản giảm
                    trừ có thể thay đổi theo chính sách công ty và quy định mới.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalaryCalculator;
