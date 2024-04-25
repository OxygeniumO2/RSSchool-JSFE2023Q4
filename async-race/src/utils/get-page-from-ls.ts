enum LocalStoragePages {
  winnersPage = 'winnersPageOxy',
  garagePage = 'garagePageOxy',
}

function getPage(page: string): number {
  const currPageFromLS = localStorage.getItem(`${page}`) as string;
  return parseInt(currPageFromLS, 10);
}

export { LocalStoragePages, getPage };
