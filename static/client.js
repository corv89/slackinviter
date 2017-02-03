var body = document.body;
var request = superagent;

// elements
var select = body.querySelector('select');
var input = body.querySelector('input');
var email = body.querySelector('input[name=email]');
// var first_name = body.querySelector('input[name=fname]');
// var last_name = body.querySelector('input[name=lname]');
var coc = body.querySelector('input[name=coc]');
var button = body.querySelector('button');

// remove loading state
button.className = '';

// capture submit
body.addEventListener('submit', function(ev){
  ev.preventDefault();
  button.disabled = true;
  button.className = '';
  button.innerHTML = 'Please Wait';
  invite(email.value, document.getElementById("g-recaptcha-response").value, function(err){
    if (err) {
      button.removeAttribute('disabled');
      button.className = 'error';
      button.innerHTML = err.message;
    } else {
      button.className = 'success';
      button.innerHTML = 'WOOT. Check your email!';
    }
  });
});


function invite(email, recaptcha_res, fn){
  request
  .post('/invite/')
  .type('form')
  .send({
    email: email,
    fname: ' ',
    lname: ' ',
    "g-recaptcha-response": recaptcha_res
  })
  .end(function(res){
      console.log(res);
    if (res.error) {
      var err = new Error(res.text || 'Server error');
      return fn(err);
    } else {
        fn(null);
    }
  });
}
