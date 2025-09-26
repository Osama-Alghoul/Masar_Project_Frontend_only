"use client";

import ReportSection from "@/components/admin/ReportSection";
import Header from "@/components/main_layout/header";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import { ReportCard } from "@/components/admin/ReportCard";
import { useEffect, useState } from "react";
import { Check, Hourglass, Clock, Trash } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import PageTitle from "@/components/main_layout/PageTitle";
import { Report } from "@/types/admin";

export default function reportsPage() {
  const [reports, setReports] = useState<Array<Report>>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Function to fetch reports from the API

  return (
    <>
      <Header />
      {loading && (
        <Alert className="fixed bottom-4 right-4 max-w-sm">
          <Loader className="animate-spin" />
          <AlertTitle>فش حاجة هنا ارتاح 👀</AlertTitle>
        </Alert>
      )}
      <PageTitle
        MainTitle="ادارة البلاغات"
        Subtitle="ادارة بلاغات منصة مسار"
        Arrow
      />
      <div className="container">
        <ReportSection title="معلقة">
          {reports.filter((report) => report.status === "pending").length ===
          0 ? (
            <Image
              src={"/admin/pending_report.svg"}
              alt="pending report"
              width={200}
              height={200}
              className={"m-auto"}
            />
          ) : (
            reports
              .filter((report) => report.status === "pending")
              .map((report) => (
                <ReportCard key={report.id} report={report}>
                  <Button variant={"ghost"} disabled={sending}>
                    <Trash className="text-red-400" />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Hourglass />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Check />
                  </Button>
                </ReportCard>
              ))
          )}
        </ReportSection>
        <ReportSection title="جار العمل عليها">
          {reports.filter((report) => report.status === "in_progress")
            .length === 0 ? (
            <Image
              src={"/admin/in_progress_report.svg"}
              alt="in_progress report"
              width={200}
              height={200}
              className={"m-auto"}
            />
          ) : (
            reports
              .filter((report) => report.status === "in_progress")
              .map((report) => (
                <ReportCard key={report.id} report={report}>
                  <Button variant={"ghost"} disabled={sending}>
                    <Trash className="text-red-400" />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Clock />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Check />
                  </Button>
                </ReportCard>
              ))
          )}
        </ReportSection>
        <ReportSection title="تم حلها">
          {reports.filter((report) => report.status === "resolved").length ===
          0 ? (
            <Image
              src={"/admin/done_report.svg"}
              alt="resolved report"
              width={200}
              height={200}
              className={"m-auto"}
            />
          ) : (
            reports
              .filter((report) => report.status === "resolved")
              .map((report) => (
                <ReportCard key={report.id} report={report}>
                  <Button variant={"ghost"} disabled={sending}>
                    <Trash className="text-red-400" />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Clock />
                  </Button>
                  <Button variant={"ghost"} disabled={sending}>
                    <Hourglass />
                  </Button>
                </ReportCard>
              ))
          )}
        </ReportSection>
      </div>
    </>
  );
}
