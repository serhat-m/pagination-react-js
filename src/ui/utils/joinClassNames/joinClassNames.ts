export function joinClassNames(...args: (string | number | undefined | null | false)[]) {
  if (args.length === 0) {
    throw new TypeError("Please provide at least one argument")
  }

  return args.filter((value) => value).join(" ")
}
