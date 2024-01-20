var receipesArr = [];
var links= document.getElementsByClassName("getFood");
var recipeDetalies;
for(var i=0;i<links.length;i++)
{
    links[i].addEventListener("click",function(e)
    {
        var currentMeal= e.target.text;
        getRecipes(currentMeal)
    })
}

 getRecipes("pizza");

function getRecipes(meal)
{
        var httpRequest=new XMLHttpRequest;
        httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
        httpRequest.send();
        httpRequest.addEventListener("readystatechange",function()
        {
            if(httpRequest.readyState==4&&httpRequest.status==200)
            {
                receipesArr=JSON.parse(httpRequest.response).recipes;
            }
            displayReceipes();
        })
}

function displayReceipes()
{
    var cols = '';
    for(var i=0;i<receipesArr.length;i++)
    {
       cols+=
       `
       <div class="col-md-3 my-3">
            <div class="receipe ">
                <img src="${receipesArr[i].image_url}" class="w-100 rounded-3 recipe-img" alt="Food">
                <div class="sizeheading  mt-3">
                <h5 class="">${receipesArr[i].title}</h5>
                </div>
                <a target="_blank" href="${receipesArr[i].source_url}" class="btn coolBeans mt-4 me-2">Source</a>
                <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleRecipe(${receipesArr[i].recipe_id})" class="btn glow-on-hover mt-4">Details</a>
            </div>
       </div>
       `
    }
     document.getElementById("recipesRow").innerHTML=cols; 
}

async function getSingleRecipe(details)
{
    var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${details}`)
    recipeDetails= await response.json();
    displaySingleRecipe()
}

function displaySingleRecipe()
{
    var details = recipeDetails.recipe;
    var recipeDetailsData=
    `
        <img class="details-img w-100 rounded-3"  src="${details.image_url}" alt="Food" >
        <h2>${details.title}</h2>
    

    `;
    document.getElementById("recipeData").innerHTML=recipeDetailsData;  
    console.log(details.ingredients)
    var ingredients=details.ingredients;
    var ingredientsDetails='';
    for(var i=0;i<ingredients.length;i++)
    {
        ingredientsDetails+=
                                `
                                <li class="li-icon">${ingredients[i]}</li>
                            
                                `
    }
    console.log(ingredientsDetails)
    document.getElementById("ingredientList").innerHTML=ingredientsDetails;  
}

    // ----------------------scrolling-------------------------------
    let demoOffcet=$("#demo").offset().top;
    $(window).scroll(function(){
        let currentOffcet=$(window).scrollTop();
        if(currentOffcet>demoOffcet)
        {
            $(".navbar").css("background-color","#fff")
            $("#topBtn").fadeIn(2000)
        }
        else
        {
            $(".navbar").css({"background-color":"#000","transition":"all 1s"})
            $("#topBtn").fadeOut(2000)
        }
    })

    $(".getFood").click(function(){
        let curLink=$(this).attr("href");
        let curOffset=$(curLink).offset().top;
        $("body ,html").animate({scrollTop:curOffset},2000)
    })
    
    $("#topBtn").click(function(){
        $("body ,html").animate({scrollTop:0},1000)
    })

    // --------------------------loadScreen-------------------------------

    $(document).ready(function(){
         $(".loadingScreen").fadeOut(4000, function(){
         $("body").css("overflow","auto")
         })
    })