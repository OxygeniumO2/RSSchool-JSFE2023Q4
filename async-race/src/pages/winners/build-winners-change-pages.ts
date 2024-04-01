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
      changeWinnersPage.call(this, prevPageBtn, WINNERS_DEFAULT_LIMIT);
    },
  );

  nextPageBtn.addEventListener(
    'click',
    function handleClickNextPage(this: HTMLElement) {
      changeWinnersPage.call(this, nextPageBtn, WINNERS_DEFAULT_LIMIT);
    },
  );

  changePageContainer.append(prevPageBtn, nextPageBtn);
  return changePageContainer;
}

export default buildChangePages;
