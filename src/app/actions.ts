"use server";

import { Category,Property  } from "@/lib/types";

export async function getAllCategories(): Promise<Category[]> {
  const url = `https://stagingapi.mazaady.com/api/v1/all-categories/web`;

  const response = await fetch(url, {
    headers: {
      "private-key": process.env.MAZAADY_PRIVATE_KEY || "",
      "currency": process.env.MAZAADY_CURRENCY || "AED",
      "content-language": process.env.MAZAADY_CONTENT_LANGUAGE || "en",
      "Accept": process.env.MAZAADY_ACCEPT || "application/json",
      "platform": process.env.MAZAADY_PLATFORM || "web",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Response status:", response.status);
    console.error("Response text:", errorText);
    throw new Error(
      `Failed to fetch categories: ${response.statusText} (${response.status}) - ${errorText}`
    );
  }

  const data = await response.json();
  return data.data.categories
}

export async function getCategoryProperties(id: number): Promise<Property[]> {
  const url = `${process.env.MAZAADY_BASE_URL || "https://stagingapi.mazaady.com/api/v1"}/properties/${id}`;

  const response = await fetch(url, {
    headers: {
      "private-key": process.env.MAZAADY_PRIVATE_KEY || "",
      "currency": process.env.MAZAADY_CURRENCY || "AED",
      "content-language": process.env.MAZAADY_CONTENT_LANGUAGE || "en",
      "Accept": process.env.MAZAADY_ACCEPT || "application/json",
      "platform": process.env.MAZAADY_PLATFORM || "web",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Response status:", response.status);
    console.error("Response text:", errorText);
    throw new Error(
      `Failed to fetch category properties: ${response.statusText} (${response.status}) - ${errorText}`
    );
  }

  const data = await response.json();
   return data.data
}

export async function getOptionProperties(id: number): Promise<Property[]> {
  const url = `${process.env.MAZAADY_BASE_URL || "https://stagingapi.mazaady.com/api/v1"}/option-properties/${id}`;

  const response = await fetch(url, {
    headers: {
      "private-key": process.env.MAZAADY_PRIVATE_KEY || "",
      "currency": process.env.MAZAADY_CURRENCY || "AED",
      "content-language": process.env.MAZAADY_CONTENT_LANGUAGE || "en",
      "Accept": process.env.MAZAADY_ACCEPT || "application/json",
      "platform": process.env.MAZAADY_PLATFORM || "web",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Response status:", response.status);
    console.error("Response text:", errorText);
    throw new Error(
      `Failed to fetch option properties: ${response.statusText} (${response.status}) - ${errorText}`
    );
  }

  const data = await response.json();
    return data.data
  }