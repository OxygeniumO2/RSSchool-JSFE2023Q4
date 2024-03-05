interface CreateElemProps {
  tag: string;
  classesCss?: string[];
  textContent?: string;
  src?: string;
  alt?: string;
}

type CreateElem = (props: CreateElemProps) => HTMLElement;

export const createElem: CreateElem = ({ tag, classesCss, textContent, src, alt }: CreateElemProps): HTMLElement => {
  const elem = document.createElement(tag);

  if (classesCss) {
    elem.classList.add(...classesCss);
  }

  if (textContent) {
    elem.textContent = textContent;
  }

  if (src) {
    elem.setAttribute('src', src);
  }

  if (alt) {
    elem.setAttribute('alt', alt);
  }

  return elem;
};
