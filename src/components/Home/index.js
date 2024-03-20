import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    const {history} = props

    history.replace('/ebank/login')
  }
  const loguoutPage = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-Container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="image-logo"
        />
        <button type="button" className="log-out-button" onClick={loguoutPage}>
          Logout
        </button>
      </div>
      <div className="bottom-section">
        <h1 className="heading-bottom-section-home">
          Your Flexibility, Our Excellence
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-visa-image"
        />
      </div>
    </div>
  )
}
export default Home
