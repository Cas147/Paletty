export const removeDuplicate = (arr: any[]): any[] =>{
  return arr.filter((value, index, self) => self.indexOf(value) === index)
}

export const  getHexColorsFromString = (myString: string) => {
  const regex = /#([0-9a-fA-F]{6})/g;
  const matches = myString.match(regex);
  if (!matches) {
    return [];
  }
  const hexColors = [];
  for (let i = 0; i < matches.length; i++) {
    hexColors.push(matches[i]);
  }
  return hexColors;
}


export async function getDominantColorsFromImageBase64(imageData: string, numColors: number): Promise<string[]> {
  const img = new Image();
  img.src = imageData;

  await new Promise((resolve, reject) => {
    img.addEventListener("load", resolve);
    img.addEventListener("error", reject);
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const imageDataObj = await ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixelData = imageDataObj.data;
  const colorCounts: any = new Map<string, number>();

  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    const hex = rgbToHex([r, g, b]);

    if (colorCounts.has(hex)) {
      colorCounts.set(hex, colorCounts.get(hex) + 1);
    } else {
      colorCounts.set(hex, 1);
    }
  }

  const sortedColors = [...colorCounts.entries()].sort(
    ([, countA], [, countB]) => countB - countA
  );

  const dominantColors = sortedColors.slice(0, numColors).map(([color]) => color);

  return dominantColors;
}

function rgbToHex([r, g, b]: number[]): string {
  return "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
}