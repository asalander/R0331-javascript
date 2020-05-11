//Lisää-nappi html-tiedostossa onclick=createNewElement

var myToDo = document.getElementsByTagName("li");
var index;
for (index = 0; index < myToDo.length; index++) {
  var span = document.createElement("SPAN");
  var someTxt = document.createTextNode("POISTA");
  span.className = "hide";
  span.appendChild(someTxt);
  myToDo[index].appendChild(span);
}
//Poista-nappi piilottaa rivit (ajetetaan myös function ulkopuolella)
var poistaButton = document.getElementsByClassName("hide");
var i;
for (i = 0; i < poistaButton.length; i++) {
  poistaButton[i].onclick = function () {
    var TheDel = this.parentElement;
    TheDel.style.display = "none";
  };
}
//Etsitään luettelo(li) ja lisätään kuuntelija, joka klikkaamalla suorittaa funktion (ylivivaa, kts. CSS)
var ulLista = document.querySelector("ul");
ulLista.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    }
  },
  false
);

//Luodaan uusi listaelementti (li) ja otetaan arvo input-kentästä (kirjoituskenttä) ja liitetään (append) teksti listaan(li)
function createNewElement() {
  var li = document.createElement("li");
  var newitem = document.getElementById("input").value;
  var textNode = document.createTextNode(newitem);
  li.appendChild(textNode);
  //mikäli input-kentässä ei ole arvoa, annetaan ilmoitus ja väri, muussa tapauksessa tehdään luettelo(ul)
  if (newitem === "") {
    input.style.borderColor = "DeepPink";
    document.getElementById("feedback").innerHTML =
      "* Sinun tulee syöttää tekstiä";
  } else {
    document.getElementById("lista").appendChild(li);
  }
  //muutetään input-kentän arvo tyhjäksi
  document.getElementById("input").value = "";

  //luodaan poistomerkki (span) nimeltään POISTA ja lisätään se listaan(li)
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("POISTA");
  span.classname = "hide";
  span.appendChild(txt);
  li.appendChild(span);
  //luodaan silmukka, joka käy li-listan läpi ja poista-nappia painamalla rivi piilotetaan

  for (i = 0; i < poistaButton.length; i++) {
    poistaButton[i].onclick = function () {
      var TheDel = this.parentElement;
      TheDel.style.display = "none";
    };
  }
}
//Koko listan tyhjentäminen
function removeAll() {
  var del = document.getElementsByTagName("ul");
  del[0].innerHTML = "";
}
