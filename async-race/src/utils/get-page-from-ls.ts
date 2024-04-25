function getCurrPage(): number {
  const currPageFromLS = localStorage.getItem('garagePageOxy') as string;
  return parseInt(currPageFromLS, 10);
}

export default getCurrPage;
