function getCurrWinnerPage(): number {
  const currPageFromLS = localStorage.getItem('winnersPageOxy') as string;
  const currPage = parseInt(currPageFromLS, 10);
  return currPage;
}

export default getCurrWinnerPage;
