import { apiClient } from "./client";
import type { Scheme } from "@/types/scheme";

export async function getSchemes(): Promise<Scheme[]> {
  try {
    return await apiClient.get<Scheme[]>("/api/schemes");
  } catch {
    const { mockSchemes } = await import("@/lib/mock/schemes");
    return mockSchemes;
  }
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  try {
    return await apiClient.get<Scheme>(`/api/schemes/${id}`);
  } catch {
    const { getSchemeById } = await import("@/lib/mock/schemes");
    return getSchemeById(id) || null;
  }
}

export async function getSchemesByPurpose(
  purpose: "business" | "education"
): Promise<Scheme[]> {
  try {
    return await apiClient.get<Scheme[]>(`/api/schemes?purpose=${purpose}`);
  } catch {
    const { getSchemesByPurpose } = await import("@/lib/mock/schemes");
    return getSchemesByPurpose(purpose);
  }
}