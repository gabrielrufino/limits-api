export class TooManyRequestsError {
  public error = 'Too many requests'
  public unlockAt!: Date

  constructor(params: {
    unlockAt: Date;
  }) {
    this.unlockAt = params.unlockAt
  }
}
