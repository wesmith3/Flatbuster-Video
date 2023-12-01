const URL = "http://localhost:5555/verify/jwt"

function verifyJWT(jwt, id) {
    if (!jwt || !id) {
      localStorage.clear()
    }
    fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('isLoggedIn', data['access'])
      })
      .catch(err => alert(err))
    
}

export default verifyJWT;