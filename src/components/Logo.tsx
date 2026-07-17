export default function Logo({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 100 100" className={className} aria-hidden="true">
			<rect width="100" height="100" rx="22" fill="#0a0a0a" />
			<path
				d="M50 20 L27 78 M50 20 L73 78 M36 58 H64"
				stroke="#fafafa"
				strokeWidth="9"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	);
}
