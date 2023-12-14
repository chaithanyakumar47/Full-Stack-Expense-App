async function save(event){
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    
    
    const userData = {
        name,
        phone,
        email
    };
    try {
        const res = await axios.post('http://localhost:3000/user/add-user', userData);
        //console.log(res);
        showUser(res.data.newUserDetail);
        console.log(res.data.newUserDetail)
    } catch (err) {
        console.error(err);
    }
}

function showUser(user){
    const parent = document.getElementById('users');
    const child = `<li id = ${user.id}> ${user.name} - ${user.phone} - ${user.email}
        <button onclick=deleteUser('${user.id}')>Delete</button>
        <button onclick=editUser('${user.id}','${user.name}','${user.phone}','${user.email}')>Edit</button>
        </li>`
    parent.innerHTML = parent.innerHTML + child;
}

function editUser(userId, name, phone, email) {
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;

}

async function deleteUser(userId) {
  try{
    await axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
    const parent = document.getElementById('users');
    const child = document.getElementById(userId);
    parent.removeChild(child);
  } catch (err) {
    console.log(err);
  }

    
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/user/get-users')
    .then(res => {
        for(var i=0; i<res.data.allUsers.length; i++){
            showUser(res.data.allUsers[i])
            }
        // console.log(res.data.allUsers)
    }).catch(err => console.log(err));
})