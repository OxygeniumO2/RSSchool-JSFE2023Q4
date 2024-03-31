function getCurrPage(): number {
  const currPageFromLS = localStorage.getItem('garagePageOxy') as string;
  const currPage = parseInt(currPageFromLS, 10);
  return currPage;
}

export default getCurrPage;
