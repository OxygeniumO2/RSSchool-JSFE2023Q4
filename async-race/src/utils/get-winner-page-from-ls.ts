function getCurrWinnerPage(): number {
  const currPageFromLS = localStorage.getItem('winnersPageOxy') as string;
  return parseInt(currPageFromLS, 10);
}

export default getCurrWinnerPage;
