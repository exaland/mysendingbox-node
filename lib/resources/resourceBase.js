'use strict'

const axios = require('axios')
const stream = require('stream')

var ResourceBase = function (endpoint, config) {
  this.uri = config.options.host + endpoint
  this.config = config.options
  this.useBody = config.useBody || false
}

(function () {
  this._transmit = function (method, uri, qs, form, headers, callback) {
    if (typeof headers === 'function') {
      callback = headers
      headers = {}
    } else {
      headers = headers || {}
    }

    // Ajoutez ou mettez à jour les headers
    for (let headerKey in this.config.headers) {
      headers[headerKey] = this.config.headers[headerKey]
    }

    const url = this.uri + (uri ? '/' + uri : '')

    // Préparer la configuration axios
    const axiosConfig = {
      url: url,
      method: method,
      headers: headers,
      auth: {
        username: this.config.apiKey,
        password: ''
      },
      // Par défaut, axios sérialise en JSON
      // Ajoutez des options spécifiques selon votre besoin
    }

    // Gestion des paramètres de requête
    if (qs) {
      axiosConfig.params = qs
    }

    // Gestion du corps de la requête
    if (form) {
      // Vérifier si le corps doit être envoyé en tant que formData
      let isMultiPartForm = false
      for (const key in form) {
        const val = form[key]
        if (val instanceof stream.Stream) || (val && val.hasOwnProperty('value')) {
          isMultiPartForm = true
          break
        }
      }

      if (this.useBody) {
        axiosConfig.data = form
      } else if (isMultiPartForm) {
        // Si vous utilisez des fichiers stream ou formData, utilisez form-data
        const FormData = require('form-data')
        const formData = new FormData()
        for (const key in form) {
          formData.append(key, form[key])
        }
        axiosConfig.data = formData
        axiosConfig.headers = {
          ...headers,
          ...formData.getHeaders()
        }
      } else {
        axiosConfig.data = form
      }
    }

    // Appel axios avec gestion Promises
    const promise = axios(axiosConfig)
      .then(response => {
        const body = response.data
        // Ajout de la propriété _response
        Object.defineProperty(body, '_response', {
          enumerable: false,
          writable: false,
          value: response
        })
        return body
      })
      .catch(err => {
        if (err.response) {
          const resp = err.response
          const body = resp.data
          if (body && body.error) {
            const error = new Error(body.error.message)
            error.status_code = body.error.status_code || resp.status
            error._response = resp
            throw error
          }
          if (resp.status >= 500) {
            const error = new Error(resp.statusText)
            error.status_code = resp.status
            error._response = resp
            throw error
          }
        }
        throw err
      })

    if (callback && typeof callback === 'function') {
      promise.then(result => callback(null, result)).catch(err => callback(err))
    } else {
      return promise
    }
  }
}).call(ResourceBase.prototype)

module.exports = ResourceBase