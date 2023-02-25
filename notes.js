/* SC REACT */

/* SC Component, props, states */

/*
index.js is the first code ran (after its compilation with Babel ?)
*/

/* SC COMPONENT */
/*

component = custom HTML element


app.jsx will be the highest order component, at the top of the component tree

A COMPONENT IN REACT IS JUST A JS FX

LOWER CASE STARTING ELEMENTS ARE  ARE INTERPRETED AS HTML ELEMENTS FOR REACT : <div>
UPPERCASE STARTING ELEMENT ARE INTERPRETED AS CUSTOM COMONENTS : <Expense>



IN ONE COMPONENT, ONLY ONE ROOT IS ALLOWED SO WE CAN NEST EVERYTHING IN ONE DIV


FOR CSS IN GENERAL WE ADD THE CSS NODE NEXT TO ITS COMPONENT
To add it in a component : import the css file to the component.jsx : import "./ExpenseItem.css"

TO ADD CLASS WE ADD "className" and not "class"




TO ADD DYNAMIC DATA :
<h2>{expenseTitle}</h2>
<div>{expenseDate.toISOString()}</div>
*/
/* !SC */

/* SC PROPS */
/*
props = properties
COMPONENTS CANT USE DATA STORED IN OTHER COMPONENTS THATS ALSO WHY WE NEED PROPS



- We define our data in app.jsx (an array of objects?) :

 const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2021, 2, 12)
    },
]

- In App.jsx we indicate our components and its attributes :
   <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date} >
    </ExpenseItem>


- In our component file, we use the attributes data passed as props :

function ExpenseItem(props) {
  return (

    <div className="expense-item">
      <div>{props.date.toISOString()}</div>

      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price ">{props.amount}</div>
      </div>
    </div>
  )
}

--> PROPS ARE OBJECTS WITH ATTRIBUTES PASSED INTO CUSTOM COMPONENTS

--> YOU PASS PROPS AS YOUR COMPONENT ARGUMENT AND THEN YOU CAN ACCESS THIS PROP OBJECT INSIDE YOUR COMPONENT // THIS OBJECT REFERS TO THE ATTRIBUTES YOU USED YOUR COMPONENT WITH IN YOUR PARENT COMPONENT
PROPS REFERS TO WHAT HAS BEEN PASSED FROM PARENT OFTEN


--> PROPS PASS DATA FROM A COMPONENT TO A DIRECT CHLD COMPONENT
WE CANNOT PASS DATA WITH PROPS TO A INDIRECT CHILD SO IF WE WANT TO USE DATA IN CHILD 2 WE NEED TO PASS TO CHILD 1 FIRST AND CHILD 1 WILL PASS TO CHILD 2
*/

/* DONT FORGET EVEN ONCLICK ARE JUST PROP SO WE CAN DRILL IT ALSO */
/* !SC */

/* SC SPLITTING COMPONENTS */
/*
No hard rule for hwen we should split component
*/
/* !SC */

/* SC Container to pass style (not a must)*/
/*
LESSON 40
We create card component that just return a div and classname
So we use our custom component to encapsulate
We encapsulated another component in it to avoid repetition in styling

BUT out of the box we can't use a custom component as wrapper. By default it works only for built in HTML elements
We can enable custom component as wrapper we need to :
  - make custom component accept props --> (props)*
  - inside the component function, output props.children --> return <div> className = "card">{props.children}</div>

The value of this special childrne prop will always be the content between the opening and closing tags of my custom component



Little trick :   const classes = "card " + props.className; // will output "card " followed by anything that will be received as a className from outside for Card

So in the example we use the Card wrapper to wrap around anything that had commun styling (overall wrapper and )
*/

/* !SC */

/* SC STATES */
/*SC Event handling*/
/*
We add a special prop to our component or html element that starts with "on" e.g "onClick"
We define the event function inside the component(1) but before its return part and then we inline point to this function variable (2)
  (1) const clickHandler = () => { console.log("CLICKED!") };
  (2) <button onClick={clickHandler}>Change Title</button>

We can have multiple states in one component but having one state instead is another possibility (#55) by calling useState but passing an object inside

WE CAN PASS OTHER THINGS TO ONCLICK VERY USEFUL TO KNOW E.G ON WHICH BUTTON USER CLICKED :
onClick={() => handleClickTest(btn.id)}

PAS OBLIGE DE FAIRE POINTER :
 onClick={() => addItemHandler(id)}>



WE CAN ALSO GET HTML ELEMENT LIKE ID LIKE THIS INLINE
<button onClick={event => handleClick(event, 'hello world')}>
  Click
</button>


*/

/* !SC */

