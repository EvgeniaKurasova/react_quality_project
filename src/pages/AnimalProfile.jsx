import AdoptionRequest from '../components/AdoptionRequest'
import styles from './AnimalProfile.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { useState, useRef } from 'react'
import {
  HiOutlineArrowSmallRight,
  HiOutlineArrowSmallLeft,
} from 'react-icons/hi2'

const AnimalProfile = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Тимчасові дані для прикладу
  const images = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop',
  ]

  // Масив правил усиновлення (тимчасово, потім буде з бекенду)
  const rules = [
    'Тварина має бути забезпечена належним доглядом.Тварина має бути забезпечена належним доглядом.Тварина має бути забезпечена належним доглядом.Тварина має бути забезпечена належним доглядом.',
    'Заборонено передавати тварину третім особам без погодження з притулком.',
    "Власник зобов'язується вакцинувати тварину згідно з графіком.",
    'У разі втрати тварини повідомити притулок протягом 24 годин.У разі втрати тварини повідомити притулок протягом 24 годин.У разі втрати тварини повідомити притулок протягом 24 годин.',
    'Не використовувати тварину для розведення.',
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById('adoptionRequest')
    const offset = 100 // відступ зверху
    const elementPosition = formElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.animalProfileContainer}>
      <div className={styles.animalProfile}>
        <div className={styles.animalProfileMain}>
          <div className={styles.sliderWithArrows}>
            <button
              ref={prevRef}
              className={styles.customNavBtn + ' ' + styles.leftNav}
            >
              <HiOutlineArrowSmallLeft size={26} />
            </button>
            <div className={styles.animalGallery}>
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current
                  swiper.params.navigation.nextEl = nextRef.current
                  swiper.navigation.init()
                  swiper.navigation.update()
                }}
                pagination={{ clickable: true }}
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
                className={styles.swiper}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <img src={image} alt={`Фото тварини ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={14}
                slidesPerView={4}
                watchSlidesProgress={true}
                className={styles.thumbsSwiper}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className={styles.thumbSlide}>
                    <img src={image} alt={`Мініатюра ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              ref={nextRef}
              className={styles.customNavBtn + ' ' + styles.rightNav}
            >
              <HiOutlineArrowSmallRight size={26} />
            </button>
          </div>
          <div className={styles.animalInfo}>
            <div className={styles.animalDetails}>
              <h1 className={styles.animalName}>Ім'я тварини</h1>
              <ul className={styles.detailsList}>
                <li>Стать:</li>
                <li>Вік:</li>
                <li>Вид:</li>
                <li>Розмір:</li>
                <li>Стерилізація: Так</li>
              </ul>
              <button
                className={styles.labelRequest}
                onClick={() => {
                  if (!isFormOpen) {
                    setIsFormOpen(true)
                  }
                  setTimeout(scrollToForm, 300)
                }}
              >
                Усиновити
              </button>
            </div>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <h2>Додаткова інформація</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In dolorem
            aspernatur eveniet vitae, fugiat quaerat dolor nostrum ipsam libero
            expedita ad et perspiciatis perferendis itaque facilis maxime.
            Reiciendis, quos aliquam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Omnis ullam nemo voluptatibus. Labore
            necessitatibus temporibus veritatis eos culpa quos sed aperiam vel
            hic vitae amet pariatur, reprehenderit nisi dolorem libero! Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Numquam quod
            dicta animi minima rem! Possimus, assumenda! Itaque quo ullam quia
            qui. Debitis ratione totam tempore assumenda voluptate placeat sunt
            corporis.
          </p>
        </div>
      </div>
      <div className={styles.profileSubPart}>
        <div
          id="adoptionRequest"
          className={`${styles.adoptionRequest} ${
            isFormOpen ? styles.visible : ''
          }`}
        >
          <div className={styles.adoptionSection}>
            <AdoptionRequest />
          </div>
        </div>
        <div className={styles.adoptionRules}>
          <h2 className={styles.labelRules}>Правила усиновлення</h2>
          <ul className={styles.rulesList}>
            {rules.map((rule, idx) => (
              <li
                key={idx}
                className={idx % 2 === 0 ? styles.ruleEven : styles.ruleOdd}
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnimalProfile
