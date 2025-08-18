import { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  DollarSign,
  PiggyBank,
  Calendar,
  Percent,
  RotateCcw,
  Lightbulb,
  Calculator,
  CheckCircle,
  FileText,
  Wallet,
  TrendingUp,
  Scale,
  Clock,
  Target,
  BarChart3,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
} from "lucide-react";
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
import Navbar from "../shared/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState(10000000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000000);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState("yearly");

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
    // Remove all non-digit characters
    let numericValue = value.replace(/[^\d]/g, "");

    // Remove leading zeros
    numericValue = numericValue.replace(/^0+/, "");

    // If empty, set to 0
    if (numericValue === "") numericValue = "0";

    // Update state with numeric value
    setter(Number(numericValue));
  };

  // Format value for display
  const formatDisplayValue = (value: number) => {
    return formatNumber(value);
  };

  // Calculate compound interest and generate chart data
  const calculateCompoundInterest = useCallback(() => {
    const P = principal;
    const r = interestRate / 100;
    const t = years;
    let n = 1;
    switch (compoundingFrequency) {
      case "daily":
        n = 365;
        break;
      case "monthly":
        n = 12;
        break;
      case "quarterly":
        n = 4;
        break;
      case "yearly":
        n = 1;
        break;
      default:
        n = 1;
    }
    const PMT = monthlyContribution;

    // Calculate values for each year
    const labels = Array.from({ length: t + 1 }, (_, i) => i);

    let balance = P;
    const principalData: number[] = [];
    const contributionData: number[] = [];
    const totalData: number[] = [];

    const i_month = Math.pow(1 + r / n, n / 12) - 1;

    for (let year = 0; year <= t; year++) {
      if (year > 0) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + i_month) + PMT; // lãi + đóng góp cuối kỳ
        }
      }

      const totalContributions = P + PMT * 12 * year;

      principalData.push(P);
      contributionData.push(totalContributions - P);
      totalData.push(balance);
    }

    // Prepare chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Tiền gốc",
          data: principalData,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Tiền lãi",
          data: contributionData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Tổng giá trị",
          data: totalData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });

    const finalTotal = totalData[totalData.length - 1];
    const interestEarned = finalTotal - (P + PMT * 12 * t);

    return {
      total: Math.round(finalTotal),
      interestEarned: Math.round(interestEarned),
      contributions: P + PMT * 12 * t,
    };
  }, [
    principal,
    monthlyContribution,
    years,
    interestRate,
    compoundingFrequency,
  ]);

  const [result, setResult] = useState({
    total: 0,
    interestEarned: 0,
    contributions: 0,
  });

  useEffect(() => {
    const calc = calculateCompoundInterest();
    setResult(calc);
  }, [calculateCompoundInterest]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-indigo-800">
            Công cụ tính Lãi Kép
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Khám phá sức mạnh của lãi suất kép - "Kỳ quan thứ 8 của thế giới"
            theo Einstein. Tính toán và dự báo sự tăng trưởng tài sản của bạn
            một cách chính xác và miễn phí.
          </p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            Ví dụ thực tế
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                Sinh viên mới ra trường
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Tiền gốc: 10 triệu VNĐ</li>
                <li>• Gửi thêm: 2 triệu/tháng</li>
                <li>• Lãi suất: 8%/năm</li>
                <li>• Thời gian: 10 năm</li>
                <li className="font-semibold">→ Kết quả: ~400 triệu VNĐ</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                Người đi làm 5 năm
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tiền gốc: 50 triệu VNĐ</li>
                <li>• Gửi thêm: 5 triệu/tháng</li>
                <li>• Lãi suất: 10%/năm</li>
                <li>• Thời gian: 15 năm</li>
                <li className="font-semibold">→ Kết quả: ~1.8 tỷ VNĐ</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">
                Chuẩn bị hưu trí
              </h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Tiền gốc: 100 triệu VNĐ</li>
                <li>• Gửi thêm: 10 triệu/tháng</li>
                <li>• Lãi suất: 12%/năm</li>
                <li>• Thời gian: 20 năm</li>
                <li className="font-semibold">→ Kết quả: ~8.9 tỷ VNĐ</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700 flex items-center">
              <div className="size-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <Calculator className="size-5 text-white" />
              </div>
              Nhập thông tin của bạn
            </h2>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="size-5 bg-green-800 rounded-full flex items-center justify-center mr-2">
                  <DollarSign className="size-4 text-white" />
                </div>
                Số tiền gốc ban đầu (VNĐ)
              </label>
              <input
                type="text"
                value={formatDisplayValue(principal)}
                onChange={(e) =>
                  handleInputChange(e.target.value, setPrincipal)
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Ví dụ: 10.000.000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Số tiền bạn có sẵn để đầu tư ngay bây giờ
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <PiggyBank className="size-4 text-white" />
                </div>
                Số tiền gửi mỗi tháng (VNĐ)
              </label>
              <input
                type="text"
                value={formatDisplayValue(monthlyContribution)}
                onChange={(e) =>
                  handleInputChange(e.target.value, setMonthlyContribution)
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Ví dụ: 2.000.000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Số tiền bạn có thể tiết kiệm thêm mỗi tháng
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="size-5 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                  <Calendar className="size-4 text-white" />
                </div>
                Thời gian gửi (Năm)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value > 50) value = 50; // max 50
                  if (value < 1) value = 1; // min 1
                  setYears(value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min="1"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Thời gian bạn dự định đầu tư (1-50 năm)
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="size-5 bg-purple-300 rounded-full flex items-center justify-center mr-2">
                  <Percent className="size-4" />
                </div>
                Lãi suất kỳ vọng (%/năm)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value > 30) value = 30; // max 30
                  if (value < 0) value = 0; // min 0
                  setInterestRate(value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min="0"
                max="30"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tham khảo: Tiết kiệm ngân hàng 4-6%, Trái phiếu 7-9%, Cổ phiếu
                10-15%
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="size-5 bg-teal-500 rounded-full flex items-center justify-center mr-2">
                  <RotateCcw className="size-4 text-white" />
                </div>
                Tần suất ghép lãi
              </label>
              <div>
                <Select
                  value={compoundingFrequency}
                  onValueChange={setCompoundingFrequency}
                >
                  <SelectTrigger className="w-full px-4 py-3 border-2 border-slate-300 hover:border-slate-400 transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Chọn tần suất ghép lãi" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl border border-slate-300 shadow-lg">
                    <SelectItem
                      value="daily"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Hàng ngày (365 lần/năm)
                    </SelectItem>
                    <SelectItem
                      value="monthly"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Hàng tháng (12 lần/năm)
                    </SelectItem>
                    <SelectItem
                      value="quarterly"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Hàng quý (4 lần/năm)
                    </SelectItem>
                    <SelectItem
                      value="yearly"
                      className="hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      Hàng năm (1 lần/năm)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tần suất lãi được cộng vào gốc để tính lãi kỳ tiếp theo
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700 flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Kết quả dự báo
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                <p className="text-sm opacity-90 mb-1 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Tổng giá trị tài sản cuối kỳ
                </p>
                <p className="text-3xl font-bold">
                  {formatNumber(result.total)} VNĐ
                </p>
                <p className="text-sm opacity-90 mt-2">
                  Sau {years} năm đầu tư kiên trì
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 mb-1 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Lãi kiếm được
                  </p>
                  <p className="text-xl font-bold text-green-700">
                    {formatNumber(result.interestEarned)} VNĐ
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-600 mb-1 flex items-center">
                    <Wallet className="w-4 h-4 mr-2" />
                    Tiền bạn bỏ ra
                  </p>
                  <p className="text-xl font-bold text-yellow-700">
                    {formatNumber(result.contributions)} VNĐ
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600 mb-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Tỷ suất sinh lời (ROI)
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {result.contributions > 0
                    ? `${(
                        (result.interestEarned / result.contributions) *
                        100
                      ).toFixed(1)}%`
                    : "0%"}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Lãi kiếm được / Tổng tiền đầu tư × 100%
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-800 flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Công thức tính lãi kép
              </h3>
              <div className="bg-white p-3 rounded border border-gray-200 text-center">
                <p className="text-sm font-mono text-gray-700 mb-2">
                  F<sub>n</sub> = P × (1 + r/n)<sup>n×t</sup> + PMT × [(1 + r/n)
                  <sup>n×t</sup> - 1] / (r/n)
                </p>
              </div>
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <p>
                  <strong>
                    F<sub>n</sub>:
                  </strong>{" "}
                  Giá trị cuối kỳ
                </p>
                <p>
                  <strong>P:</strong> Số tiền gốc ban đầu
                </p>
                <p>
                  <strong>r:</strong> Lãi suất năm (dạng thập phân)
                </p>
                <p>
                  <strong>n:</strong> Số lần ghép lãi trong năm
                </p>
                <p>
                  <strong>t:</strong> Số năm đầu tư
                </p>
                <p>
                  <strong>PMT:</strong> Số tiền gửi định kỳ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-indigo-700 flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            Biểu đồ tăng trưởng tài sản theo thời gian
          </h2>
          <div className="h-96">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => formatNumber(Number(value)) + " VNĐ",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Năm",
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
                        label += formatNumber(Number(context.raw)) + " VNĐ";
                        return label;
                      },
                    },
                  },
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Sự tăng trưởng kỳ diệu của lãi kép qua thời gian",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
              <Scale className="w-5 h-5 text-white" />
            </div>
            So sánh: Lãi đơn vs Lãi kép
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2" />
                Lãi đơn (Simple Interest)
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Lãi chỉ được tính trên số tiền gốc ban đầu, không được cộng dồn.
              </p>
              <div className="bg-white p-4 rounded border border-gray-300">
                <p className="text-sm font-mono text-center">Lãi = P × r × t</p>
                <p className="text-xs text-gray-600 text-center mt-2">
                  Ví dụ: 100 triệu × 8% × 10 năm = 180 triệu
                </p>
              </div>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Lãi kép (Compound Interest)
              </h3>
              <p className="text-sm text-green-700 mb-4">
                Lãi được cộng vào gốc và tiếp tục sinh lãi, tạo hiệu ứng "tuyết
                lăn".
              </p>
              <div className="bg-white p-4 rounded border border-gray-300">
                <p className="text-sm font-mono text-center">
                  F = P × (1 + r)<sup>t</sup>
                </p>
                <p className="text-xs text-gray-600 text-center mt-2">
                  Ví dụ: 100 triệu × (1.08)<sup>10</sup> = 216 triệu
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-center text-blue-800 font-semibold flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Chênh lệch: 36 triệu VNĐ chỉ với 100 triệu gốc trong 10 năm!
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            Bí quyết tận dụng sức mạnh lãi kép
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-3">Bắt đầu sớm</h3>
              <p className="text-sm text-blue-700">
                Thời gian là yếu tố quan trọng nhất. Bắt đầu đầu tư từ 20 tuổi
                sẽ có lợi thế khổng lồ so với 30 tuổi.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-green-800 mb-3">
                Kiên trì đều đặn
              </h3>
              <p className="text-sm text-green-700">
                Gửi tiết kiệm đều đặn mỗi tháng, dù chỉ 1-2 triệu. Tính kỷ luật
                quan trọng hơn số tiền lớn.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-3">
                Chọn lãi suất tốt
              </h3>
              <p className="text-sm text-purple-700">
                So sánh nhiều kênh đầu tư. Chênh lệch 2-3% lãi suất có thể tạo
                ra hàng trăm triệu sau 20 năm.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Lời khuyên từ các chuyên gia
            </h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Warren Buffett:</strong> "Sự giàu có của tôi kết hợp
                  từ cuộc sống tại Mỹ, gen tốt và Lãi suất kép"
                </span>
              </p>
              <p className="flex items-start">
                <Lightbulb className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Einstein:</strong> "Lãi kép là kỳ quan thứ 8 của thế
                  giới. Ai hiểu được nó sẽ kiếm tiền, ai không hiểu sẽ phải trả
                  giá"
                </span>
              </p>
              <p className="flex items-start">
                <TrendingUp className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Quy tắc 72:</strong> Chia 72 cho lãi suất để biết bao
                  lâu tiền của bạn tăng gấp đôi. VD: 72÷8% = 9 năm
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            Câu hỏi thường gặp
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Lãi suất bao nhiêu là hợp lý?
              </h3>
              <p className="text-sm text-gray-600">
                • <strong>Tiết kiệm ngân hàng:</strong> 4-6%/năm (an toàn, thanh
                khoản cao)
                <br />• <strong>Trái phiếu chính phủ:</strong> 6-8%/năm (rủi ro
                thấp)
                <br />• <strong>Quỹ đầu tư:</strong> 8-12%/năm (rủi ro trung
                bình)
                <br />• <strong>Cổ phiếu:</strong> 10-15%/năm (rủi ro cao, tiềm
                năng lớn)
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Tôi nên bắt đầu với số tiền bao nhiêu?
              </h3>
              <p className="text-sm text-gray-600">
                Không cần số tiền lớn để bắt đầu. Quan trọng là tính đều đặn.
                Bạn có thể bắt đầu với 500.000 - 1.000.000 VNĐ/tháng và tăng dần
                theo thu nhập.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Tại sao ghép lãi hàng ngày tốt hơn hàng năm?
              </h3>
              <p className="text-sm text-gray-600">
                Ghép lãi càng thường xuyên, lãi được cộng vào gốc càng sớm để
                sinh lãi mới. Tuy nhiên, chênh lệch giữa ghép lãi hàng ngày và
                hàng tháng không đáng kể với lãi suất thông thường.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Có rủi ro gì khi đầu tư dài hạn?
              </h3>
              <p className="text-sm text-gray-600">
                • <strong>Rủi ro lạm phát:</strong> Tiền mất giá theo thời gian
                <br />• <strong>Rủi ro thanh khoản:</strong> Khó rút tiền khi
                cần gấp
                <br />• <strong>Rủi ro thị trường:</strong> Giá trị đầu tư có
                thể giảm
                <br />
                <em>
                  Khuyến nghị: Đa dạng hóa danh mục và chỉ đầu tư tiền nhàn rỗi
                </em>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600 text-center flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            <span>
              <strong>Lưu ý:</strong> Công cụ này chỉ mang tính chất tham khảo.
              Kết quả thực tế có thể khác do biến động lãi suất, lạm phát và các
              yếu tố kinh tế khác. Hãy tham khảo ý kiến chuyên gia tài chính
              trước khi đưa ra quyết định đầu tư.
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompoundInterest;
