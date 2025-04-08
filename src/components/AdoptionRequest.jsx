const AdoptionRequest = () => {
  return (
    <form>
      <div>
        <label>Name</label>
        <input type="name" id="name" value="" onChange="" required />
      </div>
      <div>
        <label>City</label>
        <input type="city" id="city" value="" onChange="" />
      </div>
      <div>
        <label>Phone</label>
        <input type="phone" id="phone" value="" onChange="" required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" id="email" value="" onChange="" required />
      </div>
      <div>
        <label>Comment</label>
        <input type="comment" id="comment" value="" onChange="" />
      </div>
      <button>Send request</button>
    </form>
  )
}

export default AdoptionRequest
