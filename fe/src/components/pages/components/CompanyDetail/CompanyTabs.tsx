/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, PartyPopper } from "lucide-react";
import CompanyOverview from "./CompanyOverview";
import CompanyJobs from "./CompanyJobs";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";

// ==========================================================
// ĐỊNH NGHĨA PROPS 
// ==========================================================
interface CompanyTabsProps {
  company: Company | any; 
  jobs: Job[];
  isJobsLoading: boolean;
  onOpenReviewModal: (review?: any) => void;
  onDeleteReview: (reviewId: string) => Promise<void>;
  onOpenBookingModal: () => void; // THÊM PROP NÀY ĐỂ XỬ LÝ ĐẶT BÀN
  user: any; 
}

// ==========================================================
// MAIN COMPONENT: CompanyTabs
// ==========================================================
const CompanyTabs = ({ 
  company, 
  jobs, 
  isJobsLoading, 
  onOpenReviewModal, 
  onDeleteReview, 
  onOpenBookingModal, // NHẬN PROP TỪ CHA
  user 
}: CompanyTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="shadow-xl py-0 border-0 bg-white/95 backdrop-blur-xl mb-8 rounded-3xl overflow-hidden">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          <TabsList className="grid w-full grid-cols-2 bg-gray-50/80 gap-x-3 p-4 border-b border-gray-100">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-600 text-gray-600 font-bold py-3.5 data-[state=active]:shadow-sm rounded-xl transition-all flex items-center justify-center"
            >
              <Building className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Tổng quan</span>
            </TabsTrigger>

            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-600 text-gray-600 font-bold py-3.5 data-[state=active]:shadow-sm rounded-xl transition-all flex items-center justify-center"
            >
              <PartyPopper className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Chương trình & Sự kiện</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            {/* Truyền các props Đánh giá và Đặt bàn xuống CompanyOverview */}
            <CompanyOverview 
              company={company} 
              jobs={jobs} 
              user={user}
              onOpenReviewModal={onOpenReviewModal}
              onDeleteReview={onDeleteReview}
              onOpenBookingModal={onOpenBookingModal} // TRUYỀN PROP XUỐNG ĐÂY
            />
          </TabsContent>

          <TabsContent value="jobs" className="mt-0">
            <CompanyJobs jobs={jobs} isJobsLoading={isJobsLoading} />
          </TabsContent>
          
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompanyTabs;