const URL = "http://localhost:5555/verify/jwt"

function verifyJWT(jwt, id) {

    fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt,
        },
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('grantAccess', data['access'])
      })
      .catch(err => alert(err))
    
}

export default verifyJWT;