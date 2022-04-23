export const transformUp = {
  to: {
    transform: "translateY(0)",
    opacity: 1,
  },
  from: {
    transform: "translateY(-20px)",
    opacity: 0,
  },
  delay: 200,
}

export const transformDown = {
  to: {
    transform: "translateY(20px)",
    opacity: 1,
  },
  from: {
    transform: "translateY(0)",
    opacity: 0,
  },
  delay: 100,
}

export const transformLeft = {
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
  from: {
    transform: "translateX(20px)",
    opacity: 0,
  },
  delay: 100,
}

export const transformRight = {
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
  from: {
    transform: "translateX(-20px)",
    opacity: 0,
  },
  delay: 100,
}

export const transitionIn = {
  to: {
    opacity: 1,
  },
  from: {
    opacity: 0,
  },
  delay: 5,
}
