interface CreateElemProps {
  tag: string;
  classesCss?: string[];
  textContent?: string;
  src?: string;
  alt?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  placeholder?: string;
  title?: string;
}

type CreateElem = (props: CreateElemProps) => HTMLElement | HTMLInputElement;

const createElem: CreateElem = ({
  tag,
  classesCss,
  textContent,
  src,
  alt,
  type,
  required,
  minLength,
  pattern,
  placeholder,
  title,
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

  if (required) {
    if (tag === 'input') {
      (elem as HTMLInputElement).required = required;
    }
  }

  if (minLength) {
    if (tag === 'input') {
      (elem as HTMLInputElement).minLength = minLength;
    }
  }

  if (pattern) {
    if (tag === 'input') {
      (elem as HTMLInputElement).pattern = pattern;
    }
  }

  if (placeholder) {
    if (tag === 'input') {
      (elem as HTMLInputElement).placeholder = placeholder;
    }
  }

  if (title) {
    elem.title = title;
  }

  return elem;
};

export default createElem;
