const styles = {
  Open: 'bg-openbg text-opentext',
  'In Progress': 'bg-progressbg text-progresstext',
  Closed: 'bg-closedbg text-closedtext',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[status] || 'bg-line text-inksoft'
      }`}
    >
      {status}
    </span>
  );
}