interface CreateElemProps {
  tag: string;
  classesCss?: string[];
  textContent?: string;
  src?: string;
  alt?: string;
  type?: string;
}

type CreateElem = (props: CreateElemProps) => HTMLElement | HTMLInputElement;

export const createElem: CreateElem = ({
  tag,
  classesCss,
  textContent,
  src,
  alt,
  type,
}: CreateElemProps): HTMLElement | HTMLInputElement => {
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

  if (type) {
    elem.setAttribute('type', type);
  }

  return elem;
};