/*SC Change the state with useState() fx (returns array) */
/*
Because React call all functions (=components) only on initial rendering, we cannot use event listener etc like in plain jss.
We need to import "useState" from the react lib
  import {useState} from "react"
useState is a fx that allows us to define values as state where changes to this value should reflect in the component function called again
useState is a react hook. Hooks must ONLY be called inside react component functions and start with "use"

Inside our component function, we call useState and add the initial value as argument
  - useState(props.title) --> props.title will be used as initial value ONLY for the 1st time ofc
  - useState returns an array where : [0] is the current state value itself and [1] is the state updating function

  - we generally use array destructuring on useState
    - const [title, setTitle] = useState(props.title) --> props.title is the initial value (1st time)

  - Then, inside the eventHandler, we pass new value to setTitle : setTitle("Updated!")

The component function in which we call the state updating function (e.g setTitle) will be executed again (and re rendered) but ONLY this component. So every component has its own state

TO BE REMINDED : IF STATE UPDATE DEPENDS ON PREVIOUS STATE (e.g counter) NEED TO USE SPECIFIC FUNCTION IN the changeHandler : #56 - 3.30
=> If you update state that depends on the previous state, you should use the "function form" of the state updating function instead == passing a fx as a callback to the updating state fx (can be anonymous) and in this call back fx we return the new state

==>
 const clickHandlerToggle = () => { setaddExpenseClicked((prevState) => !prevState) };

 inline prevState
  onClick={() => setIsUnderEdition((prevState) => !prevState)}
*/
/* !SC */

/*SC Get value from user */
/*
Add onChange attribute + define onChange function :
  - <input onChange={titlechangeHandler} type="text " />
  - const titlechangeHandler = (event) => {
        console.log(event)
    };

The event.target points at the DOM element for which the event occured SO event.target.value = value of the field

We then need to store that value somewhere is with useState


TWO WAY BINDINGS = THE FACT OF LISTENING TO THE INPUT (1) AND PASSING NEW VALUE (2)
e.g :
(1) = listen what the user typed
(2) = clears after submission

we do this by setting a value to the input like  value={enteredTitle}
{enteredTitle} being [0] of useState




*/
/* !SC */
/* !SC */

/* SC PASSING DATA UP */
/*
We will use a function to do this. We create the fx in parent and we execute it in children.
Execution will bring up data to parent



1. Create a fx in parent that accept argument
      const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        console.log("expenseData", expenseData)
    }


2. Pass this fx as props to the children :
  return (
    <div className="new-expense">
        <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  )

-- don't forget to accept props in the children component (destructuring or not) --


3.In the children (e.g upon form submission) call this fx and pass the data that you need to transfer to parent as argument :
    onSaveExpenseData(expenseDataSubmitted)


DATA WILL BE AVILABLE IN THE PARENT
*/
/* !SC */

/*SC LIFTING STATE UP */
/*
--> Moving data form a child comp(1). to some parent comp. to either :
- use it there
- or pass it down to other child component (2) (that has no direct connection with (1) ) (a cousin)
*/
/* !SC */

/*SC LEXICAL */
/*
- Controlled component : when the logic of a component resides in its parent e.g we say it's a controlled component like ExpensesFilter is a controlled component by Expenses #60 1.40

- Presentational/Stateless/Dumb VS Stateful/Smart components
  -> some components manage states and some components don't manage any internal state, they are just here to ouput some data (like ExpenseItem)

Usually, we only have a small amount of smart component that manage state and distribute it through props to dumb components
*/

/* !SC */
/* !SC */

/* SC Rendering content with conditions */
/* From #63 */

/* SC Key thing */
/*
Should always add a key when mapping list of items (#66)
   key={indivExpense.id}



   Why should you add the special "key" prop to list JSX elements?
   => It's required for React to correctly identify and update (if needed) list elements

   BEST TO RENDER LIST OF ITEM : PASS DATA FROM PARENT TO CHILDREN AND IN CHILDREN DO THE MAP THING :

   (tours in an array of obj with data inside)

   const Tours = ({ tours, name, info, price, id }) => {
  return (
      <div>
        {tours.map((x) => {
          return <Tour
            key={x.id}
            tour={x} />
          })}
          </div>
        </section>


AND THEN IN THE CHILD AFFECT VALUES  :
const Tour = ({ tour }) => {

  console.log("aa", tour)
  return (
    <>
      <article
        className='single-tour'>

        <img
          src={tour.image}
          alt={tour.name}
        />

        <footer>
          <div className='tour-info'>
            <h4>{tour.name}</h4>
          </div>
        </footer>
      </article>;
    </>
  )
};



*/
/* !SC */

