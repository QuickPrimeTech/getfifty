import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const baseDir = "src/app";

// Added 'admin' and 'dashboard' to skip protected/private areas
const excludeDirs = ["api", "fonts", "admin", "dashboard", "dashboards"];

const priorityMap: Record<string, number> = {
  "/": 1.0,
  "/auth/create-account": 0.9,
  "/auth/login": 0.6,
  "/help": 0.9,
};

function getRoutes(dir: string, basePath = ""): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;

    // 1. Skip excluded dirs, private folders (_folder), and dynamic routes ([id])
    if (
      excludeDirs.includes(name) ||
      name.startsWith("_") ||
      name.startsWith("[")
    )
      continue;

    // 2. Handle Route Groups (e.g., "(marketing)")
    // Dive in without adding the group name to the URL path
    if (name.startsWith("(") && name.endsWith(")")) {
      routes = routes.concat(getRoutes(path.join(dir, name), basePath));
      continue;
    }

    const currentRouteSegment = path.join(basePath, name).replace(/\\/g, "/");

    // 3. Check for a page file
    const hasPage =
      fs.existsSync(path.join(dir, name, "page.tsx")) ||
      fs.existsSync(path.join(dir, name, "page.jsx"));

    if (hasPage) {
      routes.push(`/${currentRouteSegment}`);
    }

    // 4. Recursive crawl
    routes = routes.concat(
      getRoutes(path.join(dir, name), currentRouteSegment),
    );
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullPath = path.join(process.cwd(), baseDir);

  const dynamicRoutes = getRoutes(fullPath);
  const allRoutes = ["/", ...new Set(dynamicRoutes)];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: priorityMap[route] ?? 0.5,
  }));
}
