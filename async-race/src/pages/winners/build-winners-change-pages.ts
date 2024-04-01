import createElem from '../../utils/create-elem';
// eslint-disable-next-line import/no-cycle
import changeWinnersPage from './change-winners-page';

const WINNERS_DEFAULT_LIMIT: number = 10;

function buildChangePages() {
  const changePageContainer = createElem({
    tagName: 'div',
    classNames: ['change__page-container'],
  });

  const prevPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_2'],
    textContent: 'Prev Page',
  });
  const nextPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_2'],
    textContent: 'Next Page',
  });

  prevPageBtn.addEventListener(
    'click',
    function handleClickPrevPage(this: HTMLElement) {
      const order = localStorage.getItem('winnersOrderBy') as string;
      const sort = localStorage.getItem('winnersSortedBy') as string;

      changeWinnersPage.call(
        this,
        prevPageBtn,
        WINNERS_DEFAULT_LIMIT,
        order,
        sort,
      );
    },
  );

  nextPageBtn.addEventListener(
    'click',
    function handleClickNextPage(this: HTMLElement) {
      const order = localStorage.getItem('winnersOrderBy') as string;
      const sort = localStorage.getItem('winnersSortedBy') as string;

      changeWinnersPage.call(
        this,
        nextPageBtn,
        WINNERS_DEFAULT_LIMIT,
        order,
        sort,
      );
    },
  );

  changePageContainer.append(prevPageBtn, nextPageBtn);
  return changePageContainer;
}

export default buildChangePages;