/*SC Rendering conditional content */
/*
Two main ways #67 & #68

FIrst way, if content is not too much different between two cases : just put an if statement and store variable and modify variable with if

Second way, if content is drastically different, put an if with another return inside

or with &&



DONT FORGET ITS EASY IN REACT :
someArray.map((element) => <p>{element}</p>)


    let outputExpense =
    filteredExpenses.map((indivExpense) =>
            <ExpenseItem
                key={indivExpense.id}
                title={indivExpense.title}
                amount={indivExpense.amount}
                date={indivExpense.date}
            />
        )



DISPLAYING AS MANY BUTTON AS THERE ARE IN THE "allCategories" array
<div className="btn-container">
  {allCategories.map((category) =>
    <button
      className="filter-btn"
      onClick={changeCategoryHandler}>{category}
    </button>
  )}
</div>




        USE FILTER ON STATE, delete from an array state
            setData(
      (existingArray) => existingArray.filter(elem => elem.id !== crossClickedID)
    )


ON PEUT AUSSI DANS LE MAP AJOUTER LOGIC MAIS NEED RETURN :

<div className="section-center">
  {people.map((x, personIndex) => {

    let za = "nextSlide"

    return (
      < article key={x.id} className={position} >
        <img src={x.image} alt={`Missing picture of ${x.name}`} className="person-img" />
        <h4>{x.name}</h4>
        <p className="title">{x.title}</p>
        <p className="text">{x.quote}</p>
        <FaQuoteRight className='icon' />
      </article>
    )
  })}


*/

/* !SC */
/* !SC */

/*SC DYNAMIC STYLING */
/*
#70 6"

We need to add "style" property to our element.
This style property expects a JS object.
And as it's a dynamic expression, we need to add also another pair of "{}"
Hence we have double {}

Then we put name of the css property and if there is dash ("-") in the css property name we do either camelCase or we put it between quotes ("")

<div
  className = "chart-bar__fill"
  style={{backgroundColor : "red"}}
*/

/* SC INLINE STYLING */

/*
SETTING DYNAMIC STYLING INLINE
Not the best way bcs high priority and code repetition
Example where we check if user input is empty or not, if empty we change styling

  const [isUserEntryValid, setIsUserEntryValid] = useState(true); // feedback if user entry empty


  if (!enteredValue.trim().length) {
    console.log("INVALID USER ENTRY")
    setIsUserEntryValid(false)
    return
  }

  <label style={{ color: !isUserEntryValid ? "red" : "black" }}>Course Goal</label>
  */
/* !SC */

/* SC BETTER PRACTICE STYLING */
/*
USING STATE IS BETTER (isUserEntryValid)

<div className={`form-control ${!isUserEntryValid ? "invalid" : ""}`} >

We say : if the state is NOT isUserEntryValid, add the "invalid" class to my div
*/
/* !SC */

/*SC STYLED COMPONENTS */
/*
Sometimes, we want to scope CSS classes properties to specific components

Two ways :
  - Styled components library (https://styled-components.com/)
  - CSS modules


1) Styled components library (https://styled-components.com/)
  - Weird syntax where you use e.g const Button = styled.button `` <== inside the backticks you put your styles that will be scopped
  - All props that has been passed to the component are automatically available
  - To work with pseudo classes : "&" (&:hover OR & li...)

We can use style components dynamically, there are two ways, one is happening in the return and one in the css inside the styled component (#78)
The second option seems more flexible because we can change indiviudal styles based on the props set on my styled component





2) CSS modules
  - Will scope css classes to components
  - ONLY available on projects that supports it (create react app is OK) --> https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
  - See #80-#81 but here CSS stays in CSS files, we just reference the css.modules with an object
  - If there are dashes in css property names, use square bracket notations ([])
    ==> <div className ={classes["main-image"]}>

  How it works :
  1. Rename CSS files by adding ".module" ==> Button.module.css
  2. Import css file like this ==> import styles from './Button.module.css';
  3. In my render, apply something dynamic after className. ==> className={styles.button}
    - "styles" is my object and button is the name of a class in my button.module.css file

  => If we inspect the className in dev tools, it's e.g Button_button__13FA0 === componentName_CSSclassName_uniqueHash


  => Media queries : add in the button.module.css normally, just need to be reminded to add selector since it's a css file
  ==> @media(min-width:768px) {
  .button {
    width: auto;
  }
}

*/
/* !SC */

/*SC REMINDER : PROPS.CHILDREN FOR CARDS */
/*

==> this component will output what is inside him in the parent

const Card = ({ children }) => {


    return (
        <div>
            {children}
        </div>
    )
}

export default Card
*/

/* !SC */

/*SC Clean DOM : Fragment, Portals & refs */

/* SC Fragments */
/*

To avoid having multiple divs (divs soup) caused by JSX requirements to have a wrapper : (#102)
  - Create a folder called helper and put a component inside called wrapper that only returns its children (props.children)
  - Remove the wrapping div everywhere and put this component instead

==> <React.Fragment>
==> </React.Fragment>
          OR
==> <>
==> </>
*/
/* !SC */

