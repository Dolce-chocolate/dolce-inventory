"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // تحويل تلقائي من الصفحة الرئيسية إلى صفحة لوحة التحكم
    router.push("/dashboard");
  }, [router]);

  return null; // لا تعرض أي شيء لأننا نحول المستخدم مباشرة
}
