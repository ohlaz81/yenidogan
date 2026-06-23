/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { genderLabels, styleLabels } from "@/lib/labels";
import { NAME_OG_IMAGE_SIZE } from "@/lib/name-og-image-config";
import { site } from "@/lib/site";
import type { NameWithDetail } from "@/types/database";

const colors = {
  background: "#f8f6fc",
  foreground: "#1d1b41",
  primary: "#4b2a7f",
  pink: "#e91e8c",
  pinkSoft: "#fff0f3",
  blue: "#5b8def",
  blueSoft: "#e8f0ff",
  lavender: "#9b7fd1",
  muted: "#6b5f7a",
  card: "#ffffff",
  border: "#ede7f7",
};

function imageMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function publicAssetDataUrl(publicUrl: string) {
  if (!publicUrl.startsWith("/")) return publicUrl;
  const clean = publicUrl.split("?")[0]?.split("#")[0] ?? publicUrl;
  const relative = decodeURIComponent(clean).replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", relative);
  const data = await readFile(filePath, "base64");
  return `data:${imageMimeType(filePath)};base64,${data}`;
}

function meaningPreview(meaning: string) {
  const clean = meaning.replace(/\s+/g, " ").trim();
  if (clean.length <= 170) return clean;
  return `${clean.slice(0, 167).trim()}...`;
}

function nameTone(gender: NameWithDetail["gender"]) {
  if (gender === "GIRL") {
    return {
      accent: colors.pink,
      soft: colors.pinkSoft,
      label: "Kız İsmi",
    };
  }
  if (gender === "BOY") {
    return {
      accent: colors.blue,
      soft: colors.blueSoft,
      label: "Erkek İsmi",
    };
  }
  return {
    accent: colors.primary,
    soft: "#f3effb",
    label: "Ünisex İsim",
  };
}

function starText(value: number) {
  const rounded = Math.min(5, Math.max(0, Math.round(value)));
  return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
}

export async function renderNameOgImage(name: NameWithDetail) {
  const tone = nameTone(name.gender);
  const logoSrc = await publicAssetDataUrl("/logo/logo.jpeg");
  const babySrc = await publicAssetDataUrl(name.image?.url ?? "/media/placeholder.svg");
  const similarNames = name.similarFrom.map((item) => item.target.displayName).slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 48%, ${tone.soft} 100%)`,
          color: colors.foreground,
          fontFamily: "Plus Jakarta Sans, Arial, sans-serif",
          padding: 42,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            border: `1px solid ${colors.border}`,
            borderRadius: 34,
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 18px 48px rgba(75,42,127,0.14)",
            overflow: "hidden",
            padding: 34,
            gap: 34,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img
                src={logoSrc}
                alt=""
                width={58}
                height={58}
                style={{
                  borderRadius: 18,
                  objectFit: "cover",
                  border: `1px solid ${colors.border}`,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: colors.primary,
                    lineHeight: 1,
                  }}
                >
                  {site.name}
                </div>
                <div style={{ fontSize: 17, color: colors.muted, marginTop: 6 }}>
                  Bebek isimleri ve anlamları
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
              <div
                style={{
                  fontFamily: "DM Serif Display, Georgia, serif",
                  fontSize: 104,
                  lineHeight: 0.94,
                  color: tone.accent,
                  letterSpacing: 0,
                }}
              >
                {name.displayName.toLocaleUpperCase("tr-TR")}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 18, alignItems: "center" }}>
                {[tone.label, styleLabels[name.style], name.origin].map((label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      padding: "9px 16px",
                      borderRadius: 999,
                      background: tone.soft,
                      color: label === name.origin ? colors.primary : tone.accent,
                      fontSize: 19,
                      fontWeight: 800,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 30, color: tone.accent, marginTop: 18, letterSpacing: 2 }}>
                {starText(name.popularity)}
              </div>
            </div>

            <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
              <InfoBlock title="Kökeni" value={name.origin} />
              <InfoBlock title="Kur'an'da Geçiyor mu?" value={name.inQuran ? "Evet" : "Hayır"} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                padding: "18px 20px",
                borderRadius: 24,
                background: "#fbf9ff",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ fontSize: 19, fontWeight: 900, color: colors.primary, marginBottom: 8 }}>
                Anlamı
              </div>
              <div style={{ fontSize: 25, lineHeight: 1.34, color: colors.foreground }}>
                {meaningPreview(name.meaning)}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
              {similarNames.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: colors.primary }}>
                    Benzer İsimler
                  </div>
                  <div style={{ fontSize: 23, color: colors.muted, marginTop: 6 }}>
                    {similarNames.join(" • ")}
                  </div>
                </div>
              ) : null}
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>
                yenidogan.net
              </div>
            </div>
          </div>

          <div
            style={{
              width: 356,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 18,
              borderRadius: 30,
              background: `linear-gradient(180deg, ${tone.soft} 0%, #ffffff 100%)`,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                width: 304,
                height: 408,
                display: "flex",
                borderRadius: 26,
                overflow: "hidden",
                border: "8px solid #ffffff",
                boxShadow: "0 18px 38px rgba(75,42,127,0.16)",
              }}
            >
              <img
                src={babySrc}
                alt=""
                width={304}
                height={408}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                borderRadius: 999,
                padding: "12px 18px",
                background: colors.primary,
                color: "#ffffff",
                fontSize: 19,
                fontWeight: 900,
              }}
            >
              {genderLabels[name.gender]}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...NAME_OG_IMAGE_SIZE,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "15px 17px",
        borderRadius: 20,
        background: "#ffffff",
        border: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 900, color: colors.muted, marginBottom: 5 }}>
        {title}
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: colors.primary }}>{value}</div>
    </div>
  );
}
