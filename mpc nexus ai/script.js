async function solveQuestion(){

const input =
document.getElementById(
"questionInput"
).value;

const box =
document.getElementById(
"answerBox"
);

box.innerHTML =
"🤖 AI is thinking...";

try{

const response =
await fetch(
"http://localhost:3000/ask",
{

method:"POST",

headers:{
"Content-Type":
"application/json",
},

body:JSON.stringify({
question:input,
}),

});

const data =
await response.json();

typeEffect(
data.answer,
box
);

}catch(error){

box.innerHTML =
"❌ Error connecting to AI";

}

}



function typeEffect(
text,
element
){

element.innerHTML = "";

let index = 0;

const interval =
setInterval(() => {

element.innerHTML +=
text.charAt(index);

index++;

if(index >= text.length){

clearInterval(interval);

}

},15);

}



tsParticles.load(
"particles-js",
{

particles:{

number:{
value:80,
},

color:{
value:"#60a5fa",
},

links:{
enable:true,
color:"#60a5fa",
opacity:0.3,
},

move:{
enable:true,
speed:1,
},

size:{
value:2,
},

opacity:{
value:0.5,
},

},

background:{
color:"transparent",
},

}
);





const questionPools = {

math:[

"Differentiate x² + 5x",
"Integrate x² dx",
"Find roots of x² + 7x + 12",
"What is sin 90° ?",
"Find derivative of sin x",
"What is cos 0° ?",
"Solve 2x + 5 = 15",
"What is tan 45° ?",
"Expand (a+b)²",
"What is log₁₀ 100 ?",
"Differentiate x³",
"Find area of circle formula",
"What is π value?",
"Solve x² = 49",
"What is sec θ ?",
"Find slope formula",
"What is integration?",
"What is differentiation?",
"Find LCM of 12 and 18",
"What is probability formula?"

],



physics:[

"What is Newton's Second Law?",
"Define velocity",
"What is acceleration?",
"What is kinetic energy formula?",
"What is Ohm's Law?",
"SI unit of force?",
"What is gravity?",
"Define momentum",
"What is power formula?",
"What is current?",
"What is voltage?",
"Define displacement",
"What is speed?",
"What is inertia?",
"What is friction?",
"Define work done",
"What is energy?",
"Define force",
"What is resistance?",
"What is wave motion?"

],



chemistry:[

"What is atomic number?",
"Chemical symbol of Sodium?",
"What is pH scale?",
"Define atom",
"What is molecule?",
"Formula of water?",
"What is HCl?",
"What is NaCl?",
"Define valency",
"What is periodic table?",
"Define compound",
"What is mixture?",
"What is acid?",
"What is base?",
"What is salt?",
"What is oxidation?",
"What is reduction?",
"Define electron",
"What is proton?",
"What is neutron?"

]

};



let usedQuestions = {
math:[],
physics:[],
chemistry:[]
};



function generateSubjectQuiz(
subject
){

const subjectQuestions =
questionPools[subject];



if(
usedQuestions[subject].length
=== subjectQuestions.length
){

usedQuestions[subject] = [];

}



let randomIndex;

do{

randomIndex =
Math.floor(
Math.random() *
subjectQuestions.length
);

}while(
usedQuestions[subject]
.includes(randomIndex)
);



usedQuestions[subject]
.push(randomIndex);



const selectedQuestion =
subjectQuestions[randomIndex];



document.getElementById(
"quizQuestion"
).innerHTML =
selectedQuestion;

}