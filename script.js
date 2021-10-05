const totalCases = document.querySelector(".total"),
        activeCases = document.querySelector(".active"),
        totalDeaths =  document.querySelector(".deaths"),
        totalRecovered =  document.querySelector(".recovered"),
        criticalCases =  document.querySelector(".critical"),
        affectedCountry =  document.querySelector(".affected");

        const tbody = document.querySelector(".tbody");
        const search = document.querySelector(".search-text");

var allData = ``;
var i =1;
    // function to get and show covid data from all over the world
      async  function getAllData(){
            let data = await fetch("https://corona.lmao.ninja/v2/all")
            .then(async(data)=>{
                let res = await data.json();
                return res;
            }).then((result)=>{
                showAllData(result);
            })
        }
        function showAllData(data){
            const {cases,active,deaths,recovered,critical,affectedCountries} = data;
            totalCases.innerHTML = cases;
            activeCases.innerHTML=active;
            totalDeaths.innerHTML=deaths;
            totalRecovered.innerHTML=recovered;
            criticalCases.innerHTML=critical;
            affectedCountry.innerHTML=affectedCountries;
        }



        // Function to get and show all countries covid data in table
        async function getCountriesData(){
            let data = await fetch("https://corona.lmao.ninja/v2/countries")
            .then(async (data)=>{
                return await data.json();
            })
            .then((result)=>{
               showCountriesData(result);
            })
        }

        function showCountriesData(data){
            data.forEach((result)=>{
               allData+=
               `
               <tr>
               <td>${i++}</td>
               <td>${result.continent}</td>
               <td>${result.country}</td>
               <td><img src="${result.countryInfo.flag}" style="width:70px; height:40px;"  /></td>
               <td>${result.cases}</td>
               <td>${result.deaths}</td>
               <td>${result.active}</td>
               <td>${result.critical}</td>
               <td>${result.recovered}</td>
               <td>${result.todayCases}</td>
               <td>${result.todayDeaths}</td>
               <td>${result.todayRecovered}</td>
                </tr>
               `;
            })
            tbody.innerHTML=allData;
        }

        getCountriesData();
        getAllData();

        $(document).ready(function(){
            $(".search-text").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $(".tbody tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
          });