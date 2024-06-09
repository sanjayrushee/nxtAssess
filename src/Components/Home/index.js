import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="main-container-home">
      <div className="instruction-container-home">
        <h1 className="heading-home">Instructions</h1>
        <ol className="unOrder-list-home">
          <li className="list-home">Total question : 10</li>
          <li className="list-home">Types of Questions: MCQs</li>
          <li className="list-home">Duration: 10 Mins</li>
          <li className="list-home">
            Marking Scheme: Every Correct response, get 1 mark
          </li>
          <li className="list-home">
            All the progress will be lost, if you reload during the assessment
          </li>
        </ol>
        <Link to="/assessment">
          <button className="button-home" type="button">
            Start Assessment
          </button>
        </Link>
      </div>
      <div className="image-container-home">
        <img
          src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/home_wbld4w.png"
          alt="home logo"
          className="home-image"
        />
      </div>
    </div>
  </>
)

export default Home
