var jsonObj;
//Käyttäjän valitsema maa-arvo tuodaan muuttujaan x ja tieto lisätään url-osoitteen perään
function loadJSONDocWithParse() {
  var x = document.getElementById("country").value;
  var url = "https://api.covid19api.com/total/country/" + x;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //saatu vastaus parsitaan ja tallennetaan jsonObj-muuttujaan
      jsonObj = JSON.parse(xmlhttp.responseText);
      //näytetään haettu data kehittäjän työkalussa
      console.log(jsonObj);
      //kutsutaan funktiota, joka parsii datan taulukkoon
      printJSONTable(jsonObj);
    }
  };
}
function printJSONTable(jsonObj) {
  var data = jsonObj;
  //luodaan silmukka, joka käy JSON-datan taulut läpi ja kerää datan out-nimiseen muuttujaan
  var out = "<table>";
  out +=
    //ensin luodaan taulukolle sarakkeille otsikot silmukan ulkopuolella
    "<tr><h3>Valitun maan tautitilanteen kehitys</h3><td><h4>Maa</h4></td><td><h4>Todetut</h4></td><td><h4>Kuolleet</h4></td><td><h4>P&auml;iv&auml;m&auml;&auml;r&auml;</h4></td></tr>";
  for (var i = 0; i < data.length; i++) {
    out += "<tr>";
    //jokaiseen soluun tuodaan jonkun JSON-datan tieto
    out += "<td>" + data[i].Country + "</td>";
    out += "<td>" + data[i].Confirmed + "</td>";
    out += "<td>" + data[i].Deaths + "</td>";
    out += "<td>" + data[i].Date + "</td>";
    out += "</tr>";
  }
  out += "</table>";
  //taulukko suljetaan silmukan lopuksi ja tieto tulostetaan sivulle
  document.getElementById("covid").innerHTML = out;
}
function loadParse() {
  var url2 = "https://api.covid19api.com/world/total";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url2, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      jsonObj = JSON.parse(xmlhttp.responseText);
      // ei luoda taulukkoa, vaan tieto tulostetaan suoraan sivulle tiedolle varattuun diviin + kehittäjän työkaluun
      console.log(jsonObj);
      document.getElementById("covid").innerHTML =
        "<h3>" +
        "Koko maailman tautitilanne" +
        "</h3>" +
        "Todetut: " +
        jsonObj.TotalConfirmed +
        "<br>" +
        "Kuolleet: " +
        jsonObj.TotalDeaths +
        "<br>" +
        "Parantuneet: " +
        jsonObj.TotalRecovered;
    }
  };
}
//haetaan vastaavalla tavalla kuin edelliset haut, mutta eri osoitteesta
function loadParseSummary() {
  var url3 = "https://api.covid19api.com/summary";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url3, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      jsonObj = JSON.parse(xmlhttp.responseText);

      console.log(jsonObj);
      printJSONTable2(jsonObj);
    }
  };
}
//luodaan taulukko, kuten edellä, mutta nyt tieto otetaan Countries-määreellä olevista kentistä
function printJSONTable2(jsonObj) {
  var data = jsonObj;
  var out = "<table>";
  out +=
    //luodaan taulukon sarakkeille otsikot silmukan ulkopuolella
    "<tr><h3>Erittely tautitilanteesta maittain</h3><td><h4>Maa</h4></td><td><h4>Uudet todetut</h4></td><td><h4>Kaikki todetut</h4></td><td><h4>Uudet kuolleet</h4></td><td><h4>Kaikki kuolleet</h4></td><td><h4>Uudet parantuneet</h4></td><td><h4>Kaikki parantuneet</h4></td><td><h4>P&auml;iv&auml;m&auml;&auml;r&auml;</h4></td></tr>";
  for (var i = 0; i < data.Countries.length; i++) {
    out += "<tr>";
    out += "<td>" + data.Countries[i].Country + "</td>";
    out += "<td>" + data.Countries[i].NewConfirmed + "</td>";
    out += "<td>" + data.Countries[i].TotalConfirmed + "</td>";
    out += "<td>" + data.Countries[i].NewDeaths + "</td>";
    out += "<td>" + data.Countries[i].TotalDeaths + "</td>";
    out += "<td>" + data.Countries[i].NewRecovered + "</td>";
    out += "<td>" + data.Countries[i].TotalRecovered + "</td>";
    out += "<td>" + data.Countries[i].Date + "</td>";
    out += "</tr>";
  }
  out += "</table>";
  document.getElementById("covid").innerHTML = out;
}
