// Testing async code
export default function fetchData() {
  // return Promise.reject({ reason: "Operation failed" });

  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const data = [1, 2, 3];
      resolve(data);
    });
  });
}
