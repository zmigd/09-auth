import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // Якщо немає accessToken
  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — пробуємо оновити сесію
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };
          if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        // Якщо сесія оновилась
        if (isAuthRoute) {
          // Забороняємо доступ до /sign-in та /sign-up
          return NextResponse.redirect(new URL("/", request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }

        // Дозволяємо доступ до приватних маршрутів
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }

    // Якщо немає accessToken і refreshToken
    if (isAuthRoute) {
      // Дозволяємо доступ до сторінок авторизації
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      // Перенаправляємо неавторизованих користувачів на /sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Для всіх інших (публічних) маршрутів
    return NextResponse.next();
  }

  // Якщо користувач уже авторизований
  if (isAuthRoute) {
    // Перенаправляємо з /sign-in чи /sign-up на головну
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Дозволяємо доступ до приватних маршрутів
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  // ✅ Обов’язкове завершення: для всіх інших маршрутів (публічних)
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
