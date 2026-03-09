"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Lock, Mail } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white max-w-md w-full p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-dark-green text-white rounded-2xl shadow-sm mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-tajawal font-bold text-gray-900 mb-2">تسجيل الدخول للإدارة</h1>
          <p className="text-gray-500 font-cairo text-sm">أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-cairo flex items-start justify-center text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-tajawal font-bold text-gray-700">البريد الإلكتروني</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-3 pr-12 font-cairo transition-all dir-ltr text-left"
                placeholder="admin@elfayrouz-lab.com"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-tajawal font-bold text-gray-700">كلمة المرور</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-3 pr-12 font-cairo transition-all dir-ltr text-left"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary-dark-green hover:bg-[#154618] text-white font-tajawal font-bold text-lg p-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner className="w-5 h-5 text-white" /> : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400 font-cairo text-center">
            &copy; 2026 مختبر الفيروز للتحاليل الطبية
          </p>
        </div>
      </div>
    </div>
  );
}
