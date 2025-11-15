export const setCssVariables = (
  element: HTMLElement,
  vars: { property: string; value: string | null; priority?: string }[],
) => {
  vars.forEach(({ property, value, priority }) => {
    element.style.setProperty(property, value, priority);
  });
};
