export const words1 = [
  "Shadow","Nova","Fire","Dark","Ghost","Cyber","Lunar","Storm","Hyper","Neo"
];

export const words2 = [
  "Blade","Hunter","Knight","Storm","Pixel","Rider","Dragon","Core","Strike","Wave"
];

export function generateName(): string {
  const w1 = words1[Math.floor(Math.random() * words1.length)];
  const w2 = words2[Math.floor(Math.random() * words2.length)];

  return w1 + w2;
}

export function generateManyNames(count: number): string[] {
  const names: string[] = [];

  for (let i = 0; i < count; i++) {
    names.push(generateName());
  }

  return names;
}