/*SC Portals */
/* #105
Portals will help us writing JSX as usual but renders things differently in the DOM (example of a modal that is technically a modal because good CSS etc but in HTML it's not on the top of everything --> this is not good)
It's good to use when you need to render something always on top of rest or outside of the root of app

Portals need two things :
  1) A place where we want to port the component to
    - Add a div (or more) in the index.html root file and give id


  2) Let the component know it should have a portal to that place
    - In the component we want to port, split it (if needed) above (in the same file if OK, see #105 4")
    - import ReactDOM from"react-dom"
    - in the initial component : {ReactDOM.createPortal()} --> this accept as argument the component we want to render AND the HTML element we want to render in it (with query selector for example )



TO KNOW --> it change DOM but not react component (bubbling is preserved e.g)
*/
/* !SC */

/*SC Ref's */
/*
Ref's set up a connexion between a HTML element rendered and our JS code
It's a react Hook

REF IS LIKE STATE (in a way it persists between renders) BUT REF DOES NOT CAUSE COMPONENT TO RE RENDERS WHEN CHANGED

Refs was mainly built into React so that you can interact with the DOM elements.

import {useRef} from "react"
call "useRef()" in the upper part of our comp

It returns a value which allow us to work with that ref later, so we assign a const to it :
const nameInputRef = useRef()
If needed, we can define default value

To connect it with a HTML element, we add (for example to an input) the ref built in attribute :
<input
  ref = {nameInputRef}
/>

The value of nameInputRef will be an object holding the actual real DOM element we are connecting our ref to,
==> to get value we need to use ref.current.value

To reset, we can manipulate  the DOM (we should rarely do this in react)
==>     nameInputRef.current.value = ""
If we just want to read a value and we don't plan to change anything, we would typically use refs instead of state because using state as just a keylogger is not efficient (unnecessary code, heavier...)

==> When we use refs to interact with components, we say they are uncontrolled components because their internal state (value) is not controlled by react
*/
/* !SC */
/* !SC */
/* !SC */

/*SC Advanced */
/* SC useEffect */
/* SC Regular */

/*
This hook ran after every render (total or partial)
We can use this hook to listen after component update

Examples of side-effects are fetch requests, using local storage manipulating DOM directly, using timer functions...

They are also good at avoiding code duplication (dummy auth course exo)
==> side effect in response to a user entering data in a form


ALSO
Use the useEffect hook to wait for state to update in React. You can add the state variables you want to track to the hook's dependencies array and the function you pass to useEffect will run every time the state variables change.
==>https://bobbyhadz.com/blog/react-wait-for-state-to-update#:~:text=Use%20the%20useEffect%20hook%20to,time%20the%20state%20variables%20change.

It would be a mistake to perform side-effects directly in the body of the component, which is primarily used to compute the output (UI)

---
EXAMPLE TO FETCH for GET REQUEST
const url = 'https://course-api.com/react-tours-project'


  // Grab tours from API
  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch(url); //
          --> we can check for error with response.ok (boolean) #180
      const toursGot = await response.json(); // transforming JSON to JS object

      setLoading(false)
      setTours(toursGot)

    } catch (error) {
      setLoading(false)
      console.log("eerror", error)
    }
  };
---


useEffect(() => {
  {what you want to do when [dependencies] changed }
  , [dependencies])

useEffect(() => {
  // setLoading(false)
  fetchTours()
}, [])







BE CAREFUL : no dependen array is not the same than "[]" :

- NO DEP ARRAY MEANS IT WILL RE RUN EVERYTIME THE COMPONENT RE RENDERS

- "[]" MEANS IT WILL RUN ONLY FIRST TIME THE COMPONENT IS MOUNTED
VERY CLEAR #115

- IF WE HAVE A FULL DEP ARRAY, IT WILL RE RUN EVERYTIME THE STATE IN DEP ARRAY CHANGES OR IF THE COMP IS RE EVALUATED

--> GOOD PRACTICE IS LISTING IN THE DEP ARRAY EVERYTHING WE USE IN THE USE EFFECT EXCEPT THE setStates

Takes two arguments, the first is what you want to do once re render and second is spacific value you want to target the re render of only
*/
/* !SC */
/* !SC */

/* SC Clean up */
/*
E.g ==> we might want to do debouncing sometimes when user inputs something (executing state updates ONLY when user is done typing)
#114 3"



useEffect(() => {
  const timerIdentifier = setTimeout(() => {
    console.log("Hello")

    setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6)
  }, 1000);

  return () => {
    clearTimeout(timerIdentifier) // this will run BEFORE use effect execute + when component unmounts BUT EXCEPT THE FIRST TIME
  }
}, [enteredEmail, enteredPassword])



 */
/* !SC */

