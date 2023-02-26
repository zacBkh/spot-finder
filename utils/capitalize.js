const capitalize = (string) => {
  if (!string) {
    return;
  } else {
    return string
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }
};

export default capitalize;
