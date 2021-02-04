const factorial = (n: number): number => (n !== 1 ? n * factorial(n - 1) : 1);

export default factorial;
