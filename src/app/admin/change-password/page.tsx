"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    startTransition(async () => {
      // 1. Update the password
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) {
        setError(pwError.message);
        return;
      }

      // 2. Clear the force_password_change flag
      const { error: metaError } = await supabase.auth.updateUser({
        data: { force_password_change: false },
      });

      if (metaError) {
        console.error("Failed to clear force_password_change flag:", metaError);
      }

      // 3. Redirect to dashboard
      router.push("/admin");
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white max-w-md w-full p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-dark-green text-white rounded-2xl shadow-sm mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-tajawal font-bold text-gray-900 mb-2">تغيير كلمة المرور</h1>
          <p className="text-gray-500 font-cairo text-sm">
            هذا أول تسجيل دخول لك. يجب تغيير كلمة المرور المؤقتة قبل المتابعة.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-cairo text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-tajawal text-gray-700">
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-3 pr-12 pl-12 font-cairo transition-all"
                placeholder="8 أحرف على الأقل"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-tajawal text-gray-700">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-primary-light-green focus:border-transparent outline-none p-3 pr-12 font-cairo transition-all"
                placeholder="أعد إدخال كلمة المرور"
                dir="ltr"
              />
            </div>
          </div>

          {/* Password strength hints */}
          <ul className="text-xs font-cairo text-gray-400 space-y-1 pr-1">
            <li className={password.length >= 8 ? "text-green-600" : ""}>
              {password.length >= 8 ? "✓" : "•"} 8 أحرف على الأقل
            </li>
            <li className={password === confirm && confirm.length > 0 ? "text-green-600" : ""}>
              {password === confirm && confirm.length > 0 ? "✓" : "•"} كلمتا المرور متطابقتان
            </li>
          </ul>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-primary-dark-green hover:bg-[#154618] text-white font-tajawal font-bold text-lg p-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <Spinner className="w-5 h-5 text-white" /> : "حفظ كلمة المرور والمتابعة"}
          </button>
        </form>
      </div>
    </div>
  );
}
