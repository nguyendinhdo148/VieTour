import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Briefcase, Camera } from "lucide-react";
import CompanyOverview from "./CompanyOverview";
import CompanyJobs from "./CompanyJobs";
import CompanyPhotos from "./CompanyPhotos";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";

interface CompanyTabsProps {
  company: Company;
  jobs: Job[];
  isJobsLoading: boolean;
}

const CompanyTabs = ({ company, jobs, isJobsLoading }: CompanyTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl mb-8">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50/80 p-2 rounded-t-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <Building className="w-4 h-4 mr-2" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Việc làm
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <Camera className="w-4 h-4 mr-2" />
              Hình ảnh
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CompanyOverview company={company} jobs={jobs} />
          </TabsContent>

          <TabsContent value="jobs">
            <CompanyJobs jobs={jobs} isJobsLoading={isJobsLoading} />
          </TabsContent>

          <TabsContent value="photos">
            <CompanyPhotos />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompanyTabs;
