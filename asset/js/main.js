// corona api

let state = document.getElementById('state');
let confirm = document.getElementById('confirm');
let active = document.getElementById('active');
let death = document.getElementById('death');
let recover = document.getElementById('recovered');

document.getElementById('detail').style.display = "none"
let form = document.getElementById('form')
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let input = document.getElementById('inputdata').value;
    $.ajax({
        url: `https://data.covid19india.org/data.json`,
        datatype: "json",
        method: "GET",
        success: function (res) {
            for (let i = 0; i < res.statewise.length; i++) {
                if (input.toLowerCase() === res.statewise[i].state.toLowerCase()) {
                    const stat = res.statewise[i]
                    // console.log(stat);
                    state.innerHTML = stat.state
                    confirm.innerHTML = stat.confirmed
                    active.innerHTML = stat.active
                    death.innerHTML = stat.deaths
                    recover.innerHTML = stat.recovered

                    document.getElementById('detail').style.display = "block"
                }
            }
        }
    })
    document.getElementById('suggestion-list').style.display = "none"
    document.getElementById('inputdata').value = ""
})

function suggestionsList() {
    let input = document.getElementById('inputdata').value;
    let suggestedList = document.getElementById('suggestion-list')

    suggestedList.innerHTML = ""
    $.ajax({
        url: `https://data.covid19india.org/data.json`,
        datatype: "json",
        method: "GET",
        success: function (res) {
            for (let i = 0; i < res.statewise.length; i++) {
                const stat = res.statewise[i].state
                const data = stat.split("  ")
                data.forEach(suggestion => {
                    if (suggestion.toLowerCase().startsWith(input.toLowerCase())) {
                        if (input.length > 0) {
                            suggestedList.innerHTML += `<li class="" onclick="pass(this)">${suggestion}</li>`
                            document.getElementById('suggestion-list').style.display = "block"
                        }else{
                            document.getElementById('suggestion-list').style.display = "none"
                        }
                    }
                })
            }
        }
    })
}
function pass(id){
    inputdata.value = id.innerHTML
    var stateName = id.innerHTML;
    $.ajax({
        url: `https://data.covid19india.org/data.json`,
        datatype: "json",
        method: "GET",
        success: function (res) {
            for (let i = 0; i < res.statewise.length; i++) {
                if (stateName.toLowerCase() === res.statewise[i].state.toLowerCase()) {
                    const stat = res.statewise[i];
                    state.innerHTML = stat.state;
                    confirm.innerHTML = stat.confirmed;
                    active.innerHTML = stat.active;
                    death.innerHTML = stat.deaths;
                    recover.innerHTML = stat.recovered;
                    document.getElementById('detail').style.display = "block";
                }
            }
        }
    });
    document.getElementById('suggestion-list').style.display = "none"
    document.getElementById('inputdata').value = ""
}