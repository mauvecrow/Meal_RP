let btns = document.getElementsByClassName('createMPButton');
// console.log(btns);
// btn.addEventListener("click", addMealPlan);
for (let btn of btns) {
    btn.addEventListener("click", addMealPlan)
}

async function addMealPlan(e) {
    let parent = e.target.parentNode;
    let mpIndex = parent.className;
    let date = parent.innerText.split("\n")[0]
    // console.log(date);
    const postUrl = window.location.href;
    try {
        fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'meal-date': date })
        })
            .then(response => response.text())
            .then(text => {
                let div = document.querySelector("." + mpIndex);
                div.innerHTML = text;
            });


    }
    catch (e) {
        console.log(e);
    }
}

