const AnimalCard = () => {
  return (
    <div>
      <div>
        {/* {animal.photo ? (
        <img src={animal.photo} alt={animal.name} className="animal-photo" />
      ) : (
        <div className="no-photo">
          <p>Зараз фото немає</p>
        </div>
      )} */}
        <img alt="foto" />
      </div>
      <div>
        <h2>Name</h2>
        <h3>Sex</h3>
        <h3>Age</h3>
        <button>More Details</button>
      </div>
    </div>
  )
}

export default AnimalCard
