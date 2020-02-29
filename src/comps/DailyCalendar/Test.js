function generateMockEvents(n) {
  let events = [];
  let minutesInDay = 60 * 12;

  while (n > 0) {
    let start = Math.floor(Math.random() * minutesInDay);
    let end = start + Math.floor(Math.random() * (minutesInDay - start));
    events.push({ start: start, end: end });
    n--;
  }

  return events;
}

layOutDay(generateMockEvents(20));

console.log("TestDump", JSON.stringify(generateMockEvents(20)));
