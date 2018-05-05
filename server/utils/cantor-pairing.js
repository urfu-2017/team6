export default (x, y) => {
    const a = Math.max(x, y)
    const b = Math.min(x, y)

    return (0.5 * (a + b) * (a + b + 1)) + b
}
