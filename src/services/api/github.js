import axios from "axios";

// Github API
const KEY = process.env.REACT_APP_GITHUB_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL_GITHUB
const AETNA_URL = 'https://api.github.com/repos/aetnahealth/employer_provider_service/issues'
// const GRAY_MATTER_URL = 'https://api.github.com/repos/GrayMatterDashboard/graymatter/issues'

const AUTH_HEADER = {
  'Authorization': `token ${KEY}`,
  'Accept': 'application/vnd.github.v3+json'
};

export const getIssues = (_params) => {
  return axios.get(
    `${BASE_URL}issues`,
    {
      headers: AUTH_HEADER
    }
  )
}

export const getAetnaIssues = (_params) => {
  return axios.get(
    `${AETNA_URL}`,
    {
      headers: AUTH_HEADER
    }
  )
}

/**
 * this method is only to get the avatar URL, this needs to be fixed
 * @param {string} - name of org
 * @return {object} 
 */
export const getOrgAvatar = (org) => {
  // FIXME: this can be done better for sure
  const url = `https://api.github.com/orgs/${org}`;
  return axios.get(
    `${url}`,
    {
      headers: AUTH_HEADER
    }
  )

}