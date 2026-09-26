const PALETTE = ['#A8701F', '#2B6F63', '#3C6B34', '#8A5B18', '#5C6459'];

function hashColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export default function Avatar({ name }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
      style={{ backgroundColor: hashColor(name) }}
    >
      {initials}
    </div>
  );
}