export const getInitialsAvatar = (name = "U") => {
  const letter = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${letter}&background=2563eb&color=fff&bold=true`;
};
