import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AnimalsTable from '../components/admin/AnimalsTable'
import AdoptionRequestsTable from '../components/admin/AdoptionRequestsTable'
import UserTable from '../components/admin/UserTable'
import ShelterInfo from '../components/admin/ShelterInfo'
import AdminHome from '../components/admin/AdminHome'
import '../styles/pages.css'
import AddAnimal from '../components/admin/AddAnimal'
import { useNavigate } from 'react-router-dom'
import styles from './Admin.module.css'

const Admin = () => {
  const [animals, setAnimals] = useState([])
  const [requests, setRequests] = useState([])
  const navigate = useNavigate()

  const handleEditAnimal = (id) => {
    console.log('Edit animal:', id)
  }

  const handleDeleteAnimal = (id) => {
    console.log('Delete animal:', id)
  }

  return (
    <div className="admin-page">
      <Routes>
        <Route index element={<AdminHome />} />
        <Route
          path="animals"
          element={
            <div className="admin-content">
              <div className="admin-header">
                <Link to="/admin" className="back-button">
                  ← Назад
                </Link>
                <h1>Тварини</h1>
                <button
                  className={styles.addButton}
                  onClick={() => navigate('add-animal')}
                >
                  + Додати тварину
                </button>
              </div>
              <AnimalsTable
                // animals={animals}
                // editAnimalRecord={handleEditAnimal}
                // deleteAnimalRecord={handleDeleteAnimal}
              />
            </div>
          }
        />
        <Route
          path="adoption-requests"
          element={
            <div className="admin-content">
              <div className="admin-header">
                <Link to="/admin" className="back-button">
                  ← Назад
                </Link>
                <h1>Запити на усиновлення</h1>
              </div>
              <AdoptionRequestsTable />
            </div>
          }
        />
        <Route
          path="users"
          element={
            <div className="admin-content">
              <div className="admin-header">
                <Link to="/admin" className="back-button">
                  ← Назад
                </Link>
                <h1>Зареєстровані користувачі</h1>
              </div>
              <UserTable />
            </div>
          }
        />
        <Route
          path="shelter-info"
          element={
            <div className="admin-content">
              <div className="admin-header">
                <Link to="/admin" className="back-button">
                  ← Назад
                </Link>
                <h1>Інформація про притулок</h1>
              </div>
              <ShelterInfo />
            </div>
          }
        />
        <Route path="add-animal" element={<AddAnimal />} />
      </Routes>
    </div>
  )
}

export default Admin
