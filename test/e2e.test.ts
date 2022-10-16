import autocannon from 'autocannon'
import child_process from 'node:child_process'
import waitOn from 'wait-on'

describe('e2e tests', () => {
  let server: child_process.ChildProcess

  beforeAll(() => {
    child_process.execSync('npm run build')
  })

  beforeEach(async () => {
    child_process.execSync('docker-compose up -d redis')
    server = child_process.exec('npm start')
    await waitOn({
      resources: ['http://localhost:3000/public']
    })
  })

  afterEach(async () => {
    server.kill()
    child_process.execSync('docker-compose down')
  })

  it('Should allow requests until reaching the limit for the public route', async () => {
    const result = await autocannon({
      method: 'GET',
      url: 'http://localhost:3000/public',
      amount: 101
    })
    console.log(result)

    expect(result['2XX']).toBe(100)
    expect(result['4XX']).toBe(1)
  })
})