/*SC Interact with local storage */
/*
https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/

FCC project grocery list

DONT FORGET TO USE JSON.PARSE

It should always be ==> we update the state and then we, with use effect, update the LS depending on the state
OR THERE IS ALSO another way where you check ls and set state accordingly (cf4_DummyAuthFx)

EXAMPLE OF ADDING TO LOCAL STORAGE A STATE

  useEffect(() => {
    localStorage.setItem(
      "itemList", JSON.stringify(itemsList)
    )
  }, [itemsList])

==> NOW THE LOCAL STORAGE GOT THE STATE OF MY PRODUCTS

NOW THANKS TO THIS FUNCTION WE GET LOCAL STORAGE AND PUT IT INTO A VARIABLE. THEN WE WILL PUT THIS VARIABLE AS A DEFAULT VALUE OF OUR STATE
  const getLocalStorage = () => {
    let LSLIST = localStorage.getItem('itemList');
    if (LSLIST) {
      return LSLIST = JSON.parse(LSLIST)
    }
    return []
  }

*/
/* !SC */
/* !SC */

/*SC useReducer */

/*SC Intro */
/*
https://reactjs.org/docs/hooks-reference.html#usereducer

It is a state management mechanism, like useState

#116

Good use case where we can consider replacing useState by useReducer :
  - Situation where you have state that works together in some way
  - If some state updates depends on some OTHER DIFFERENT states

NE PAS CONFONDRE :
- un update de state qui dépend de son previous state (function form)
- un update de state qui dépend du state d'un autre state (useReducer or merge in one state object but difficult to maintin if state becomes complex)
*/
/* !SC */

/* SC More */
/*
Like useState, useReducer always returns an array of 2 values, so we can destructure also

const [currentState, dispatchFn] = useReducer(reducerFn, initialState, initFn )


"dispatchFn" is what we call to update our state. It calls reducerFn AUTOMATICALLY with what we passed in it. It can be triggered to an onClick for example

"reducerFn" can be defined above of our component, that is called automatically when we call dispatchFn()
it takes 2 params : "currentState" & "action"
we assign a return value to this reducerFn, usually an object as well ? this fx will return an updated state



Dummy example :
- An onClick points to a fx that executes dispatchFn.
- In dispatchFn, we pass like a {type : "decrement"}, like this :  <button onClick={() => dispatch({type: 'decrement'})}>-</button>

- Then, in the reducerFn, we do a switch statement and we access what has been passed in dispatchFn with : action.type for example. (action is the first param of reducerFn )
  When this is executed, the reucerFn is called and what's afrer the return updates our state with the first parameter of reducerFn which is currentState



"initialState" seems to be an object usually since the state we aim to manage is more complex (e.g {count : 0})

*/
/* !SC */
/* !SC */

/*SC React Context API */
/*
Sometimes, we are doing prop drilling (receiving data through props in component just to pass it to another child component) and that's not good because our data is transmitted to component whom role is only to pass it, they don't use it

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

React context API is an app-wide solution for this, that enables us share data through component without drilling


- create a folder in src ("context or store")

- inside it, write React.createContext()
  - it takes a default context as a param (optionnal) ==> we can put a boilerplate of our data structure for auto completion
  - it returns an object that contains a component (in the "Provider k/v pair")


==>
import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn : false
})

export default AuthContext



=====>
see the food order app project better the provider and context has been splitted
<=====



- Now to use it in our app, we need to :
  1) Provide it (tells react : here is my context, all components wrapped by it should have access to it )
    - If you want a component to be able to consume the global context, the object/component we just created needs to import in App.js e.g && wrap them and add ".provider" :
    - Must pass an argument to it (the state)

    ==>
      return (
      <AuthContext.Provider>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    );





  2) Consume it.
    - There are two ways : using AuthContext.Consumer where child should be a function whose argument will be my data OR react useContext hook (#122 6")
        - Import useContext hook
        - In react component function, useContext and pass to it a pointer at our context just imported
          => useContext(AuthContext)
        - Store it in a const because it will return context value
          => const ctx = useContext(AuthContext)
        - Use e.g ctx.isLoggedIn to access


OPTIMIZATION BY CREATING A STANDALONE APP WIDE STATE MGT COMPONENT --> #125



To keep a component reusable --> better to use props
If state changes very often (e.g every second), we will should not use react context.
*/

/* !SC */

/*SC Important reminders */
/*
---> A COMPONENT RE RENDERS IF STATE/CONTEXT/PROPS CHANGES (which is, in the end, all related to state)
(it's the component in which the state changes that is re rendered)


RE RENDERING A COMPONENT !== RE RENDERING THE DOM

IF A COMPONENT IS RE EVALUATED, ALL ITS CHILD COMPONENT WILL BE AS WELL
*/
/* !SC */

