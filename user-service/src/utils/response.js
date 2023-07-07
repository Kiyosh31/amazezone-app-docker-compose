export default class StandardResponse {
  code = ''
  message = ''
  data = null

  created(data) {
    this.code = 201
    this.message = 'Created'
    this.data = data
  }

  success(data) {
    this.code = 200
    this.message = 'Success'
    this.data = data
  }

  notFound(message) {
    this.code = 400
    this.message = `${message} not found`
    this.data = null
  }

  deleted() {
    this.code = 200
    this.message = 'User deleted successfully'
    this.data = null
  }
}
