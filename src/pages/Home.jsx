import Filter from '../components/Filter'
import styles from './Home.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useGetAnimalsQuery } from '../redux/animalApi'
import AnimalCards from '../components/AnimalCards'
import { useEffect } from 'react'
import image_url from '../assets/anoir-chafik.jpg'

const posts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Medieval Preset',
    gender: 'male',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'Master Collection',
    gender: 'female',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'Urban Mood',
    gender: 'female',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    title: 'Nature Tones',
    gender: 'male',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
    title: 'Portrait Magic',
    gender: 'female',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    title: 'Golden Hour',
    gender: 'male',
  },
]

const Home = () => {
  const location = useLocation()
  useEffect(() => {
    if (location.state?.scrollToAnimalCards) {
      const animalCardsSection = document.getElementById('animal-cards')
      if (animalCardsSection) {
        animalCardsSection.scrollIntoView({ behavior: 'smooth' })
      }
      // Очищаємо стан після скролу
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return (
    <div className={styles.container}>
      {console.log(image_url)}
      <div className={styles.mainPart}
       style={{
        backgroundImage: `url(${image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 80%',
        width: "100%",
        height: "100vh",
        objectFit: 'cover',
        objectContain: 'cover'
      }}>
        <h1 className={styles.title}>Animal Shelter</h1>
        {/* EDWAKPRESETS // STORE */}
        {/* High Quality Lightroom Presets */}
        <div className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
          voluptatibus optio soluta, itaque iste ut porro. Excepturi, nesciunt
          ipsum! Incidunt voluptatum veniam ratione iure expedita quam,
          inventore officia eum illum!
        </div>
      </div>
      <div>
        <Filter />
      </div>
      <section id="animal-cards">
        <AnimalCards />
      </section>
      {/* <div className={styles.postsGrid}>
        {posts.map((post) => (
          <div className={styles.postCard} key={post.id}>
            <div className={styles.animalImageWrapper}>
              <img
                className={styles.animalImage}
                src={post.image}
                alt={post.title}
              />
            </div>
            <div className={styles.postInfo}>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postDesc}>{post.gender}</div>

              <NavLink to="animal_profile">
                <button className={styles.postButton}>
                  Переглянути профіль
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Home
