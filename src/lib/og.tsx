export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgImage({
	title,
	subtitle,
}: {
	title: string;
	subtitle?: string;
}) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: "#0a0a0a",
				color: "#fafafa",
				padding: "80px",
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
					{title}
				</div>
				{subtitle && (
					<div style={{ fontSize: 28, color: "#a1a1aa" }}>{subtitle}</div>
				)}
			</div>
			<div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
				azamatbek.uz
			</div>
		</div>
	);
}
