"use client";

import { useState, useTransition } from "react";
import { RefreshCw, Info } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

interface RestoreConfirmDialogProps {
  id: string;
  name: string;                  // display name for the item
  action: (id: string) => Promise<{ error?: string; success?: boolean }>;
  triggerClassName?: string;
}

export function RestoreConfirmDialog({
  id,
  name,
  action,
  triggerClassName,
}: RestoreConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleRestore() {
    setError("");
    startTransition(async () => {
      const result = await action(id);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
        title="استرجاع"
      >
        <RefreshCw className="w-4 h-4" />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="restore-dialog-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isPending && setOpen(false)}
          />

          {/* Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center gap-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Info className="w-8 h-8 text-blue-500" />
            </div>

            {/* Text */}
            <div className="text-center">
              <h2
                id="restore-dialog-title"
                className="text-xl font-tajawal font-bold text-gray-900 mb-2"
              >
                تأكيد الاسترجاع
              </h2>
              <p className="text-sm font-cairo text-gray-500 leading-relaxed">
                هل أنت متأكد من استرجاع{" "}
                <span className="font-bold text-gray-800">"{name}"</span>؟
                <br />
                سيتم إعادة نشره وظهوره للزوار مرة أخرى.
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 font-cairo bg-red-50 rounded-xl px-4 py-2 w-full text-center">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-3 w-full mt-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 py-3 rounded-xl bg-gray-50 text-gray-700 font-tajawal font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleRestore}
                disabled={isPending}
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-tajawal font-bold hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
              >
                {isPending ? (
                  <Spinner className="w-4 h-4 text-white" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isPending ? "جارٍ الاسترجاع..." : "نعم، استرجع"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
