import './index.css'

const NotFound = () => (
  <div className="pageNotFound-Container">
    <div>
      <img
        src="https://res.cloudinary.com/dk37xrzzu/image/upload/v1717476993/nxtwave/page_not_foung_rlpx2u.png"
        alt="not found"
        className="notFoundImage"
      />
    </div>
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="para-page-notFound">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
