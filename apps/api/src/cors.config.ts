// apps/api/src/cors.config.ts
export function buildCorsOptions() {
  const allowProd = process.env.WEB_ORIGIN;
  const previewRegex = process.env.PREVIEW_ORIGIN_REGEX
    ? new RegExp(process.env.PREVIEW_ORIGIN_REGEX)
    : null;

  return {
    origin: (origin: string | undefined, cb: (err: Error | null, ok?: boolean) => void) => {
      // Sem 'origin' em tools/curl → permitir
      if (!origin) return cb(null, true);
      if (origin === allowProd) return cb(null, true);
      if (previewRegex && previewRegex.test(origin)) return cb(null, true);
      return cb(new Error("CORS: origin não permitido"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "X-Requested-With",
      "X-Request-Id"
    ],
    exposedHeaders: ["X-Request-Id"]
  };
}
