import type React from "react";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import {
  Calculator,
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  PieChart,
  PiggyBank,
} from "lucide-react";
import Footer from "../Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SavingPlan = () => {
  const [targetAmount, setTargetAmount] = useState(100000000);
  const [initialInvestment, setInitialInvestment] = useState(10000000);
  const [years, setYears] = useState(1);
  const [interestRate, setInterestRate] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState("yearly");
  const [requiredMonthlySaving, setRequiredMonthlySaving] = useState(0);

  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  // Format number with dots as thousand separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle input change with formatting
  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let numericValue = value.replace(/[^\d]/g, "");
    numericValue = numericValue.replace(/^0+/, "");
    if (numericValue === "") numericValue = "0";
    setter(Number(numericValue));
  };

  // Format value for display
  const formatDisplayValue = (value: number) => {
    return formatNumber(value);
  };

  // Calculate required monthly savings to reach target
  const calculateRequiredSavings = () => {
    const A = targetAmount;
    const P = initialInvestment; // Initial investment
    const r = interestRate / 100; // Annual interest rate (decimal)
    const t = years; // Number of years

    // Number of compounding periods per year
    const n =
      compoundingFrequency === "daily"
        ? 365
        : compoundingFrequency === "monthly"
        ? 12
        : compoundingFrequency === "quarterly"
        ? 4
        : 1; // yearly

    // 1) Future value of initial investment with compound interest
    const fvP = P * Math.pow(1 + r / n, n * t);

    // 2) Effective monthly interest rate
    const i_m = Math.pow(1 + r / n, n / 12) - 1;

    const m = 12 * t; // total number of months
    let PMT = 0;

    if (A <= fvP) {
      PMT = 0;
    } else if (i_m === 0) {
      PMT = (A - fvP) / m;
    } else {
      const factor = (Math.pow(1 + i_m, m) - 1) / i_m;
      PMT = (A - fvP) / factor;
    }

    PMT = Math.max(0, PMT);

    // === CHART DATA ===
    const labels = Array.from({ length: t + 1 }, (_, i) => `Năm ${i}`);

    let balance = P;
    const principalData: number[] = [P]; // Initial investment + interest (no contributions)
    const interestData: number[] = [0]; // Interest earned
    const totalData: number[] = [P]; // Total value (initial + contributions + interest)
    const contributionsData: number[] = [0]; // Total contributions

    for (let year = 1; year <= t; year++) {
      let yearlyContributions = 0;

      for (let month = 1; month <= 12; month++) {
        const monthlyInterest = balance * i_m;
        balance = balance + monthlyInterest + PMT;
        yearlyContributions += PMT;
      }

      principalData.push(P * Math.pow(1 + r / n, n * year));
      interestData.push(balance - P - yearlyContributions * year);
      totalData.push(balance);
      contributionsData.push(yearlyContributions * year);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Vốn ban đầu + lãi",
          data: principalData,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.3,
        },
        {
          label: "Tiền lãi từ góp hàng tháng",
          data: interestData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
        {
          label: "Tổng giá trị",
          data: totalData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
      ],
    });

    return Math.round(PMT);
  };

  useEffect(() => {
    const PMT = calculateRequiredSavings();
    setRequiredMonthlySaving(PMT);
  }, [
    targetAmount,
    initialInvestment,
    years,
    interestRate,
    compoundingFrequency,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%2306b6d4 fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl backdrop-blur-sm border border-emerald-200/50 shadow-xl hover:scale-105 transition-transform duration-300">
                <PiggyBank className="w-16 h-16 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Công cụ lập kế hoạch tiết kiệm
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
              Ứng dụng lãi suất kép để xây dựng kế hoạch tiết kiệm dựa trên mục
              tiêu và số năm tích lũy một cách chính xác
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3 text-base bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-slate-700">
                  Tính toán chính xác
                </span>
              </div>
              <div className="flex items-center gap-3 text-base bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-teal-200/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <Target className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-slate-700">
                  Mục tiêu rõ ràng
                </span>
              </div>
              <div className="flex items-center gap-3 text-base bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-200/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <PieChart className="w-5 h-5 text-cyan-600" />
                <span className="font-semibold text-slate-700">
                  Biểu đồ trực quan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Nhập thông tin
              </h2>
            </div>

            <div className="space-y-10">
              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    1
                  </div>
                  <h3 className="font-bold text-xl text-emerald-700">
                    Mục tiêu tiết kiệm
                  </h3>
                </div>
                <div className="pl-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Mục tiêu tiết kiệm (VNĐ)
                  </label>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Số tiền tiết kiệm cuối cùng mong muốn.
                  </p>
                  <input
                    type="text"
                    value={formatDisplayValue(targetAmount)}
                    onChange={(e) =>
                      handleInputChange(e.target.value, setTargetAmount)
                    }
                    className="w-full p-5 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold hover:border-emerald-300 hover:bg-white"
                    placeholder="100.000.000"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    2
                  </div>
                  <h3 className="font-bold text-xl text-teal-700">
                    Khoản đầu tư ban đầu
                  </h3>
                </div>
                <div className="pl-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Số tiền ban đầu (VNĐ)
                  </label>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Khoản tiền đầu tư lúc ban đầu bạn có.
                  </p>
                  <input
                    type="text"
                    value={formatDisplayValue(initialInvestment)}
                    onChange={(e) =>
                      handleInputChange(e.target.value, setInitialInvestment)
                    }
                    className="w-full p-5 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-lg font-semibold hover:border-teal-300 hover:bg-white"
                    placeholder="10.000.000"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    3
                  </div>
                  <h3 className="font-bold text-xl text-cyan-700">
                    Khoảng thời gian ước tính
                  </h3>
                </div>
                <div className="pl-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Thời gian tiết kiệm (Năm)
                  </label>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Khoảng thời gian, tính bằng năm, mà bạn dự định tiết kiệm.
                  </p>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full p-5 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-300 text-lg font-semibold hover:border-cyan-300 hover:bg-white"
                    min="1"
                    max="50"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    4
                  </div>
                  <h3 className="font-bold text-xl text-blue-700">Lãi suất</h3>
                </div>
                <div className="pl-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Lãi suất (%)
                  </label>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Lãi suất ước tính theo kỳ hạn gửi của bạn.
                  </p>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-5 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-semibold hover:border-blue-300 hover:bg-white"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    5
                  </div>
                  <h3 className="font-bold text-xl text-indigo-700">Kỳ hạn</h3>
                </div>
                <div className="pl-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Định kỳ gửi
                  </label>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Kỳ hạn nhận lãi tiền gửi của bạn.
                  </p>
                  <Select
                    value={compoundingFrequency}
                    onValueChange={(value) => setCompoundingFrequency(value)}
                  >
                    <SelectTrigger className="w-full px-4 py-3 text-lg border-2 border-slate-200 hover:border-indigo-300 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 rounded-xl bg-slate-50/50 hover:bg-white">
                      <SelectValue placeholder="Chọn định kỳ gửi" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border border-slate-300 shadow-lg">
                      <SelectItem
                        value="daily"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 transition-colors duration-200 rounded-lg text-lg py-3"
                      >
                        Hàng ngày
                      </SelectItem>
                      <SelectItem
                        value="monthly"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 transition-colors duration-200 rounded-lg text-lg py-3"
                      >
                        Hàng tháng
                      </SelectItem>
                      <SelectItem
                        value="quarterly"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 transition-colors duration-200 rounded-lg text-lg py-3"
                      >
                        Hàng quý
                      </SelectItem>
                      <SelectItem
                        value="yearly"
                        className="hover:bg-indigo-50 focus:bg-indigo-50 transition-colors duration-200 rounded-lg text-lg py-3"
                      >
                        Hàng năm
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Kết quả</h2>
            </div>

            <div className="space-y-8">
              <div className="relative p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border-2 border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-6 right-6">
                  <Clock className="w-6 h-6 text-emerald-600/60" />
                </div>
                <p className="text-base text-slate-700 mb-6 leading-relaxed">
                  Để đạt được{" "}
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                    {formatNumber(targetAmount)} VNĐ
                  </span>{" "}
                  sau {years} năm với vốn đầu tư ban đầu{" "}
                  <span className="font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded-lg">
                    {formatNumber(initialInvestment)} VNĐ
                  </span>
                  và mức lãi suất kỳ vọng{" "}
                  <span className="font-bold text-cyan-700 bg-cyan-100 px-2 py-1 rounded-lg">
                    {interestRate}%/năm
                  </span>{" "}
                  thì bạn cần tiết kiệm:
                </p>
                <div className="text-center py-8 bg-white/60 rounded-xl border border-emerald-200/30">
                  <div className="text-3xl md:text-4xl font-black text-emerald-700 mb-3">
                    {formatNumber(requiredMonthlySaving)} VNĐ
                  </div>
                  <div className="text-xl text-teal-600 font-bold">
                    mỗi tháng
                  </div>
                </div>
                <p className="text-sm text-slate-500 text-center mt-4">
                  Tần suất ghép lãi:{" "}
                  <span className="font-semibold text-slate-700">
                    {compoundingFrequency === "yearly"
                      ? "hàng năm"
                      : compoundingFrequency === "quarterly"
                      ? "hàng quý"
                      : compoundingFrequency === "monthly"
                      ? "hàng tháng"
                      : "hàng ngày"}
                  </span>
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-8 border-2 border-slate-200/50 shadow-lg">
                <h3 className="font-bold mb-6 text-slate-800 flex items-center gap-3 text-lg">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Chi tiết theo năm
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">
                          Năm
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">
                          Vốn ban đầu + lãi
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">
                          Tổng giá trị
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">
                          Tổng tiền bổ sung
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {chartData.labels?.map((label, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50/50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                            {String(label)}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                            {formatNumber(
                              Math.round(
                                (chartData.datasets[0]?.data[
                                  index
                                ] as number) || 0
                              )
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm font-bold text-emerald-700">
                            {formatNumber(
                              Math.round(
                                (chartData.datasets[2]?.data[
                                  index
                                ] as number) || 0
                              )
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-teal-600 font-medium">
                            {index === 0
                              ? "0"
                              : formatNumber(
                                  Math.round(
                                    ((chartData.datasets[2]?.data[
                                      index
                                    ] as number) || 0) -
                                      ((chartData.datasets[0]?.data[
                                        index
                                      ] as number) || 0)
                                  )
                                )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-indigo-200/50 shadow-lg">
                <h3 className="font-bold mb-4 text-slate-800 flex items-center gap-3 text-lg">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  Công thức tính
                </h3>
                <div className="bg-white/80 rounded-xl p-6 mb-4 border border-indigo-200/30">
                  <p className="text-base text-slate-800 font-mono font-semibold">
                    PMT = (A - P × (1 + r/n)<sup>n×t</sup>) / [((1 + i)
                    <sup>12t</sup> - 1) / i]
                  </p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Trong đó: A = Số tiền mục tiêu, P = Số tiền ban đầu, r = Lãi
                  suất năm, t = Thời gian (năm), n = Số lần ghép lãi/năm, i =
                  Lãi suất hiệu dụng theo tháng = (1 + r/n)<sup>n/12</sup> - 1
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Biểu đồ tăng trưởng theo thời gian
            </h2>
          </div>
          <div className="h-96 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 border-2 border-slate-200/50">
            <Line
              data={{
                ...chartData,
                datasets: chartData.datasets.map((dataset, index) => ({
                  ...dataset,
                  borderColor:
                    index === 0
                      ? "rgb(16, 185, 129)"
                      : index === 1
                      ? "rgb(6, 182, 212)"
                      : "rgb(59, 130, 246)",
                  backgroundColor:
                    index === 0
                      ? "rgba(16, 185, 129, 0.1)"
                      : index === 1
                      ? "rgba(6, 182, 212, 0.1)"
                      : "rgba(59, 130, 246, 0.1)",
                  borderWidth: 4,
                  pointRadius: 8,
                  pointHoverRadius: 12,
                  pointBackgroundColor: "white",
                  pointBorderWidth: 3,
                })),
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => formatNumber(Number(value)),
                      color: "#475569",
                      font: {
                        size: 12,
                        weight: 600,
                      },
                    },
                    grid: {
                      color: "rgba(148, 163, 184, 0.2)",
                      lineWidth: 1,
                    },
                  },
                  x: {
                    ticks: {
                      color: "#475569",
                      font: {
                        size: 12,
                        weight: 600,
                      },
                    },
                    grid: {
                      color: "rgba(148, 163, 184, 0.2)",
                      lineWidth: 1,
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        let label = context.dataset.label || "";
                        if (label) {
                          label += ": ";
                        }
                        label += formatNumber(Number(context.raw));
                        return label + " VNĐ";
                      },
                    },
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#10b981",
                    borderWidth: 2,
                    cornerRadius: 12,
                    padding: 12,
                  },
                  legend: {
                    position: "top",
                    labels: {
                      color: "#334155",
                      usePointStyle: true,
                      padding: 24,
                      font: {
                        size: 14,
                        weight: 600,
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: "Tăng trưởng tiết kiệm theo thời gian",
                    color: "#1e293b",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                    padding: 20,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Lời khuyên dành cho bạn: Nên tiết kiệm bao nhiêu mỗi tháng ?
            </h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-8 mb-8 border-2 border-emerald-200/50 shadow-lg">
              <p className="text-slate-700 leading-relaxed mb-0 text-base">
                Một trong những phương pháp quản lý ngân sách được các chuyên
                gia tài chính đề xuất là phương pháp{" "}
                <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                  50-30-20
                </span>
                . Nguyên tắc 50-30-20 sẽ phân chia thu nhập của bạn vào 3 nhóm
                chính, với tỷ lệ 50% - 30% - 20%. Trong đó,{" "}
                <span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                  50% thu nhập
                </span>{" "}
                nên dành cho các khoản cần thiết như tiền nhà, tiền ăn,...{" "}
                <span className="font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-lg">
                  30% thu nhập
                </span>{" "}
                nên được chi tiêu cho nhu cầu cá nhân như học tập, sở thích,...
                Còn{" "}
                <span className="font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded-lg">
                  20% còn lại
                </span>{" "}
                nên được dành cho tiết kiệm hoặc đầu tư cho tương lai.
              </p>
            </div>

            <h3 className="font-bold mb-6 mt-8 text-slate-800 flex items-center gap-3 text-xl">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              Một số cách tiết kiệm / đầu tư mà bạn có thể tham khảo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                "Tiết kiệm bằng cách 'Trả cho mình trước' - Pay yourself first",
                "Gửi tiết kiệm ngân hàng",
                "Đầu tư chứng khoán, vàng, bất động sản",
                "Tham gia bảo hiểm nhân thọ",
                "Kiểm tra tình trạng 'sức khỏe tài chính' định kỳ",
                "Tự do tài chính bắt đầu từ hôm nay",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/50"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                  <span className="text-slate-700 text-base font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200/50 shadow-lg">
              <p className="font-medium text-base text-slate-800 mb-0 text-center">
                Và quan trọng, thương vụ đầu tư hời nhất chính là đầu tư vào bản
                thân mình!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavingPlan;
