import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // Jika tidak ada token, redirect ke login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // Decode token (sederhana tanpa Firebase Admin)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    const role = payload.role; // Pastikan role disimpan di token Firebase

    // Cek akses halaman admin
    if (url.pathname.startsWith("/dashboard/admin") && role !== "admin") {
      url.pathname = "/dashboard/siswa"; // Redirect ke dashboard siswa jika bukan admin
      return NextResponse.redirect(url);
    }

    // Cek akses halaman siswa
    if (url.pathname.startsWith("/dashboard/siswa") && role !== "siswa") {
      url.pathname = "/dashboard/admin"; // Redirect ke dashboard admin jika bukan siswa
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Token invalid:", error);
    url.pathname = "/login"; // Redirect ke login jika token tidak valid
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware hanya berjalan di dashboard
export const config = {
  matcher: ["/dashboard/:path*"], // Menentukan bahwa middleware hanya berjalan untuk path yang dimulai dengan "/dashboard"
};
