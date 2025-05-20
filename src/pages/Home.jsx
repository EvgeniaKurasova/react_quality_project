import Filter from '../components/Filter'
import styles from './Home.module.css'
import { NavLink } from 'react-router-dom'

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
  return (
    <div className={styles.container}>
      <div className={styles.mainPart}>
        <h1 className={styles.title}>EDWAKPRESETS // STORE</h1>
        <div className={styles.subtitle}>High Quality Lightroom Presets</div>
      </div>
      <div>
        <Filter />
      </div>
      <div className={styles.postsGrid}>
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
            <button className={styles.postButton}>
              <NavLink to="animal_profile">Переглянути профіль</NavLink>
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
