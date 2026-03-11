import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Route permission map: path prefix -> required permission field
const PERMISSION_ROUTES: Record<string, string> = {
  "/admin/users": "can_manage_users",
  "/admin/tests": "can_manage_tests",
  "/admin/articles": "can_manage_articles",
  "/admin/settings": "can_manage_settings",
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Unauthenticated → redirect to login
  if (!user && pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Authenticated on login page → redirect to dashboard
  if (user && pathname.startsWith("/admin/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Permission-based route guards (for authenticated users)
  if (user && pathname.startsWith("/admin")) {
    // Find which route needs a permission check
    const matchedRoute = Object.keys(PERMISSION_ROUTES).find((route) =>
      pathname.startsWith(route)
    );

    if (matchedRoute) {
      const requiredPermission = PERMISSION_ROUTES[matchedRoute];

      // Fetch the user's role record
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role, can_manage_tests, can_manage_articles, can_manage_settings, can_manage_users")
        .eq("user_id", user.id)
        .single();

      if (!roleData) {
        // User has no role row at all — deny access
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }

      const isSuperAdmin = roleData.role === "super_admin";
      const hasPermission = isSuperAdmin || (roleData as any)[requiredPermission] === true;

      if (!hasPermission) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
