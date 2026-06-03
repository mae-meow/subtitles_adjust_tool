function toMilliseconds(h, m, s, ms) {
  return (
    Number(h) * 3600000 +
    Number(m) * 60000 +
    Number(s) * 1000 +
    Number(ms)
  );
}

function toTimestamp(totalMs) {
  totalMs = Math.max(0, totalMs);

  const hh = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;

  const mm = Math.floor(totalMs / 60000);
  totalMs %= 60000;

  const ss = Math.floor(totalMs / 1000);
  const ms = totalMs % 1000;

  return (
    String(hh).padStart(2, "0") +
    ":" +
    String(mm).padStart(2, "0") +
    ":" +
    String(ss).padStart(2, "0") +
    "," +
    String(ms).padStart(3, "0")
  );
}

function adjustSubtitles(text, shiftSeconds) {
  const shiftMs = Number(shiftSeconds) * 1000;

  const timestampRegex =
    /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s-->\s(\d{2}):(\d{2}):(\d{2}),(\d{3})/g;

  return text.replace(
    timestampRegex,
    (
      match,
      sh, sm, ss, sms,
      eh, em, es, ems
    ) => {

      const startMs =
        toMilliseconds(sh, sm, ss, sms) +
        shiftMs;

      const endMs =
        toMilliseconds(eh, em, es, ems) +
        shiftMs;

      return (
        toTimestamp(startMs) +
        " --> " +
        toTimestamp(endMs)
      );
    }
  );
}

document
  .getElementById("adjustBtn")
  .addEventListener("click", () => {

    const input =
      document.getElementById("input").value;

    const shift =
      document.getElementById("shift").value;

    const output =
      adjustSubtitles(input, shift);

    document.getElementById("output").value =
      output;
  });