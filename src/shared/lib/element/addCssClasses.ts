export const addCssClasses = (element: HTMLElement, classes: string[]) => {
  classes.forEach((className) => element.classList.add(className));
};
