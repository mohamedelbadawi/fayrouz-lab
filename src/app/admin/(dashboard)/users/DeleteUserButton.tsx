"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteUserAction } from "@/actions/users";
import toast from "react-hot-toast";

export function DeleteUserButton({ userId }: { userId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteUserAction(userId);
    setLoading(false);
    setConfirming(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("تم حذف المستخدم بنجاح");
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-2 py-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs font-cairo font-bold text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          {loading ? "جاري الحذف..." : "تأكيد"}
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-cairo text-gray-500 hover:text-gray-700"
        >
          إلغاء
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
      title="حذف المستخدم"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
