export const fetchMessages = (username) => {
  const filterMessageByUsername = (message) => {
    return message.from === username || message.to === username;
  };

  return fetch("/mocks/messages.json", {
    method: "get",
  })
    .then((response) => response.json())
    .then((messages) => {
      return messages.filter(filterMessageByUsername);
    });
};
