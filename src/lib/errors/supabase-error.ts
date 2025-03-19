export class SupabaseError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.name = 'SupabaseError'
    this.statusCode = statusCode
  }
}
