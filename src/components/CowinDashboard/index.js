// Write your code here
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    coverageData: [],
    genderData: [],
    agesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowinDetails()
  }

  getCowinDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccinatio-data'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedCoverageData = data.last_7_days_vaccination.map(eachDay => ({
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
        vaccineDate: eachDay.vaccine_date,
      }))
      const updatedVaccinatedByAgeData = data.vaccination_by_age
      const updatedVaccinatedByGenderData = data.vaccination_by_gender

      this.setState({
        coverageData: updatedCoverageData,
        genderData: updatedVaccinatedByGenderData,
        agesData: updatedVaccinatedByAgeData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinatedDetails = () => {
    const {coverageData, genderData, agesData} = this.state
    return (
      <>
        <div className="vaccination-container">
          <h1 className="vaccination-type">Vaccination Coverage</h1>
          <VaccinationCoverage coverageData={coverageData} />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-type">Vaccination By Gender</h1>
          <VaccinationByGender genderData={genderData} />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-type">Vaccination By Age</h1>
          <VaccinationByAge agesData={agesData} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
    </div>
  )

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderVaccinatedDetails()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN PROGRESS':
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="bg-main-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="logo-name">co-WIN</h1>
          </div>
          <h1 className="description">CoWIN Vaccination in India</h1>
          {this.renderDetails()}
        </div>
      </>
    )
  }
}

export default CowinDashboard
