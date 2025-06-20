import AdoptionRequest from '../components/AdoptionRequest'
import styles from './AnimalProfile.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { useState, useRef, useEffect } from 'react'
import {
  HiOutlineArrowSmallRight,
  HiOutlineArrowSmallLeft,
} from 'react-icons/hi2'
import { useParams, useLocation } from 'react-router-dom'
import { useGetAnimalsQuery } from '../redux/animalApi'

const AnimalProfile = () => {
  const { slug } = useParams()
  const location = useLocation()
  const { data, isLoading, error } = useGetAnimalsQuery()
  const animals = data?.data || []

  // slug = "5-barsik"
  const id = Number(slug.split('-')[0])
  const animal = animals.find((a) => a.animal_id === id)

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const rules = [
    'Тварина має бути забезпечена належним доглядом.',
    'Заборонено передавати тварину третім особам без погодження з притулком. Заборонено передавати тварину третім особам без погодження з притулком.Заборонено передавати тварину третім особам без погодження з притулком.',
    "Власник зобов'язується вакцинувати тварину згідно з графіком. Власник зобов'язується вакцинувати тварину згідно з графіком.Власник зобов'язується вакцинувати тварину згідно з графіком.",
    'У разі втрати тварини повідомити притулок протягом 24 годин.',
    'Не використовувати тварину для розведення.',
    'Забезпечити тварині регулярні ветеринарні огляди.',
    'Надавати притулку фото та відео тварини щомісяця.',
    'Не залишати тварину без нагляду більше 12 годин.',
  ]

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current
      swiperInstance.params.navigation.nextEl = nextRef.current
      swiperInstance.navigation.destroy()
      swiperInstance.navigation.init()
      swiperInstance.navigation.update()
    }
  }, [swiperInstance])

  if (isLoading) {
    return <div className={styles.loading}>Завантаження...</div>
  }

  if (error) {
    return <div className={styles.error}>Помилка завантаження даних</div>
  }

  if (!animal) {
    return <div className={styles.noData}>Тварину не знайдено</div>
  }

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
                onSwiper={setSwiperInstance}
                pagination={{ clickable: true }}
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
                className={styles.swiper}
              >
                {animal.photos?.map((photo, index) => (
                  <SwiperSlide
                    key={photo.photo_id}
                    className={styles.swiperSlide}
                  >
                    <img
                      src={`http://127.0.0.1:8000/storage/${photo.photo_path}`}
                      alt={`Фото тварини ${index + 1}`}
                    />
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
                {animal.photos?.map((photo, index) => (
                  <SwiperSlide
                    key={photo.photo_id}
                    className={styles.thumbSlide}
                  >
                    <img
                      src={`http://127.0.0.1:8000/storage/${photo.photo_path}`}
                      alt={`Мініатюра ${index + 1}`}
                    />
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
              <h1 className={styles.animalName}>{animal.name}</h1>
              <ul className={styles.detailsList}>
                {/* переробити вік!!!!!!!!!!!!!!!!!! */}
                <li>Стать: {animal.gender ? 'Хлопчик' : 'Дівчинка'}</li>
                <li>
                  Вік: {animal.age_years} років {animal.age_months} місяців
                </li>
                <li>Вид: {animal.type}</li>
                <li>Розмір: {animal.size}</li>
                <li>Стерилізація: {animal.is_sterilized}</li>
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
                Подарувати родину
              </button>
            </div>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <h2>Додаткова інформація</h2>
          <p>{animal.additional_information}</p>
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
            {/* id або animal_id!!!!!!!!!!!!!!!! */}
            <AdoptionRequest animal_id={animal.animal_id} animal_name={animal.name} />
          </div>
        </div>
        <div className={styles.adoptionRules}>
          <h2 className={styles.labelRules}>Правила адопції</h2>
          <ul className={styles.rulesList}>
            {rules.map((rule, idx) => (
              <li
                key={rule + idx}
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
