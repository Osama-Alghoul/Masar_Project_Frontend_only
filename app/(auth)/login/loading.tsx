import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return(
        <AuthLayout title="مرحباً" Subtitle="أدخل بياناتك لتتمكن من الدخول لحسابك">
            <Loader2 className="animate-spin" />
        </AuthLayout>
    )
}