"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect, useMemo } from "react";
import Loading from "./loading";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/ui/customAlert";

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  async function fetchCategories() {
    try {
      setCategories([
        {
          id: 1,
          name: "فواكه طازجة",
          created_at: "2025-09-08T09:01:54.000000Z",
          updated_at: "2025-09-08T09:01:54.000000Z",
        },
        {
          id: 2,
          name: "خضروات ورقيات",
          created_at: "2025-09-25T10:00:00.000000Z",
          updated_at: "2025-09-25T10:00:00.000000Z",
        },
        {
          id: 3,
          name: "لحوم ودواجن",
          created_at: "2025-09-25T10:01:00.000000Z",
          updated_at: "2025-09-25T10:01:00.000000Z",
        },
        {
          id: 4,
          name: "أجبان وألبان",
          created_at: "2025-09-25T10:02:00.000000Z",
          updated_at: "2025-09-25T10:02:00.000000Z",
        },
        {
          id: 5,
          name: "مخبوزات وحلويات",
          created_at: "2025-09-26T12:45:00.000000Z",
          updated_at: "2025-09-26T12:45:00.000000Z",
        },
        {
          id: 6,
          name: "مجمدات ومعلبات",
          created_at: "2025-09-26T12:46:00.000000Z",
          updated_at: "2025-09-26T12:46:00.000000Z",
        },
        {
          id: 7,
          name: "مشروبات وعصائر",
          created_at: "2025-09-26T12:47:00.000000Z",
          updated_at: "2025-09-26T12:47:00.000000Z",
        },
        {
          id: 8,
          name: "إلكترونيات وأجهزة",
          created_at: "2025-09-26T12:55:00.000000Z",
          updated_at: "2025-09-26T12:55:00.000000Z",
        },
        {
          id: 9,
          name: "إكسسوارات وهواتف",
          created_at: "2025-09-26T12:56:00.000000Z",
          updated_at: "2025-09-26T12:56:00.000000Z",
        },
        {
          id: 10,
          name: "أدوات منزلية صغيرة",
          created_at: "2025-09-26T12:57:00.000000Z",
          updated_at: "2025-09-26T12:57:00.000000Z",
        },
      ]);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      fetchCategories();
      setNewCategoryName("");
      setMessage("اعترف انت مش ادمن عشان تضيف على راحتك!");
      setSuccess(true);
    } catch (error) {
      console.error("Error adding category:", error);
      setFailure(true);
    } finally {
      setIsAddOpen(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      fetchCategories();
      setMessage("يعني فوق ما انا تعبان فيهم بدك تحذفهم؟");
      setSuccess(true);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategoryId === null) return;
    try {
      fetchCategories();
      setUpdatedCategoryName("");
      setMessage("خليها هيك احسن خود مني");
      setSuccess(true);
    } catch (error) {
      console.error("Error updating category:", error);
      setFailure(true);
    } finally {
      setEditingCategoryId(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <PageTitle MainTitle="ادارة الفئات" Arrow />
      <CustomAlert
        message={message}
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
      <CustomAlert
        message={"حدث خطأ ما"}
        show={failure}
        onClose={() => setFailure(false)}
        success={false}
      />
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            اضافة فئة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">اسم الفئة</Label>
              <Input
                id="add-name"
                name="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="اسم الفئة الجديدة"
              />
            </div>
            <DialogFooter>
              <Button type="submit">اضافة</Button>
              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  الغاء
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="search">ابحث</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="ابحث عن فئة..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between bg-background text-foreground rounded-md p-4 shadow-md"
          >
            <span>{category.name}</span>
            <div className="flex gap-1">
              <Dialog
                open={editingCategoryId === category.id}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setEditingCategoryId(category.id);
                    setUpdatedCategoryName(category.name);
                  } else {
                    setEditingCategoryId(null);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCategoryId(category.id)}>
                    تعديل
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>تعديل الفئة "{category.name}"</DialogTitle>
                  <form onSubmit={handleUpdateCategory} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">اسم الفئة</Label>
                      <Input
                        id="edit-name"
                        name="name"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        placeholder={`${category.name}`}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">تعديل</Button>
                      <DialogClose asChild>
                        <Button type="button" variant={"outline"}>
                          الغاء
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => handleDeleteCategory(category.id)}
                variant={"destructive"}
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <p className="text-center text-gray-500 mt-4">لا توجد فئات مطابقة</p>
        )}
      </div>
    </>
  );
}
