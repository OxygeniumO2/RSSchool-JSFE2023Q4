interface CreateElemProps {
  tagName: string;
  classNames?: string[];
  textContent?: string;
  attributes?: [string, string | boolean | number][];
}

type CreateElem = (props: CreateElemProps) => HTMLElement | HTMLInputElement;

const createElem: CreateElem = ({
  tagName,
  classNames,
  textContent,
  attributes,
}: CreateElemProps): HTMLElement | HTMLInputElement => {
  const elem = document.createElement(tagName);

  if (classNames) {
    elem.classList.add(...classNames);
  }

  if (textContent) {
    elem.textContent = textContent;
  }

  if (attributes) {
    attributes.forEach(([key, value]) => {
      elem.setAttribute(key, String(value));
    });
  }

  return elem;
};

export default createElem;