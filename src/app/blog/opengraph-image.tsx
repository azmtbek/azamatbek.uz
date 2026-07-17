import { ImageResponse } from "next/og";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Blog — Azamatbek";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return new ImageResponse(
		<OgImage
			title="Blog"
			subtitle="Writing on web development, systems, and things I find interesting."
		/>,
		size,
	);
}
