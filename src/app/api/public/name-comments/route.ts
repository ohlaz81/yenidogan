import { createId } from "@paralleldrive/cuid2";
import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";

const SUCCESS_MESSAGE = "Yorumunuz başarıyla alındı.\nOnaylandıktan sonra yayınlanacaktır.";

type CommentRow = {
  displayName: string;
  comment: string;
  createdAt: string;
};

function error(status = 400, message = "İstek işlenemedi.") {
  return Response.json({ error: message }, { status });
}

function validSlug(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 160;
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function validFullName(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const normalized = normalizeText(value);
  return normalized.length >= 3 && normalized.length <= 60 && normalized.split(" ").length >= 2;
}

function validComment(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const normalized = value.trim();
  return normalized.length >= 10 && normalized.length <= 1000;
}

function makeDisplayName(fullName: string) {
  const parts = normalizeText(fullName).split(" ");
  const firstName = parts[0] ?? "";
  const lastName = parts[parts.length - 1] ?? "";
  const initial = Array.from(lastName)[0] ?? "";
  return `${firstName} ${initial}......`;
}

async function findNameId(slug: string) {
  const { data, error: dbError } = await getSupabase()
    .from("Name")
    .select("id")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (dbError) throw dbError;
  return data?.id ? String(data.id) : null;
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")?.trim();
  if (!validSlug(slug)) return error();

  try {
    const nameId = await findNameId(slug);
    if (!nameId) return error(404);

    const { data, error: commentsError } = await getSupabase()
      .from("NameComment")
      .select("displayName,comment,createdAt")
      .eq("nameId", nameId)
      .eq("status", "APPROVED")
      .order("createdAt", { ascending: false });

    if (commentsError) throw commentsError;

    const comments: CommentRow[] = (data ?? []).map((row) => ({
      displayName: String(row.displayName),
      comment: String(row.comment),
      createdAt: String(row.createdAt),
    }));

    return Response.json(comments);
  } catch {
    return error(500);
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error();
  }

  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const slug = typeof input.slug === "string" ? input.slug.trim() : input.slug;

  if (!validSlug(slug) || !validFullName(input.fullName) || !validComment(input.comment)) {
    return error();
  }

  const fullName = normalizeText(input.fullName);
  const comment = input.comment.trim();

  try {
    const nameId = await findNameId(slug);
    if (!nameId) return error(404);

    const now = new Date().toISOString();
    const { error: insertError } = await getSupabase().from("NameComment").insert({
      id: createId(),
      nameId,
      fullName,
      displayName: makeDisplayName(fullName),
      comment,
      status: "PENDING",
      createdAt: now,
      updatedAt: now,
    } as never);

    if (insertError) throw insertError;

    return Response.json({
      success: true,
      message: SUCCESS_MESSAGE,
    });
  } catch {
    return error(500);
  }
}
