function collectMessagesToRead(line: HTMLElement): Element[] {
  const followingMessages = [];
  let nextSibling = line.nextElementSibling;

  while (nextSibling) {
    if (nextSibling.classList.contains('message-container')) {
      followingMessages.push(nextSibling);
    }
    nextSibling = nextSibling.nextElementSibling;
  }
  return followingMessages;
}

export default collectMessagesToRead;
