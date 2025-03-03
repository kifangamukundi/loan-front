// escape for lifting the data fetching to activate the suspense
export default async function Await({ promise, children }) {
  let data = await promise;

  return children(data);
}