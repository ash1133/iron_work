;

document.addEventListener("DOMContentLoaded", function() {
    const quiz = new ASH_quiz()
    quiz.initializeQuiz()
}, {passive:true});

class ASH_quiz {
    quiz = document.querySelector('[data-quiz]')
    stepContainer = this.quiz.querySelector('[data-quiz-steps]')
    quizNext = this.quiz.querySelector('[data-quiz-btn-navigation="next"]')
    quizPrev = this.quiz.querySelector('[data-quiz-btn-navigation="prev"]')
    finalStep = document.createElement('div')
    progress = document.createElement('div')
    bar = document.createElement('ul')
    counter = document.createElement('span')
    steps = null
    curStep = 0

    initializeQuiz(n = 0){
        this.curStep = n
        this.ShowBtns(this.curStep)

        this.quizPrev.addEventListener('click', this.NavQuizPrev)
        this.quizNext.addEventListener('click', this.NavQuizNext)

        this.finalStep.setAttribute('data-quiz-step','final')
        this.finalStep.classList.add('b-quiz__quiz__item')
        this.finalStep.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="148" height="128" viewBox="0 0 148 128" fill="none">
            <path d="M111 1.44856e-06L148 64L111 128H37L0 64L37 0L111 1.44856e-06Z" fill="black"/>
            <path d="M111 1.44856e-06L37 128L0 64L37 0L111 1.44856e-06Z" fill="#424653"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M82.8529 53.8864C72.7673 63.174 64.2822 70.9941 63.9972 71.2643L63.4791 71.7559L55.5474 63.3456C51.1851 58.72 47.5515 54.9567 47.4728 54.9827C47.3943 55.0087 45.0057 57.1891 42.165 59.8277L37 64.6252L37.5271 65.2255C37.8168 65.5557 43.6141 71.715 50.4097 78.9129L62.7656 92L63.5681 91.2269C64.0096 90.8017 74.6192 81.0328 87.145 69.5183C99.6708 58.0036 110.162 48.3491 110.459 48.0637L111 47.5448L106.933 43.1649C104.697 40.7559 102.49 38.3833 102.029 37.8924L101.19 37L82.8529 53.8864Z" fill="white"/>
        </svg>
        <div class="b-quiz__quiz__item__final__title">Ваша заявка принята!<br>Мы скоро с вами свяжемся</div>`

        this.stepContainer.append(this.finalStep)


        this.steps = this.quiz.querySelectorAll('[data-quiz-step]')

        this.steps[this.curStep].classList.add('active')
        this.progress.classList.add('b-quiz__quiz__progress')
        this.bar.setAttribute('data-quiz-progress','true')

        this.ActiveBar(this.curStep)
        this.ActiveCounter(this.curStep)

        this.progress.append(this.bar)
        this.progress.append(this.counter)
        this.quiz.prepend(this.progress)
    }

    NavQuizNext = ()=>{
        // this.curStep++
        this.curStep = this.curStep < this.steps.length ? this.curStep+1 : this.steps.length

        this.ShowBtns(this.curStep)
        this.ActiveCounter(this.curStep)
        this.ActiveBar(this.curStep)

        for (let i = 0; i < this.steps.length; i++)
            if (i === this.curStep)
                this.steps[i].classList.add('active')
            else
                this.steps[i].classList.remove('active')
    }
    NavQuizPrev = ()=>{
        this.curStep = this.curStep > 0 ? this.curStep - 1 : 0
        console.log(this.curStep)

        this.ShowBtns(this.curStep)
        this.ActiveCounter(this.curStep)
        this.ActiveBar(this.curStep)

        for (let i = 0; i < this.steps.length; i++)
            if (i === this.curStep)
                this.steps[i].classList.add('active')
            else
                this.steps[i].classList.remove('active')
    }

    ActiveCounter(n= 0){
        this.counter.innerHTML = '<span>Шаг <i data-quiz-current>'+(n+1)+'</i> из <i data-quiz-total>'+(this.steps.length - 1)+'</i></span>'
    }
    ActiveBar (n = 0) {
        this.bar.innerHTML = '';

        for (let i = 0; i < (this.steps.length - 1); i++){
            const barElem = document.createElement('li')
            if(i <= n)
                barElem.classList.add('active')
            this.bar.append(barElem)
        }
    }

    ShowBtns (n) {
        if (n) {
            this.quizPrev.classList.remove('d-none')
            this.quizNext.classList.remove('w-100')
        } else {
            this.quizPrev.classList.add('d-none')
            this.quizNext.classList.add('w-100')
        }
    }
}
;