import Header from "@/components/main_layout/header";
import PageBanner from "@/components/main_layout/PageBanner";

export default function Loading() {
  return (
    <>
      <Header />
      <PageBanner> </PageBanner>
      <div className="container animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-muted-foreground">
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:bg-[url('/BannerCard.svg')] hover:bg-no-repeat hover:bg-center hover:bg-cover transition-all duration-300 hover:shadow-md group">
            <div className="p-4 rounded-full bg-[#F5F6FF] text-primary"></div>
            <span className="text-sm font-medium text-center group-hover:text-white"></span>
            <span className="text-muted-foreground text-center group-hover:text-white"></span>
          </div>
        </div>
      </div>
    </>
  );
}
