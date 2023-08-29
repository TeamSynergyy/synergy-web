const pageMap = new Map();

export default function usePage() {
  const initPage = (name: string) => pageMap.set(name, 0);
  const getPage = (name: string) => pageMap.get(name);
  const increasePage = (name: string) =>
    pageMap.set(name, pageMap.get(name) + 1);

  return { initPage, getPage, increasePage };
}
