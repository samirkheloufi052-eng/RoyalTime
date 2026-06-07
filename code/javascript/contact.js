function submitContactForm(){
  const success = document.getElementById('successMsg');
  const form = document.getElementById('formArea');
  if(!form || !success) return;

  // basic validation
  const prenom = document.getElementById('prenom').value || '';
  const nom = document.getElementById('nom').value || '';
  const email = document.getElementById('email').value || '';
  const message = document.getElementById('message').value || '';

  if(prenom.length < 2 || nom.length < 2 || !email.includes('@') || message.length < 10){
    alert('Merci de remplir correctement le formulaire (champs requis).');
    return;
  }

  form.style.display = 'none';
  success.style.display = 'block';
}

function resetContactForm(){
  const success = document.getElementById('successMsg');
  const form = document.getElementById('formArea');
  if(!form || !success) return;
  form.querySelectorAll('input,textarea,select').forEach(i=>{ i.value = ''; if(i.type === 'checkbox') i.checked = false; });
  success.style.display = 'none';
  form.style.display = 'block';
}
