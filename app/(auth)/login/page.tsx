"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { user_session } from "@/public/mock-data/logged/mock-data";
import { Avatar } from "@/components/ui/avatar";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (email === "user@example.com" && password === "password") {
        localStorage.setItem(
          "user_info",
          JSON.stringify(user_session.data.user)
        );
        router.push("/");
      } else if (email === "seller@example.com" && password === "password") {
        localStorage.setItem(
          "user_info",
          JSON.stringify(user_session.data.seller)
        );
        router.push("/");
      } else if (email === "admin@example.com" && password === "password") {
        localStorage.setItem(
          "user_info",
          JSON.stringify(user_session.data.admin)
        );
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err: any) {
      console.error("Error during sign-in:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="مرحباً" Subtitle="أدخل بياناتك لتتمكن من الدخول لحسابك">
      <Card className="border-border/50 shadow-lg">
        <form onSubmit={handleLogin}>
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              ادخل بياناتك لتتمكن من الدخول لحسابك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ايميل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#4bbae6] to-[#4682B4]"
              disabled={loading} // Disable button while loading
            >
              <div className="flex items-center gap-2">
                {loading ? (
                  "جاري تسجيل الدخول..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </div>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب?
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                انشاء حساب
              </Link>
            </p>
            <Card className="w-full">
              <CardHeader>حسابات تجريبية</CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-muted">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">مستخدم</p>
                    <p className="text-sm text-muted-foreground">
                      user@example.com
                    </p>
                    <p className="text-sm text-muted-foreground">password</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-muted">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">بائع</p>
                    <p className="text-sm text-muted-foreground">
                      seller@example.com
                    </p>
                    <p className="text-sm text-muted-foreground">password</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-muted">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">مدير</p>
                    <p className="text-sm text-muted-foreground">
                      admin@example.com
                    </p>
                    <p className="text-sm text-muted-foreground">password</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
