function generateRandomColor(): string {
  const minBrightness = 75;
  let hexColor = '';

  do {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    if (brightness >= minBrightness) {
      const hexRed = red.toString(16).padStart(2, '0');
      const hexGreen = green.toString(16).padStart(2, '0');
      const hexBlue = blue.toString(16).padStart(2, '0');
      hexColor = `#${hexRed}${hexGreen}${hexBlue}`;
    }
  } while (hexColor === '');

  return hexColor;
}

export default generateRandomColor;
