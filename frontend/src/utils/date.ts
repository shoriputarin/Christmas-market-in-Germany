const formatter = new Intl.DateTimeFormat('ja-JP', {
  month: 'short',
  day: 'numeric',
});

export function formatDate(date: string): string {
  try {
    return formatter.format(new Date(date));
  } catch (error) {
    console.warn('Invalid date string provided to formatDate', date, error);
    return date;
  }
}

export function formatDateRange(start: string, end: string): string {
  if (!start && !end) {
    return '未定';
  }

  if (!start) {
    return `${formatDate(end)} まで (開始日未定)`;
  }

  if (!end) {
    return `${formatDate(start)} から (終了日未定)`;
  }

  return `${formatDate(start)} 〜 ${formatDate(end)}`;
}
