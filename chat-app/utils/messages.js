const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const locationMessage = (url) => {
  return {
    url,
    createdAt: new Date().getTime(),
  };
};

export { generateMessage, locationMessage };
