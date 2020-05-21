import Cookies from 'js-cookie'
// import HttpRequest from './axios'
import httpClient from './httpClient'

export const postRequest = async (url, params, headers) => {
  const parameters = {
    url,
    method: 'post',
    data: params
  }
  if (headers) parameters.headers = headers
  const data = await httpClient.request(parameters)
  return data
}

export async function post(url, params) {
  try {
    const headers = process.env.NODE_ENV === 'development' ? {
      'Cache-Control': 'no-cache',
      'Postman-Token': '<calculated when request is sent>',
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)',
      Host: 'sports.lifesense.com',
      Connection: 'Keep-Alive',
      'Accept-Encoding': 'gzip',
      cookie: 'appType2=6; userType2=99; gray2=false; appType2=6; userType2=99; gray2=false; session=%7B%22accessToken%22%3A%220bf8629c15044f3680e875eea2b81066%22%2C%22appType%22%3A6%2C%22expireAt%22%3A1592137199229%2C%22loginId%22%3A%2225263416%22%2C%22userType%22%3A99%2C%22gray%22%3Afalse%7D; accessToken2=0bf8629c15044f3680e875eea2b81066; expireAt2=1592137199229; loginId2=25263416; session=%7B%22accessToken%22%3A%220bf8629c15044f3680e875eea2b81066%22%2C%22appType%22%3A6%2C%22expireAt%22%3A1592137199229%2C%22loginId%22%3A%2225263416%22%2C%22userType%22%3A99%2C%22gray%22%3Afalse%7D; accessToken2=0bf8629c15044f3680e875eea2b81066; expireAt2=1592137199229; loginId2=25263416; accessToken=D2A6AFB93531605DBE56DC2EEE74C4C97B201FD911B50BA695092B624476B6D30DAD249C2362C1E3E18D55B155A3F96EA311FDE27A0A967A3B9B46450C7DADD45A08F5210DA8F30D62EB4E8F1AFC0294B8B893AE8CB86FA9687515BA2F96E25A.49061528918F224DFA4F8BC5BFED174FB885716E1DA2A468F0AF3F5B0F951888'
    } : undefined
    const data = await postRequest(url, params, headers)
    return data
  } catch (e) {
    return e
  }
}

export const getRequest = async (url, params) => {
  let urlStr = url + `?${translateParams(params)}`
  let parameters = {
    url: params ? urlStr : url,
    method: 'get'
  }

  const data = await httpClient.request(parameters)
  return data
}

export async function get(url, params) {
  try {
    const data = await getRequest(url, params)
    return data
  } catch (e) {
    return e
  }
}

function translateParams(params) {
  let url = ''
  for (const param in params) {
    url += `${param}=${encodeURIComponent(params[param])}&`
  }
  return url.substring(0, url.length - 1)
}