/* SC Fetch with POST basics firebase */
/*
https://console.firebase.google.com/project/react-http-87407/database/react-http-87407-default-rtdb/data

For firebase need to add "movies.json" at the end, it will create new node in my DB
const urlEndPoint = "https://react-http-87407-default-rtdb.firebaseio.com/movies.json";


SEND POST REQ WITH FETCH
  // Data coming from children will end up as param of this fx
  const addMovieHandler = async (movie) => {

    // Fx to POST on firebase
    const response = await fetch(
      URLPOSTFireBase, // this is a var holding an URL
      {
        method: "POST",
        body: JSON.stringify(movie), //converts JS object to JSON
        headers: { "Content-Type": "application/json" } // technically not required by firebase but many REST API's require this (it describes the content that will be sent)
      })

    const data = await response.json()
    console.log("dataaa", data)
  }
 */
/* !SC */

/*SC Build Custom Hooks */
/*
- Create new "hooks" folder & put inside a jsx file with use in front like use-counter

- The fx we create inside the file has to start with "use" :
  {import the built in hooks we use in our hook file}
  const useCounter = () => {
    const [counter, setCounter] = useState(0)
  }
  export useCounter

- Where we want to use our custom hook, we need to import it :
  - import useCounter from "../hooks/use-counter"
  - call the custom hooks : useCounter(x,y) with its params

  --> If we call a custom hook in one component and this custom hook registers a state/useEffect, it will ofc apply on the component the custom hook is hooked from : the logic is state across custom hooks, but ofc not the state and data. <--

  - In our custom hook file, we need to return the current state at the end of fx  : return counter (e.g) but we can return anything

  - In the component I called my custom hook from, I can use this returned value  and store it in a constant and use this constant to output data :
  const counter = useCounter () -----> this will affect to counter const the return value of our custom hook


  The difference between a custom hook and a component is that a custom hook will return values

  Custom Hooks allow us to access the React ecosystem in terms of hooks, which means we have access to all the known hooks like useState, useMemo, useEffect, etc.
*/
/* !SC */

/* SC VALIDATION */

/* SC BASIC */
/*
- Create State
- In input onChange do : onChange={(evt) => setName(evt.target.value)}
- Affect value attribute of the input to be state value : <input value={name} />

- Create isValid state default value true (better to create var instead #205)
- Update the state onSubmit e.g

- Apply conditionnally class to form depending on errorState :
  const classInputName = nameIsValid ? "form-control" : "form-control invalid";
  <form onSubmit={formSubmitHandler}>
*/
/* !SC */

/* SC ADVANCED */
/*
- It is better not to set the validity to true at first, because at first the input ios not valid so we can create a new state to check if user already touched this input
 const [wasNameTouched, setWasNameTouched] = useState(false);


- We want to display validationMistake UI only if user already touched once ()
- We will use onFocus to change it
  onFocus={() => setWasNameTouched(true)}

Now for our conditional rendering for validation we can create a new variable that will send true for REAL invalidity : if user already touched && if it is not valid
  const inputIsReallyInvalid = !nameIsValid && wasNameTouched;


- Now we use this variable to do our conditional rendering + class e.g
  const classInputName = inputIsReallyInvalid ? "form-control invalid" : "form-control";


Don't forget to setWasNameTouched to true when form is submitted


TO CHECK OVERVALL FORM VALIDITY :
- New variable
  let formIsValid = false

- for each input (DRY?)
 if (nameIsValid) { formIsValid = true }

 see "SimpleInputWithoutCustomHook.jsx" for the "manual" approach


 see SimpleInput.jsx for full approach with custom hook mais en gros :

  tu vas retourner de ton custom hook pleins d'élements en leur donnant des alias, ce sera le résultat
  dans ton appel au custom hook tu vas donner une fonction vérificatrice de la logique
*/

/* !SC */
/* !SC */
/* !SC */

/*SC Next.js */

/*SC Routing */
/*
We can add a folder in pages folder give it name we want and this will act as a path
Then can put any filename in it to go to this path

Index will be the base

We need to do this for nesting path (ids)
*/
/* !SC */

/*SC Dynamic path */
/*
Put file in a folder
Change file name : "[newsID].jsx"
  --> This tells next js this page will be loaded for diferent values
  --> if i put this in a x folder then all request with something after "x/" will end up here
  --> We can also create a folder like : [meetupID] and inside just an "index.jsx"


To extract which dynamic parameter the user request :
  --> import {useRouter} from "next/router"

  --> In comp : const router = useRouter()
    --> This can give us access to the value encoded in the URL
    --> router.query."fileName"
    --> = router.query.newsID

*/
/* !SC */

/*SC Linking pages */
/*
- We can either do 'à l'ancienne" avec a href etc BUT this sends a new request (not a SPA)

import Link from "next/link"
<Link href='/'>All Meetups</Link>
*/

/* !SC */

/*SC Navigate programatically */
/*
import useRouter & use it
create a fx to navigate

import { useRouter } from 'next/router';
const router = useRouter()

const navigateTo = (param) => {
    router.push("/") //or router.replace() so user cannot go back with previous button
}

*/
/* !SC */

