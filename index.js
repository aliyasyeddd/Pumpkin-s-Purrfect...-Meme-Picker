import { catsData } from "./data.js"


const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn");
const gifOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')


emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    // remove all instances of the highlight class
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifOnlyOption.checked;
        const matchingCatsArray = catsData.filter((cats) => {
            if (isGif) {
                return cats.isGif && cats.emotionTags.includes(selectedEmotion)
            } else {
                return cats.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }

}

function renderCat() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `<img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
    memeModal.style.display = "flex"
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    let radioItems = ""
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
          <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            />
       </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)