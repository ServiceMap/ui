export const removeCssClasses = (element: HTMLElement, classes: string[]) => {
  classes.forEach((className) => element.classList.remove(className));
};
