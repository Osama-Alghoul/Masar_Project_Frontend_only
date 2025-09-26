"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MapPin, Settings } from "lucide-react";
import Loading from "./loading";
import { CustomAlert } from "@/components/ui/customAlert";
import AdminOverviewCards from "@/components/admin/AdminOverViewCards";
import UserManagementTab from "@/components/admin/UserMangmentTab";
import StoreManagementTab from "@/components/admin/StoreManagmentTab";
import ProductManagementTab from "@/components/admin/ProductManagmentTab";
import Header from "@/components/main_layout/header";
import { UserInfo, UserData, StoreData, ProductData } from "@/types/admin";
import {
  adminUsersData,
  adminProductsData,
  adminStoresData,
} from "@/public/mock-data/logged/mock-data";

export default function AdminDashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [storeStatusFilter, setStoreStatusFilter] = useState<
    "all" | "active" | "inactive" | "pending" | "banned"
  >("all");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);

  const userRoleOptions = [
    { value: "all", label: "الكل" },
    { value: "seller", label: "بائع" },
    { value: "user", label: "مستخدم" },
  ];

  // Updated storeStatusOptions to include all statuses
  const storeStatusOptions = [
    { value: "all", label: "الكل" },
    { value: "pending", label: "قيد المراجعة" },
    { value: "active", label: "نشط" },
    { value: "inactive", label: "غير نشط" },
    { value: "banned", label: "محظور" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && (user === null || user.role !== "admin")) {
      redirect("/");
    }
  }, [user, loading]);

  async function fetchUsersData() {
    try {
      const responseData = adminUsersData.data;
      setUserData(responseData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  }

  async function fetchStoresData() {
    try {
      const responseData = adminStoresData.data;
      setStoreData(responseData);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  }

  async function fetchProductsData() {
    try {
      const responseData = adminProductsData.data;
      setProductData(responseData);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchStoresData();
    fetchUsersData();
    fetchProductsData();
    setLoading(false);
  }, []);

  async function handelUserBlock(id: number) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      setShowSuccessAlert(true);
      fetchUsersData();
    } catch (error) {
      console.error("Error fetching stores data:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  async function handelUserBan() {
    try {
      setShowSuccessAlert(true);
      fetchUsersData();
    } catch (error) {
      console.error("Error banning user:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  async function handelUserUnBan(id: number) {
    try {
      setShowSuccessAlert(true);
      fetchUsersData();
    } catch (error) {
      console.error("Error unbanning user:", error);
      setShowFailAlert(true);
    }
  }

  async function handelUserNotify(
    type: string,
    message: string,
    target: string,
    target_id: number
  ) {
    try {
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error sending notification:", error);
      setShowFailAlert(true);
    } finally {
      setLoading(false);
    }
  }

  const handelProductDelete = (id: number) => {
    fetchProductsData();
    setShowSuccessAlert(true);
  };

  const handleUsersSearch = (term: string, role: string) => {
    setSearchTerm(term);
    setUserRoleFilter(role);
  };

  const handleStoresSearch = (term: string, status: string) => {
    setSearchTerm(term);
    // Updated setStoreStatusFilter to handle all statuses
    setStoreStatusFilter(
      status as "all" | "active" | "inactive" | "pending" | "banned"
    );
  };

  const handleProductSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handelStatusUpdateStore = async () => {
    try {
      setShowSuccessAlert(true);
      fetchStoresData();
    } catch (error) {
      console.error("Error updating store status:", error);
      setShowFailAlert(true);
    }
  };

  const handelStoreDelete = async (id: number) => {
    try {
      setShowSuccessAlert(true);
      fetchStoresData();
    } catch (error) {
      console.error("Error deleting store:", error);
      setShowFailAlert(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <CustomAlert
        message="تم تحديث البيانات بنجاح"
        onClose={() => setShowSuccessAlert(false)}
        show={showSuccessAlert}
        success
      />
      <CustomAlert
        message="حدث خطأ ما"
        onClose={() => setShowFailAlert(false)}
        show={showFailAlert}
        success={false}
      />
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                لوحة التحكم للإداري
              </h1>
              <p className="text-muted-foreground">إدارة منصة مسار</p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/admin/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  إدارة الخريطة
                </Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link href="/admin/reports">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  البلاغات
                </Link>
              </Button>
            </div>
          </div>

          <AdminOverviewCards
            userCount={2}
            storeCount={3}
            productCount={2}
            servicesCount={23}
          />

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">المستخدمون</TabsTrigger>
              <TabsTrigger value="stores">المتاجر</TabsTrigger>
              <TabsTrigger value="products">البضائع</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="space-y-4">
              <UserManagementTab
                userData={userData}
                searchTerm={searchTerm}
                userRoleFilter={userRoleFilter}
                userRoleOptions={userRoleOptions}
                handleUsersSearch={handleUsersSearch}
                handelUserBan={handelUserBan}
                handelUserBlock={handelUserBlock}
                handelUserNotify={handelUserNotify}
                handelUserUnBan={handelUserUnBan}
              />
            </TabsContent>
            <TabsContent value="stores" className="space-y-4">
              <StoreManagementTab
                storeData={storeData}
                searchTerm={searchTerm}
                storeStatusFilter={storeStatusFilter}
                storeStatusOptions={storeStatusOptions}
                handleStoresSearch={handleStoresSearch}
                handelStoreStatusUpdate={handelStatusUpdateStore}
                onStoreDeleted={handelStoreDelete}
              />
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <ProductManagementTab
                productData={productData}
                searchTerm={searchTerm}
                handleProductSearch={handleProductSearch}
                onProductDeleted={handelProductDelete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
