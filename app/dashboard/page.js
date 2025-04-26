<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dolce Chocolate</title>
  <style>
    body {
      background: linear-gradient(145deg, #3B2A1A, #5A3F28);
      margin: 0;
      padding: 20px;
      font-family: 'Cairo', sans-serif;
      text-align: center;
      color: gold;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 40px;
      text-shadow: 0 0 8px gold;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      justify-items: center;
      align-items: center;
      max-width: 900px;
      margin: auto;
    }

    .button {
      background-color: #3B2A1A;
      border-radius: 20px;
      padding: 20px;
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 8px #000;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .button img {
      width: 80px;
      height: 80px;
      margin-bottom: 10px;
      object-fit: contain;
    }

    .button:hover {
      box-shadow: 0 0 20px gold;
      transform: scale(1.05);
    }

    .button span {
      color: gold;
      font-weight: bold;
      font-size: 1rem;
    }
  </style>
</head>
<body>

  <h1>DOLCE CHOCOLATE</h1>

  <div class="grid-container">
    <a href="/chocolate" class="button">
      <img src="/choco1.jpeg" alt="مخزن الشكلاطه">
      <span>مخزن الشكلاطه</span>
    </a>

    <a href="/packs" class="button">
      <img src="/pack1.jpeg" alt="مخزن الباكوات">
      <span>مخزن الباكوات</span>
    </a>

    <a href="/cafe" class="button">
      <img src="/cafe1.jpeg" alt="مخزن الكافي">
      <span>مخزن الكافي</span>
    </a>

    <a href="/search" class="button">
      <img src="/ffd1.jpeg" alt="البحث عن منتج">
      <span>البحث عن منتج</span>
    </a>

    <a href="/admin-dashboard/manage-users" class="button">
      <img src="/manage.jpeg" alt="إدارة المستخدمين">
      <span>إدارة المستخدمين</span>
    </a>

    <a href="/reports" class="button">
      <img src="/reports1.jpeg" alt="التقارير">
      <span>التقارير</span>
    </a>

    <a href="/dashboard/add" class="button">
      <img src="/add1.jpeg" alt="إضافة منتج">
      <span>إضافة منتج</span>
    </a>

    <a href="/unified-login" onclick="localStorage.clear()" class="button">
      <img src="/log1.jpeg" alt="تسجيل الخروج">
      <span>تسجيل الخروج</span>
    </a>
  </div>

</body>
</html>