/*SC Renders types */
/*

--- Static Generation | SSG ---
  Page is pre rendered during build (npm run build)
  Very little to no change in the page : getStaticProps fx without the revalidate property is for data that NEVER or almost never changes

  Makes sure that our pre rendered page contains data we need to wait for


  --> From a page file (), export the below function so this will execute before anything else
  --> This code is executed during build process
  --> We can fetch data from API/DB here
  --> Obligation to return an object
    export async function getStaticProps(context) {
      return {
        props: {campgrounds : fetchedData},
        revalidate : 3600
      }
    }
  --> the props returned will be received in the component


With this fx, the context parameter gives us access to params e.g
  const meetupID = context.params.meetupId
  (meetupId)being the identifier in square bracket in my folder

  --> we can add the revalidate property to the returned object to use incremental static ReGeneration (ISRG)
  --> revalidate : 10 === the page will wait 10sec before being regenerated on the server



    --> Need getStaticPaths if dynamic page && using getStaticProps, because nextJS needs to pregenerates ALL pages in all possible scenarios (e.g all product pages)
    --> We must return from get static path something like this :

export const getStaticPaths = async () => {
  return {
    fallback: boolean,
    paths: [
        {
            params: {
                meetupId: "m1,"
            }
        },
        {
            params: {
                meetupId: "m2,"
            }
        },
    ]
  }
}
    --> fallback tells to next js whether the path array contains all parameter values (false) or some of them and will try to generate a page dynamically on the server (true)
    --> By putting true, this features enables us to pre-generate some pages (the one in the array) and generate on request some other.
--- Static Generation | SSG ---












--- Server-side Rendering | SSR ---
Will not run during the build, but on server after deployment

With this fx, the context parameter gives us access to request and response
  const req = context.req
  const res = context.res

    export const getServerSideProps = async (context) => {
    return {
      props : {campgrounds : fetchedData},
    }
  }
--- Server-side Rendering | SSR ---





--- Which one to use ? ---
By default getStaticProps (SSG) except if :
  - I need access to request or response
  - My data changes very often (each second or more)

*/
/* !SC */

/* SC API ROUTES */
/*
- Create "api" folder in "pages" folder
- Name should be endpoint & fx inside should be named "handler"
- req.body, req.method, res.json etc sont available
    const handler = (req, res) => {
      res.status(200).json({ name: 'John Doe' })
    }

    export default handler


- npm install mongodb


See "new-meetup.js"
*/

// FOR INTERACTING WITH MONGO DONT FORGET THIS SERIALIZE ISSUE WITH Object Id from this to string
/* !SC */
/* !SC */

/* SC Basic Deployment & GIT */

/* SC Preparing for Deploy */

/* 
-- Adding Metadata for SEO  --
    - import Head from "next/head"
    - Go in component in "pages" (not in component folder but pages) and add e.g 
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse your favourites meetups near you, in a minute!" />
      </Head>

      <MeetupList
        meetups={props.meetups}
      />
!sc
*/
/* !SC */

/* SC GIT */
/* #347

---
git status : to know current status of all files
git branch -a : show all branches
git ls-files : see unmerged files
git log : see history of commits || git log --oneline
git remote -v : check the link of remote URL

git rm -r --cached <folder to remove> : to remove form git hub 
---

- "git init" to initialize a new repo locally --> will create a folder

- Add to staging area 
  git add .
  git add readme.md
  git add --all


  ----- from git hub -----
  echo "# test-strapi" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/zacBkh/test-strapi.git
git push -u origin main


--check diff
  git diff main..new-custom-strapi-zac
--

--
We can skip staging area with : git commit -a -m "Change titles and styling on homepage"
--


- Commit 
  - git commit -m "changed the read me" OR
  - git commit and then a new file should open we can write 2 lines description : one short one long
    - AND git branch -M main if first time  


- Removing file (from working directory & staging area)
  - We can remove file from staging area by removing it physically and then git add to add the deletion to staging area and then commit
  - Or we can remove from directory & from staging area in one command : git rm file2.txt or git rm *.txt


- Add URL of remote repo
   - git remote add origin to put origin as a variable (link of repo)


- Push
  git push -u origin main for first time only

  git push --set-upstream origin master

  or git push --all to push all

  or git push to push local commits



  Si c la merde : 
  git reset --hard main


- Branching
  - git branch <new-branch-name> to create new branch

  - git checkout <branch-name> to change branch
      - Shortcut to do both : git checkout -b new-branch-name

  - git add . to add it to staging area
  - then commit 
  -- To push new branch :
   git push --set-upstream origin <branch-name> --


   Delete branch, checkout out of it and git branch -d <branch name>
   // delete branch locally
git branch -d localBranchName

// delete branch remotely
git push origin --delete remoteBranchName


If we switch from one branch to the other code also change in VS code but non destructive way

To merge on main branch --> go on main branch, type git merge <branch where we want to merge from> then type git push




- Clone
    - git clone <https>





 */
