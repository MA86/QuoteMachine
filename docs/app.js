class App extends React.Component {
  constructor(props) {
    // Must nstantiate parent
    super(props);

    // App states (NOTE: React re-renders component after you change state)
    this.state = {
      author: "",
      quote: ""
    };

    // A database for the quotes and authors
    this.quoteDatabase = {
      0: [
        "Octavia E. Butler",
        "You don’t start out writing good stuff. You start out writing crap and thinking it’s good stuff, and then gradually you get better at it."
      ],
      1: [
        "William Faulkner",
        "Get it down. Take chances. It may be bad, but it's the only way you can do anything really good."
      ],
      2: [
        "Toni Morrison",
        "If there's a book that you want to read, but it hasn't been written yet, then you must write it."
      ],
      3: [
        "Thomas Jefferson",
        "The most valuable of all talents is that of never using two words when one will do."
      ],
      4: [
        "Robert Frost",
        "In three words I can sum up everything I've learned about life: it goes on."
      ],
      5: [
        "Oscar Wilde",
        "To live is the rarest thing in the world. Most people exist, that is all."
      ],
      6: [
        "Oscar Wild",
        "I am so clever that sometimes I don't understand a single word of what I am saying."
      ],
      7: [
        "Ralph Waldo Emerson",
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."
      ],
      8: [
        "John Lennon",
        "Life is what happens when you're busy making other plans."
      ],
      9: [
        "Peter De Vries",
        "I only write when I’m inspired, so I see to it that I’m inspired every morning at nine o’clock."
      ]
    };

    // Bind 'this' to event handlers so it points to App, not the tag
    // from which the event handler is called!
    this.handleNewQuoteButtonClick = this.handleNewQuoteButtonClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  // Good practice to initialize states in this 'hook'. This hook is invoked by React.
  componentDidMount() {
    let initialQuote = this.generateRandomQuote();
    this.setState(() => {
      return {
        author: initialQuote[0],
        quote: initialQuote[1]
      };
    });

    // Attach 'animation end' event listener to 'text-div' element
    document
      .getElementById("text-div")
      .addEventListener("animationend", this.myEndFunction);
  }

  // Called when CSS animation ends
  myEndFunction() {
    document.getElementById("text-div").removeAttribute("class");
  }

  // Generates a random quote and returns the quote & author
  generateRandomQuote() {
    // Generate a random number, representing an index
    let randomIndex = Math.floor(
      Math.random() * Object.keys(this.quoteDatabase).length
    );

    // Based on the index above, select a random quote&author from database
    let randomQuote = this.quoteDatabase[randomIndex];

    return randomQuote;
  }

  // Event handler, to respond to 'button clicked'. Generates a new quote in response to
  // button clicked. Also adds animation class to 'text-div' tag
  handleNewQuoteButtonClick() {
    // Generate a new quote
    let newQuote = this.generateRandomQuote();

    // Update state (Note: this function triggers re-render)
    this.setState(() => {
      return {
        author: newQuote[0],
        quote: newQuote[1]
      };
    });

    // Adds animation class to 'text-div' tag upon click
    document
      .getElementById("text-div")
      .setAttribute("class", "animate__animated animate__flipInX");
  }

  // Renders the app
  render() {
    return (
      <div id="quote-box">
        <div id="text-div">
          <i className="fa fa-quote-left"></i>
          <span id="text"> {this.state.quote} </span>
          <i className="fa fa-quote-right"></i>
          <div id="author-div">
            <span id="author">- {this.state.author}</span>
          </div>
        </div>
        <div id="button-div">
          <a
            id="tweet-quote"
            target="_blank"
            href={`http://twitter.com/intent/tweet?text=${encodeURIComponent(
              this.state.quote
            )}`}
          >
            <i className="fa fa-twitter-square" id="twitter-size"></i>
          </a>
          <button
            type="button"
            id="new-quote"
            className="btn btn-success"
            onClick={this.handleNewQuoteButtonClick}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

// Render the JSX component inside the HTML DOM's 'root' element
ReactDOM.render(<App />, document.getElementById("root"));
