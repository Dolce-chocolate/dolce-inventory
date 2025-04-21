// app/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // التوجيه إلى صفحة تسجيل الدخول الموحدة
    router.replace("/unified-login");
  }, [router]);

  return null;
}
