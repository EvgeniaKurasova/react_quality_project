import ForgotPassword from '../components/ForgotPassword.jsx'
import SignInForm from '../components/SignIn.jsx'
import SignUp from '../components/SignUp.jsx'
import styles from './About.module.css'
import img_about_page from '../assets/justin-veenema.jpg'
const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutMainContent}>
        <img
          className={styles.imgAboutPage}
          alt="img_about_page"
          src={img_about_page}
        />
        <div className={styles.textAboutPage}>
          <h2 className={styles.titleAboutPage}>About Us</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eos
          velit, officiis quaerat recusandae reprehenderit vel in nulla!
          Laudantium quibusdam fuga officia eligendi autem accusamus, illum ad
          enim necessitatibus sunt? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Debitis est repellat quo consectetur ullam, dolores
          soluta minima porro enim ipsam et a fuga, nobis dignissimos iusto
          officia. Asperiores, sint accusamus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Id quibusdam explicabo, sint at iusto
          nesciunt beatae exercitationem dolorum eaque labore enim eveniet
          repellendus, repellat neque laboriosam, natus excepturi. Accusamus,
          nesciunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Sequi similique id reiciendis provident repellat impedit dicta, quos
          veniam asperiores, officia magnam nisi qui, numquam dolorem expedita
          officiis quam laborum aut? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolores, saepe error obcaecati tempora aut
          voluptatibus nisi sed unde quia beatae dolor impedit eos fuga iure
          similique alias voluptatum ipsum dignissimos? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Repellat hic consequatur corporis
          quia eum laudantium quam officiis necessitatibus doloremque maiores
          excepturi, iusto itaque voluptate neque corrupti, qui vero ex ipsam?Dolores, saepe error obcaecati tempora aut
          voluptatibus nisi sed unde quia beatae dolor impedit eos fuga iure
          similique alias voluptatum ipsum dignissimos? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Repellat hic consequatur corporis
          quia eum laudantium quam officiis necessitatibus doloremque maiores
          excepturi, iusto itaque voluptate neque corrupti, qui vero ex ipsam?
        </div>
      </div>
      <div className={styles.aboutSubContent}>
        <h3 className={styles.aboutSubText}>Картка для підтримки притулку</h3>
        <div className={styles.aboutCardNumber}>2222 2222 2222 2222</div>
      </div>
      <SignInForm />
      <SignUp />
      <ForgotPassword />
    </div>
  )
}

export default About