/* !SC */
/* !SC */

/*SC Use useInView lib  */
/* 
import { useInView } from "react-intersection-observer"

const { ref: sectionRef, inView, entry } = useInView({
    // threshold: 0.2 --> 0.2 = at 0.2% of the element unveiled,      inView will become true
    // rootMargin: '-100px 0px',
    //     skip: false,
    //     triggerOnce: true
});


Give to our element the ref
  <section
      ref={sectionRef}
      className={
        `transition-opacity duration-1000 
         ${inView ? "opacity-100" : "opacity-0"}`
      }
                    

*/
/* !SC */

/*SC Formik */
/* 
import {useFormik} from "formik"

in component : const formik = useFormik({})
--> the return values weill help us managing form state, handlng form submission and validation and error msg

- creer un objet initial value et le passer a formik
  const formik = useFormik({
    initialValues: initialValues
  })

- in value attribute put formik.values.email (for example) in each input

- we then need to add onChange to manupulate

on change will sync with the name attribute of the input : les name des input doivent etre liés au name qu'on a mis dans l'objet initialValues --> to be confirmed ?

NAME MUST BE UNIQUE FOR CHECKBOXES


Ensuite passer au form :
  onSubmit={formik.handleSubmit}

Ensuite on revient dans le const formik du début et on y passe une key onSubmit et en valeur une fonction responsable de ce qui se passe lors du submit (submitHandler)
   const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (formValues) => { console.log(formValues) }
  })



  on refacto en déportant la fonction dans une fonction distincte : 
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitFormik
  })

    const onSubmitFormik = (formValues) => {
      console.log('formValues',formValues)
  }


FORMIK VALIDATION
  passer à l'objet useFormik la key validate et une fonction
  cette fx sera executée avant la fonction onSubmit

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitFormik,
    validate: validateFormik
  })

  // Setting validation logic
  const validateFormik = (formValues) => {
    const errors = {};

    if (formValues.title.trim() === "") {
      errors.title = "Please enter a title!"
    }

    if (formValues.description.trim() === "") {
      errors.description = "Please enter a description!"
    }
    return errors
  }

Now formik.errors is available, it's an object having our input "name" as key and errorDescription as value

Now need to pass formikError 

We can add logic to display valid erorr
  formikError && <span className="text-red-600">{formikError[formikName]}</span>}

  formikName is the "name" attribute of the input



Si on commence a saisir dans un input tous sont validés --> on ne veut pas ça 
si on fait un console.log(formik) on a un key qui s'appelle touched
cet objet contient en key le nom des input et en value si ils ont été touched ou pas

y a plus qu'a coder une logic qui dit si y a erreur et si le nom de cet input a été touché alors on dispaly validAlert
  if (formikError && hasFieldBeenTouched) {
      return <span className="text-red-600">{formikError[formikName]}</span>
      // Accessing object key with string (passed as proops) 
  }

---> hasFieldBeenTouched devra etre passé en props et ca correspondra au boolean de l'objet formik.touched pour l'input correspondant
    hasFieldBeenTouched={formik.touched.title}










-- AUTRE MANIERE DUTILISER AVEC COMPOSANT FORMIK --
import {  Formik } from "formik"

Ce composant rend une fonction qui prend en parametre un objet formik
<Formik>
  {(formik) => (
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={submitHandler}


// HERE COMES THE FORM // 

  </Formik>


*/
/* !SC */

/*SC NextAuth */
/* 

set provider in app.js : 
const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {

  return (
    <SessionProvider session={session}>

      <Layout>
        <Component {...pageProps} />
      </Layout>

    </SessionProvider>
  )
}

export default MyApp


create a [...nextauth] file in API
Congig to do on google (or else if we use else provider)
Then env.file to change

Then app.js file to change with provider

then craete login page front end
https://next-auth.js.org/getting-started/example#:~:text=NextAuth.js%20client.-,Frontend,-%2D%20Add%20React%20Hook

and use reacthoook use session



to protect route
https://next-auth.js.org/getting-started/example#:~:text=a%20header%20component).-,Backend,-%2D%20API%20Route%E2%80%8B

We have 2 ways : client side and server side

do client side with the required: true attribute with use session (see protected.jsx)
https://youtu.be/A5ZN--P9vXM?t=1261




To protect route create middleware.js file in root 
--> this protect ALL the app



-- REDIRECITON AFTER LOGOUT 
https://next-auth.js.org/getting-started/client#signin:~:text=redirect_uri%2C%20state-,signOut()%E2%80%8B,It%20reloads%20the%20page%20in%20the%20browser%20when%20complete.,-import%20%7B%20signOut

*/

/* !SC */
