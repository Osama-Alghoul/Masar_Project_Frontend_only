import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <>
      <Header />
      <PageBanner> </PageBanner>
      <div className="container px-4 md:px-6 py-8 animate-pulse">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card className="bg-muted-foreground"></Card>
            </div>
            <div className="md:col-span-3 bg-muted-foreground"></div>
          </div>
        </div>
      </div>
    </>
  );
}
