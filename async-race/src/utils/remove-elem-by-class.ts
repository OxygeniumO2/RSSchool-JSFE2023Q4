function removeElementsByClass(
  container: HTMLElement,
  className: string,
): void {
  const children = Array.from(container.children);
  children.forEach((child, index) => {
    if (child.classList.contains(className)) {
      container.removeChild(container.children[index]);
    }
  });
}

export default removeElementsByClass;
