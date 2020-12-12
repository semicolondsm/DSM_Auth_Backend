class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public responseMessage?: number,
  ) {
    super(message);
  }
}

export { HttpError }