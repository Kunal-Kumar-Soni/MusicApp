function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${min}:${secs < 10 ? "0" : ""}${secs}`;
}

export default formatDuration;
