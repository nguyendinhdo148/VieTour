import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react"; 

const filteredData = [
  {
    label: "Khu vực",
    filterType: "location",
    array: [
      "Hà Nội",
      "Hồ Chí Minh",
      "Đà Nẵng",
      "Quảng Ninh",
      "Cần Thơ",
      "Thái Bình",
      "Hải Phòng",
    ],
  },
  {
    label: "Danh mục",
    filterType: "jobType",
    array: [
      "Nhà hàng",
      "Cà phê",
      "Quán ăn",
      "Quán cơm",
    ],
  },
  {
    label: "Mức giá",
    filterType: "salary",
    array: [
      "0 - 100.000",
      "100.000 - 300.000",
      "300.000 - 500.000",
      "> 500.000",
    ],
  },
];

const FilterCard = ({
  filters,
  onFilterChange,
  onResetFilters,
  onSearchChange,
}: {
  filters: {
    location: string[];
    jobType: string[];
    salary: string[];
  };
  onFilterChange: (type: string, value: string) => void;
  onResetFilters: () => void;
  onSearchChange: (text: string) => void;
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-sm text-gray-800">Lọc Thực đơn</h1>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-all cursor-pointer"
        >
          <Trash2 size={14} />
          Xóa bộ lọc
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm tên món, ưu đãi..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filteredData.map((section, index) => (
        <div key={index} className="mt-4">
          <h2 className="font-medium text-base text-gray-700 mb-2 border-b pb-1">
            {section.label}
          </h2>
          <div className="grid grid-cols-1 gap-y-2">
            {section.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  id={`${section.filterType}-${item}`}
                  checked={
                    filters[section.filterType as keyof typeof filters].includes(item)
                  }
                  onCheckedChange={() =>
                    onFilterChange(section.filterType, item)
                  }
                />
                <Label
                  htmlFor={`${section.filterType}-${item}`}
                  className="cursor-pointer text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;