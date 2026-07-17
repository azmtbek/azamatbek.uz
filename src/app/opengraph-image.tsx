import { ImageResponse } from "next/og";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Azamatbek Mamarajabov";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return new ImageResponse(
		<OgImage title="Azamatbek Mamarajabov" subtitle="Software engineer" />,
		size,
	);
}
