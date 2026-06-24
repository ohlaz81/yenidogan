import { createHmac } from "crypto";
import { createId } from "@paralleldrive/cuid2";
import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";

type Vote = "LIKE" | "DISLIKE";

type VoteResponse = {
  likeCount: number;
  dislikeCount: number;
  myVote: Vote | null;
};

function json(data: VoteResponse, status = 200) {
  return Response.json(data, { status });
}

function error(status = 400) {
  return Response.json({ error: "İstek işlenemedi." }, { status });
}

function validSlug(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 160;
}

function validDeviceKey(value: unknown): value is string {
  return typeof value === "string" && value.length >= 16 && value.length <= 256;
}

function validVote(value: unknown): value is Vote | null {
  return value === "LIKE" || value === "DISLIKE" || value === null;
}

function voteSecret() {
  return (
    process.env.NAME_VOTE_HASH_SECRET?.trim() ||
    process.env.AUTH_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    ""
  );
}

function hashDeviceKey(deviceKey: string) {
  const secret = voteSecret();
  if (!secret) throw new Error("Missing vote hash secret");
  return createHmac("sha256", secret).update(deviceKey).digest("hex");
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

async function readVoteState(nameId: string, deviceKeyHash?: string): Promise<VoteResponse> {
  const s = getSupabase();

  const [{ count: likeCount, error: likeError }, { count: dislikeCount, error: dislikeError }] = await Promise.all([
    s.from("NameVote").select("id", { count: "exact", head: true }).eq("nameId", nameId).eq("vote", "LIKE"),
    s.from("NameVote").select("id", { count: "exact", head: true }).eq("nameId", nameId).eq("vote", "DISLIKE"),
  ]);

  if (likeError) throw likeError;
  if (dislikeError) throw dislikeError;

  let myVote: Vote | null = null;
  if (deviceKeyHash) {
    const { data, error: voteError } = await s
      .from("NameVote")
      .select("vote")
      .eq("nameId", nameId)
      .eq("deviceKeyHash", deviceKeyHash)
      .maybeSingle();

    if (voteError) throw voteError;
    if (data?.vote === "LIKE" || data?.vote === "DISLIKE") {
      myVote = data.vote;
    }
  }

  return {
    likeCount: likeCount ?? 0,
    dislikeCount: dislikeCount ?? 0,
    myVote,
  };
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")?.trim();
  const deviceKey = req.nextUrl.searchParams.get("deviceKey");

  if (!validSlug(slug)) return error();

  try {
    const nameId = await findNameId(slug);
    if (!nameId) return error(404);

    const deviceKeyHash = validDeviceKey(deviceKey) ? hashDeviceKey(deviceKey) : undefined;
    return json(await readVoteState(nameId, deviceKeyHash));
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
  const { vote, deviceKey } = input;

  if (!validSlug(slug) || !validVote(vote) || !validDeviceKey(deviceKey)) {
    return error();
  }

  try {
    const s = getSupabase();
    const nameId = await findNameId(slug);
    if (!nameId) return error(404);

    const deviceKeyHash = hashDeviceKey(deviceKey);

    if (vote === null) {
      const { error: deleteError } = await s
        .from("NameVote")
        .delete()
        .eq("nameId", nameId)
        .eq("deviceKeyHash", deviceKeyHash);

      if (deleteError) throw deleteError;
      return json(await readVoteState(nameId, deviceKeyHash));
    }

    const { data: existing, error: selectError } = await s
      .from("NameVote")
      .select("id")
      .eq("nameId", nameId)
      .eq("deviceKeyHash", deviceKeyHash)
      .maybeSingle();

    if (selectError) throw selectError;

    if (existing?.id) {
      const { error: updateError } = await s
        .from("NameVote")
        .update({ vote } as never)
        .eq("id", String(existing.id));

      if (updateError) throw updateError;
    } else {
      const now = new Date().toISOString();
      const { error: insertError } = await s.from("NameVote").insert({
        id: createId(),
        nameId,
        deviceKeyHash,
        vote,
        createdAt: now,
        updatedAt: now,
      } as never);

      if (insertError) throw insertError;
    }

    return json(await readVoteState(nameId, deviceKeyHash));
  } catch {
    return error(500);
  }
}
